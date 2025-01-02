import { userClient } from "../configs/twitterConfig.js";

const fetchMentions = async () => {
  try {
    const mentions = await userClient.v2.mentionsTimeline();
    return mentions.data || [];
  } catch (error) {
    console.error("Error fetching mentions:", error);
    return [];
  }
};

const postReply = async (replyText, tweetId) => {
  try {
    await userClient.v2.reply(replyText, tweetId);
    console.log("Reply posted successfully:", replyText);
  } catch (error) {
    console.error("Error posting reply:", error);
  }
};

export { fetchMentions, postReply };
