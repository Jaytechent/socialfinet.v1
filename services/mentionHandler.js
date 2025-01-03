import { fetchMentions, postReply } from "./twitterService.js";
import { processMentionWithAI } from "./aireply.js";

// Example: In-memory store for tweet IDs that were replied to
const repliedToCache = new Set();

const handleMentions = async () => {
  const mentions = await fetchMentions();

  if (!mentions || mentions.length === 0) {
    console.log("No mentions to process.");
    return;
  }

  for (const mention of mentions) {
    const { id: tweetId, text: mentionText } = mention;

    // Skip if already replied to
    if (repliedToCache.has(tweetId)) {
      console.log(`Already replied to Tweet ID: ${tweetId}. Skipping.`);
      continue;
    }

    console.log(`Processing mention: "${mentionText}"`);

    // Get AI-generated response
    const replyText = await processMentionWithAI(mentionText);

    // Post reply
    await postReply(replyText, tweetId);

    // Add the tweet ID to the cache
    repliedToCache.add(tweetId);
  }

  console.log("All mentions processed successfully.");
};

export { handleMentions };
