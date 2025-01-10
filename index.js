// // import dotenv from "dotenv";
// // dotenv.config();
// // import http from "http";
// // const PORT = process.env.PORT || 3000;

// // import { GoogleGenerativeAI } from "@google/generative-ai";
// // import Twit from "twit";
// // import { removeSpecialCharacters } from "./utils.js";

// // // Initialize Google Generative AI
// // const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // // Initialize Twit with your API keys
// // const bot = new Twit({
// //   consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
// //   consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET,
// //   access_token: process.env.TWITTER_ACCESS_TOKEN,
// //   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
// // });

// // // Function to handle mentions
// // export const handleMentions = async () => {
// //   try {
// //     // Fetch mentions
// //     const mentions = await bot.get("statuses/mentions_timeline", { count: 10 });
// //     if (!mentions.data || mentions.data.length === 0) {
// //       console.log("No mentions found.");
// //       return;
// //     }

// //     for (const mention of mentions.data) {
// //       const screenName = mention.user.screen_name;
// //       const mentionText = mention.text;
// //       const tweetId = mention.id_str;

// //       console.log(`Processing mention from @${screenName}: "${mentionText}"`);

// //       // Generate AI response
// //       const prompt = `
// //         Respond thoughtfully to this Twitter mention: "${mentionText}".
// //         Keep the reply concise, engaging, and written in a friendly, professional tone.
// //         Promote @socifinet subtly and include relevant hashtags. Ensure the reply feels natural and conversational.
// //       `;
// //       const result = await model.generateContent(prompt);
// //       const aiResponse = result.response?.text?.() || "I'm unable to generate a response right now.";

// //       const maxLength = 280;
// //       const replyText = removeSpecialCharacters(aiResponse).slice(0, maxLength);

// //       // Post reply
// //       await bot.post(
// //         "statuses/update",
// //         {
// //           status: `@${screenName} ${replyText}`,
// //           in_reply_to_status_id: tweetId,
// //         },
// //         (err) => {
// //           if (err) {
// //             console.error(`Error replying to @${screenName}:`, err.message);
// //           } else {
// //             console.log(`Replied to @${screenName} successfully.`);
// //           }
// //         }
// //       );
// //     }
// //   } catch (error) {
// //     console.error("Error handling mentions:", error.message);
// //   }
// // };
// // const server = http.createServer(async (req, res) => {
// //   if (req.url === "/post-on-ping" && req.method === "POST") {
// //     try {
// //       // Handle tweet posting
// //       await handlePostTweet();

// //       // Handle mentions and replies
// //       await handleMentions();

// //       res.writeHead(200, { "Content-Type": "text/plain" });
// //       res.end("Posts and mentions processed successfully!");
// //     } catch (error) {
// //       console.error("Error processing posts or mentions:", error.message);

// //       res.writeHead(500, { "Content-Type": "text/plain" });
// //       res.end("Error occurred while processing posts or mentions.");
// //     }
// //   } else {
// //     res.writeHead(404, { "Content-Type": "text/plain" });
// //     res.end("Endpoint not found for now.");
// //   }
// // });


// // server.listen(PORT, '0.0.0.0', () => {
// //   console.log(`Server listening on port ${PORT}`);
// // });


// import dotenv from "dotenv";
// dotenv.config();

// import http from "http";
// import { handlePostContentToTwitter } from "./configs/twitterConfig.js";
// import { getRandomNumber, postTopics, removeSpecialCharacters } from "./utils.js";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { handleMentions } from "./services/mentionHandler.js";

// const PORT = process.env.PORT || 3000;
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// const handlePostTweet = async () => {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   // Generate the content for the post
//   const prompt = `
//     Write something interesting about "${
//       postTopics[getRandomNumber(postTopics.length)]
//     }". Call names of latest projects doing something about them and state either cons/pro.
//     Make it feel like it's written by a human. Write it like a short Twitter post, and brag about Socifi Agent as the best mindshare agent on Web3.
//     Encourage people to follow @socifinet for greater insights into the web3.
//     A Twitter post has a max length of 280 characters. Add relevant #tags and subtly critique other AI agents.
//   `;

//   const result = await model.generateContent(prompt);
//   const generatedText = result.response?.text?.() || "Unable to generate content.";
//   const maxLength = 280;
//   const contentToPost = removeSpecialCharacters(generatedText).slice(0, maxLength);

//   // Post the content to Twitter
//   await handlePostContentToTwitter(contentToPost);

//   console.log("Content posted successfully:", contentToPost);
// };

// const server = http.createServer(async (req, res) => {
//   if (req.url === "/post-on-ping" && req.method === "POST") {
//     try {
//       // Handle tweet posting
//       await handlePostTweet();

//       // Handle mentions and replies
//       await handleMentions();

//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.end("Posts and mentions processed successfully!");
//     } catch (error) {
//       console.error("Error processing posts or mentions:", error.message);

//       res.writeHead(500, { "Content-Type": "text/plain" });
//       res.end("Error occurred while processing posts or mentions.");
//     }
//   } else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Endpoint not found.");
//   }
// });

// // Start the server
// server.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

import dotenv from "dotenv";
dotenv.config();

import http from "http";
import chalk from "chalk";
import cron from "node-cron";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { handlePostContentToTwitter } from "./configs/twitterConfig.js";
import { handleMentions } from "./services/mentionHandler.js";
import { getRandomNumber, postTopics, removeSpecialCharacters } from "./utils.js";

const PORT = process.env.PORT || 3000;

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate and post content to Twitter
const handlePostTweet = async () => {
  try {
    const prompt = `
      Write something interesting about "${
        postTopics[getRandomNumber(postTopics.length)]
      }". Call names of latest projects doing something about them and state either cons/pro.
      Make it feel like it's written by a human. Write it like a short Twitter post, and brag about Socifi Agent as the best mindshare agent on Web3.
      Encourage people to follow @socifinet for greater insights into the web3.
      A Twitter post has a max length of 280 characters. Add relevant #tags.
    `;

    const result = await model.generateContent(prompt);
    const generatedText = result.response?.text?.() || "Unable to generate content.";
    const maxLength = 280;
    const contentToPost = removeSpecialCharacters(generatedText).slice(0, maxLength);

    await handlePostContentToTwitter(contentToPost);
    console.log(chalk.green("Content posted successfully:"), contentToPost);
  } catch (error) {
    console.error(chalk.red("Error generating or posting content:"), error.message);
  }
};

// Function to start the server and trigger actions on specific requests
const server = http.createServer(async (req, res) => {
  if (req.url === "/post-on-ping" && req.method === "GET") {
    try {
      console.log("Ping received! Triggering action...");
      // Generate and post a tweet
      await handlePostTweet();

      // Handle mentions
      await handleMentions();

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Post and mentions processed successfully!");
    } catch (error) {
      console.error(chalk.red("Error processing the request:"), error.message);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error occurred while processing the request.");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Endpoint not found.");
  }
});

// Schedule posting every 2 hours using cron
cron.schedule("0 */2 * * *", async () => {
  console.log(chalk.blue("Scheduled task: Posting to Twitter and handling mentions..."));
  await handlePostTweet();
  await handleMentions();
});

// Start the server
server.listen(PORT, () => {
  console.log(chalk.yellow(`Server running and listening on port ${PORT}`));
});
