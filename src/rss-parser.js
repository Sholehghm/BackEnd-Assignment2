import Parser from 'rss-parser';

export async function parseFeeds(feedUrls) {
  const parser = new Parser();
  const allItems = [];
  
  for (const url of feedUrls) {
    try {
      const feed = await parser.parseURL(url);
      allItems.push(...feed.items.map(item => ({
        title: item.title,
        link: item.link,
        content: item.content
      })));
    } catch (error) {
      console.error(`Error parsing ${url}:`, error.message);
    }
  }
  return allItems;
}
