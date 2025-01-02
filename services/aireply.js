import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const processMentionWithAI = async (mentionText) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Someone tagged our bot and asked: "${mentionText}"
    Please provide a friendly and helpful response not more than 280 characters.`;

  const result = await model.generateContent(prompt);

  return result?.response?.text?.() || "I couldn't generate a response, sorry!";
};

export { processMentionWithAI };