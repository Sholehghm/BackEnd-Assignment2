import { getRssFeeds, getRecipients } from './database.js';
import { parseFeeds } from './rss-parser.js';
import { createEmailTemplate, sendNewsletter } from './email-sender.js';

async function main() {
  try {
    // Fetch data
    const feedUrls = await getRssFeeds();
    const recipients = await getRecipients();
    
    // Process feeds
    const feedItems = await parseFeeds(feedUrls);
    const emailContent = createEmailTemplate(feedItems);
    
    // Send emails
    const results = await sendNewsletter(recipients, emailContent);
    
    console.log('Processing complete:');
    console.table(results);
    
    process.exit(0);
  } catch (error) {
    console.error('Application error:', error);
    process.exit(1);
  }
}

main();
