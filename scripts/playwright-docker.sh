#!/usr/bin/env bash

set -euo pipefail

readonly container_name="resum-playwright-${$}"

# The remote server must run the exact same Playwright version as the local
# client, otherwise `browserType.connect` is refused with a version mismatch.
# Derive it from the installed package instead of pinning it by hand.
version="$(node -p "require('@playwright/test/package.json').version")"
readonly version
readonly image="mcr.microsoft.com/playwright:v${version}-noble"

cleanup() {
  docker rm --force "${container_name}" >/dev/null 2>&1 || true
}

trap cleanup EXIT INT TERM

docker run \
  --detach \
  --name "${container_name}" \
  --init \
  --ipc=host \
  --add-host=hostmachine:host-gateway \
  --publish 127.0.0.1:3000:3000 \
  --user pwuser \
  --workdir /home/pwuser \
  "${image}" \
  /bin/sh -c \
  "npx -y playwright@${version} run-server --port 3000 --host 0.0.0.0" \
  >/dev/null

for _ in {1..60}; do
  if docker logs "${container_name}" 2>&1 | grep --quiet "Listening on"; then
    PW_TEST_CONNECT_WS_ENDPOINT="ws://127.0.0.1:3000/" \
      pnpm exec playwright test "$@"
    exit
  fi

  if ! docker inspect --format "{{.State.Running}}" "${container_name}" |
    grep --quiet "true"; then
    docker logs "${container_name}"
    exit 1
  fi

  sleep 0.5
done

docker logs "${container_name}"
echo "Timed out waiting for the Playwright Docker server." >&2
exit 1
