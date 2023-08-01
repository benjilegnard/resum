import { defineEventHandler } from 'h3';
import { readFile, readdir } from 'fs/promises';
import fm from 'front-matter';
import { sep } from 'path';

interface FeedItem {
  link: string;
  title: string;
  /* format Tue, 29 Dec 2009 00:00:00 GMT*/
  pubDate: string;
  description?: string;
}

interface FrontMatterAttributes {
  slug: string;
  title: string;
  description: string;
  published?: boolean;
  publishedAt?: string;
}

const baseUrl = 'https://benjaminlegrand.net';
const encoding = 'utf-8';

const feedHeader = (content: string) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Benjamin Legrand Weblog</title>
    <link>${baseUrl}/articles</link>
  ${content}
  </channel>
</rss>`;

const renderItem = (item: FeedItem) => `
<item>
    <title>${item.title}</title>
    <link>${item.link}</link>
    <guid>${item.link}</guid>
    <pubDate>${item.pubDate}</pubDate>
    ${item.description ? `<description>${item.description}</description>` : ''}
</item>
`;

const attributesToItem = (attributes: FrontMatterAttributes): FeedItem => ({
  link: `${baseUrl}/articles/${attributes.slug}`,
  title: attributes.title,
  description: attributes.description,
  pubDate: new Date(attributes.publishedAt).toUTCString(),
});

const parseArticles = async (): Promise<FeedItem[]> =>
  (
    await Promise.all(
      (
        await readdir([process.cwd(), 'src', 'content', 'articles'].join(sep), {
          withFileTypes: true,
          encoding,
          recursive: true,
        })
      )
        .filter((dirEntry) => dirEntry.isFile())
        .map((dirEntry) =>
          readFile([dirEntry.path, dirEntry.name].join(sep), encoding),
        ),
    )
  )
    .map((fileContent) => fm<FrontMatterAttributes>(fileContent, {}))
    .filter(({attributes}) => attributes.published && attributes.publishedAt)
    .map(({ attributes }) => attributesToItem(attributes));

export default defineEventHandler(async (event) => {
  const frontMatter = await parseArticles();
  const feedString = feedHeader(frontMatter.map(renderItem).join());
  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(feedString);
});
