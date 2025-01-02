import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { fetchMentions, postReply } from "./services/twitterService.js";
import { processMentionWithAI } from "./services/aiReply.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { handlePostContentToTwitter } from "./configs/twitterConfig.js";
import { getRandomNumber, postTopics, removeSpecialCharacters } from "./utils.js";

const PORT = process.env.PORT || 3000;
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const handlePostTweet = async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Generate the content for the post
  const prompt = `
    Write something interesting about "${
      postTopics[getRandomNumber(postTopics.length)]
    }". Call names of latest projects doing something about them and state either cons or their pro.
    Make it feel like it's written by a human. Write it like a short Twitter post, and brag about Socifi Agent as the best mindshare agent on Web3.
    Encourage people to follow @socifinet for greater insights into the web3.
    A Twitter post has a max length of 280 characters. Add relevant #tags and subtly critique other AI agents.
  `;

  const result = await model.generateContent(prompt);
  const generatedText = result.response?.text?.() || "Unable to generate content.";
  const maxLength = 280;
  const contentToPost = removeSpecialCharacters(generatedText).slice(0, maxLength);

  // Post the content to Twitter
  await handlePostContentToTwitter(contentToPost);

  console.log("Content posted successfully:", contentToPost);
};
const handleMentions = async () => {
  const mentions = await fetchMentions();

  if (!mentions || mentions.length === 0) {
    console.log("No mentions to process.");
    return;
  }

  for (const mention of mentions) {
    const { text, id } = mention;

    // Generate AI reply
    const aiReply = await processMentionWithAI(text);

    // Post reply using mention ID
    await postReply(aiReply, id);
  }

  console.log("All mentions processed successfully.");
};


const server = http.createServer(async (req, res) => {
  if (req.url === "/post-on-ping" && req.method === "POST") {
    try {
      // Handle tweet posting
      await handlePostTweet();

      // Handle mentions and replies
      await handleMentions();

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Posts and mentions processed successfully!");
    } catch (error) {
      console.error("Error processing posts or mentions:", error.message);

      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error occurred while processing posts or mentions.");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Endpoint not found.");
  }
});


// Start the server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
