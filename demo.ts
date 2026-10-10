import { config } from "dotenv";
config();

import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// 1. Setup the model
const model = new ChatGoogleGenerativeAI({
    model: "gemini-3.8-flash",
    maxOutputTokens: 2048,
    temperature: 0.7,
    apiKey: process.env.GOOGLE_API_KEY,
});

// 2. Create a prompt
const prompt = PromptTemplate.fromTemplate(
    "You are a helpful Assistant. Answer the question: {topic}"
);

// 3. Build a chain with LCEL pipe syntax
const chain = prompt.pipe(model).pipe(new StringOutputParser());

// 4. Run it
const stream = await chain.stream({ topic: "What is the future of AI in Healthcare?" });

process.stdout.write("Gemini Response:\n");
for await (const chunk of stream) {
    process.stdout.write(chunk);
}
console.log();