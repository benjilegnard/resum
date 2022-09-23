---
title: Mettre à jour ubuntu vers la 22.10
description: ''
published: false
lang: fr
---

```bash
sudo add-apt-repository ppa:mozillateam/ppa
```

```bash
echo '
Package: *
Pin: release o=LP-PPA-mozillateam
Pin-Priority: 1001
' | sudo tee /etc/apt/preferences.d/mozilla-firefox
```

```bash
echo 'Unattended-Upgrade::Allowed-Origins:: "LP-PPA-mozillateam:${distro_codename}";' | sudo tee /etc/apt/apt.conf.d/51unattended-upgrades-firefox
```

### install chromium

```bash
sudo add-apt-repository ppa:phd/chromium-browser
```

```bash
echo '
Package: *
Pin: release o=LP-PPA-phd-chromium-browser
Pin-Priority: 1001
' | sudo tee /etc/apt/preferences.d/phd-chromium-browser
```

# no snap pref

__/etc/apt/preferences.d/no-snap.pref__

```
# To install snapd, specify its version with 'apt install snapd=VERSION'
# where VERSION is the version of the snapd package you want to install.
Package: snapd
Pin: release a=*
Pin-Priority: -10
```
