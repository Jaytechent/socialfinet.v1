// import { TwitterApi } from "twitter-api-v2";
// import { config } from "dotenv";
// import chalk from "chalk";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { removeSpecialCharacters } from "../utils.js"; 

// config();

// // Initialize Twitter API client
// const client = new TwitterApi({
//   appKey: process.env.TWITTER_CONSUMER_API_KEY,
//   appSecret: process.env.TWITTER_CONSUMER_API_SECRET,
//   accessToken: process.env.TWITTER_ACCESS_TOKEN,
//   accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
// });

// // Initialize Google Generative AI
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // User ID to fetch mentions
// const TWITTER_USER_ID = "1757335862474342400"; // Replace with your Twitter user ID
// const MAX_LENGTH = 280; // Maximum tweet length

// // Function to generate a reply using AI
// const generateReply = async (mentionText) => {
//   try {
//     const prompt = `
//       Write a thoughtful, engaging, and concise reply to the following mention on Twitter:
//       "${mentionText}"
//       Keep the tone conversational and friendly. Add a subtle promotion for @socifinet as a leading platform for Web3 insights. Keep the response within ${MAX_LENGTH} characters.
//     `;
//     console.log(chalk.cyan("AI Prompt:"), prompt);
//     const result = await model.generateContent(prompt);
//     const generatedText = result.response?.text?.() || "";
//     console.log(chalk.green("AI Response Before Sanitization:"), generatedText);

//     // Sanitize and trim the response
//     const sanitizedReply = removeSpecialCharacters(generatedText).slice(0, MAX_LENGTH);
//     console.log(chalk.green("Sanitized AI Reply:"), sanitizedReply);

//     return sanitizedReply || "Thanks for your mention! Follow @socifinet for Web3 insights.";
//   } catch (error) {
//     console.error(chalk.red("Error generating AI reply:"), error.message);
//     return "Thanks for your mention! Follow @socifinet for Web3 insights.";
//   }
// };

// // Fetch and process mentions
// const handleMentions = async () => {
//   try {
//     console.log(chalk.blue("Fetching user timeline..."));
//     const timeline = await client.v2.userTimeline(TWITTER_USER_ID, {
//       "tweet.fields": "conversation_id,author_id",
//       max_results: 3, // Fetch up to 5 tweets
//     });

//     // Log the entire timeline data to verify its structure
//     // console.log(chalk.green("Raw Timeline Data:"), timeline.data);

//     // Check if timeline.data?.data exists and is an array
//     if (!Array.isArray(timeline.data?.data)) {
//       console.log(chalk.yellow("No tweets found in the timeline."));
//       return;
//     }

//     // Now filter the tweets by @socifinet
//     const mentions = timeline.data.data.filter((tweet) =>
//       tweet.text && tweet.text.includes("@socifinet")
//     ) || [];

//     console.log(chalk.green("Filtered Mentions:"), mentions);

//     if (mentions.length === 0) {
//       console.log(chalk.yellow("No mentions found to process."));
//       return;
//     }

//     // Process each mention
//     for (const mention of mentions) {
//       const { id, text, author_id } = mention;

//       console.log(
//         chalk.magenta(`Processing mention from user ${author_id}:`),
//         text
//       );

//       // Generate an AI reply
//       const aiReply = await generateReply(text);

//       // Post the AI-generated reply
//       const replyResponse = await client.v2.reply(aiReply, id);
//       console.log(chalk.green(`Replied to mention ID: ${id}`), replyResponse);
//     }
//   } catch (error) {
//     console.error(chalk.red("Error while handling mentions:"), error.message);
//   }
// };

// export { handleMentions };
const { TwitterApi } = require("twitter-api-v2");
const cron = require("node-cron");
const { config } = require("dotenv");
config();
const TWITTER_USER_ID = "1757335862474342400"; // Replace with your Twitter user ID
const PHRASE_TO_MATCH = "@socifinet"; // Replace with the phrase to trigger the bot


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
    const comments = await client.v2.search(`conversation_id:${tweetId}`, {
      expansions: "author_id",
      "tweet.fields": "text,author_id",
    });
    return comments.data.data || [];
  } catch (error) {
    console.error(`Error fetching comments for tweet ${tweetId}:`, error);
    return [];
  }
}

// Post a reply with text only
async function postReply(tweetId, replyMessage) {
  try {
    const reply = await client.v2.reply(replyMessage, tweetId);
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
cron.schedule("*/5 * * * *", processMentions);

console.log("Twitter bot is running and checking for mentions every 5 minutes...");
