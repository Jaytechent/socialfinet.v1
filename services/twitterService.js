import { userClient } from "../configs/twitterConfig.js";

const fetchMentions = async () => {
  try {
    console.log("Fetching mentions...");
    const mentions = await userClient.v2.get("users/:id/mentions", {
      "tweet.fields": "created_at",
      "max_results": 100,
    });
    return mentions.data || [];
  } catch (error) {
    console.error("Error fetching mentions:", error);
    return [];
  }
};

const postReply = async (replyText, tweetId) => {
  try {
    console.log(`Posting reply to Tweet ID: ${tweetId}`);
    await userClient.v2.post(`tweets`, {
      text: replyText,
      reply: { in_reply_to_tweet_id: tweetId },
    });
    console.log("Reply posted successfully:", replyText);
  } catch (error) {
    console.error("Error posting reply:", error);
  }
};

export { fetchMentions, postReply };
