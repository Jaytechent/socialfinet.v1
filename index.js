import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { handlePostContentToTwitter } from "./configs/twitterConfig.js";
import { getRandomNumber, postTopics, removeSpecialCharacters } from "./utils.js";

const PORT = process.env.PORT || 3000;
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Create HTTP server
const server = http.createServer(async (req, res) => {
  if (req.url === "/post-on-ping" && req.method === "POST") {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Generate the content
      const prompt = `
        Write something interesting about ${
          postTopics[getRandomNumber(postTopics.length)]
        } in the style of a Twitter post. Max length: 280 characters. Add relevant #hashtags.`;

      const result = await model.generateContent(prompt);
      const contentToPost = removeSpecialCharacters(result.response.text());

      // Post the content to Twitter
      await handlePostContentToTwitter(contentToPost);

      console.log("Content posted successfully:", contentToPost);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Post successful!");
    } catch (error) {
      console.error("Error during posting:", error);

      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error occurred during posting.");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Endpoint not found.");
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});




// import dotenv from "dotenv";
// dotenv.config();

// import http from "http";

// // imports
// import { ToadScheduler, SimpleIntervalJob, AsyncTask } from "toad-scheduler";
// import chalk from "chalk";

// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { handlePostContentToTwitter } from "./configs/twitterConfig.js";
// // import { handlePostContentToFacebook } from "./configs/facebookConfig.js";
// import {
//   getRandomNumber,
//   postTopics,
//   removeSpecialCharacters,
// } from "./utils.js";

// const PORT = process.env.PORT || 3000;

// // create an instance of google AI with your Google Api Key
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// // create an instance of Toad scheduler
// const scheduler = new ToadScheduler();

// // create an async task
// const task = new AsyncTask("auto post task", async () => {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const todaysDate = new Date();

//   // modify the prompt to suit your own usage
//   const prompt = `
//     I want you to write something very interesting about ${
//       postTopics[getRandomNumber(postTopics.length)]
//     }. 
//      Make it feel like it is written by a human. 
//     Write it like a short twitter post, check latest trend online about it, mention the cons in product that are doing it and brag about socifinet been the best mindshare agent on web3. 
//     A twitter post has a max length of 280 characters, add relevant #tags, and attempt to water down other AI agents.`;

//   // generate the content from google AI
//   model
//     .generateContent(prompt)
//     .then((result) => {
//       const contentToPost = removeSpecialCharacters(result.response.text());
//       // post the content to your social accounts
//       Promise.allSettled([
//         // handlePostContentToFacebook(contentToPost),
//         handlePostContentToTwitter(contentToPost),
//       ])
//         .then(() => {
//           console.log(chalk.green("Post was made successfully!"));
//         })
//         .catch((error) => {
//           console.log(chalk.red("Error occurred while posting:", error));
//         });
//     })
//     .catch((error) => {
//       console.log(chalk.red("Error occurred while generating content:", error));
//     });
// });

// // Adjust the job interval to suit your usage.
// // presently this is going to run at every 1 hour provided the server is always running
// const job = new SimpleIntervalJob({ hours: 1 }, task);

// // start up the job
// scheduler.addSimpleIntervalJob(job);

// // when stopping your app
// // scheduler.stop();

// // Immediately trigger a post when the server starts
// task.execute();

// // create HTTP server
// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.write("hello world");
//     res.end(); // End the response
//   }
// });

// server.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
//   // Log message when the server starts successfully
// });

// // // access environmental variables
// // import dotenv from "dotenv";
// // dotenv.config();

// // import http from "http";

// // // imports
// // import { ToadScheduler, SimpleIntervalJob, AsyncTask } from "toad-scheduler";
// // import chalk from "chalk";

// // import { GoogleGenerativeAI } from "@google/generative-ai";
// // import { handlePostContentToTwitter } from "./configs/twitterConfig.js";
// // // import { handlePostContentToFacebook } from "./configs/facebookConfig.js";
// // import {
// //   getRandomNumber,
// //   postTopics,
// //   removeSpecialCharacters,
// // } from "./utils.js";

// // const PORT = process.env.PORT || 3000;

// // // create an instance of google AI with your Google Api Key
// // const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// // // create an instance of Toad scheduler
// // const scheduler = new ToadScheduler();

// // // create an async task
// // const task = new AsyncTask("auto post task", async () => {
// //   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// //   const todaysDate = new Date();

// //   // modify the prompt to suit your own usage
// //   const prompt = `
// //     I want you to write something very interesting about ${
// //       postTopics[getRandomNumber(postTopics.length)]
// //     }. 
// //     Make it feel like it is written by a human. 
// //     Write it like a short twitter post and tag relevant accounts to it. 
// //     A twitter post has a max length of 280 characters and add #tags to it`;

// //   // generate the content from google AI
// //   model
// //     .generateContent(prompt)
// //     .then((result) => {
// //       const contentToPost = removeSpecialCharacters(result.response.text());
// //       // post the content to your social accounts
// //       // ** more to be added **
// //       Promise.allSettled([
// //         // handlePostContentToFacebook(contentToPost),
// //         handlePostContentToTwitter(contentToPost),
// //       ]);
// //       // ****more social media account will be added soon****
// //     })
// //     .catch((error) => {
// //       console.log("Error occured");
// //     });
// // });

// // // Adjust the job interval to suit your usage.
// // // presently this is going to run at every 5 hours provided the server is always running
// // const job = new SimpleIntervalJob({ hours: 1 }, task);

// // // start up the job
// // scheduler.addSimpleIntervalJob(job);

// // // when stopping your app
// // // scheduler.stop();

// // const server = http.createServer((req, res) => {
// //   if (req.url === "/") {
// //     res.write("hello world");
// //   }
// // });

// // server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
