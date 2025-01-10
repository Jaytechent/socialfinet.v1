import { TwitterApi } from "twitter-api-v2";
import cron from "node-cron";
import dotenv from "dotenv";
dotenv.config();

const TWITTER_USER_ID = "1757335862474342400"; // Replace with your Twitter user ID
const PHRASE_TO_MATCH = "SOCIFINET"; // Replace with the phrase to trigger the bot

// Twitter API credentials
const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_API_KEY,
  appSecret: process.env.TWITTER_CONSUMER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const AUTO_REPLY_MESSAGE = "Thanks for tagging me! I am on Test Mode 😊";

// Fetch user tweets
async function fetchUserTweets() {
  try {
    const tweets = await client.v2.userTimeline(TWITTER_USER_ID, {
      "tweet.fields": "conversation_id",
      max_results: 5,
    });
    return tweets.data.data || [];
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return [];
  }
}

// Fetch comments on a specific tweet
async function fetchCommentsForTweet(tweetId) {
  console.log(`Fetching comments for tweet: ${tweetId}`);
  try {
    const comments = await client.v2.tweets(tweetId, {
      expansions: "author_id",
      "tweet.fields": "text,author_id",
    });
    return comments.data || [];
  } catch (error) {
    console.error(`Error fetching comments for tweet ${tweetId}:`, error);
    return [];
  }
}

// Post a reply with text only
async function postReply(tweetId, replyMessage) {
  try {
    const reply = await client.v1.reply(replyMessage, tweetId);
    console.log("Reply posted successfully:", reply);
  } catch (error) {
    console.error(`Error posting reply to tweet ${tweetId}:`, error);
  }
}

// Process tweets and comments
async function processTweetsAndComments() {
  try {
    const tweets = await fetchUserTweets();
    console.log("Processing tweets...");
    for (const tweet of tweets) {
      const comments = await fetchCommentsForTweet(tweet.id);

      for (const comment of comments) {
        const commentText = comment.text.toLowerCase();

        if (commentText.includes(PHRASE_TO_MATCH.toLowerCase())) {
          console.log(`Matching comment found: ${comment.text}`);
          await postReply(comment.id, AUTO_REPLY_MESSAGE);
        }
      }
    }
  } catch (error) {
    console.error("Error processing tweets and comments:", error);
  }
}

// Schedule the bot to run every 5 minutes
cron.schedule("*/5 * * * *", processTweetsAndComments);

console.log("Twitter bot is running and checking for mentions every 5 minutes...");
