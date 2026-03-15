import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeTimestamp(timestamp:number) {

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview"
  });

  const prompt = `
  The most viewed moment of a YouTube video occurs at ${timestamp} seconds.
  Convert this to HH:MM:SS and describe what type of moment this usually represents.
  `;

  const result = await model.generateContent(prompt);

  return result.response.text();
}