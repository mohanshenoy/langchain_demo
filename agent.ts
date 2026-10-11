import { config } from "dotenv";
config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SerpAPI } from "@langchain/community/tools/serpapi";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.8-flash",
  temperature: 0.7,
  apiKey: process.env.GOOGLE_API_KEY,
});

const searchTool = new SerpAPI(process.env.SERPAPI_API_KEY, {
  location: "India",
});

const agent = createReactAgent({
  llm: model,
  tools: [searchTool],
});

const res = await agent.invoke({
  messages: [{ role: "user", content: "What is the latest news about ISRO?" }],
});

console.log("Final Output:", res.messages[res.messages.length - 1].content);