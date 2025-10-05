import { GoogleGenAI } from "@google/genai";
import { systemPrompt, fixPrompt } from "../enums/enum";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // i have given a dummy env file and you ahve to make .env file and paste your own key

if (!apiKey) {
  throw new Error(
    "Gemini API key is missing. Set VITE_GEMINI_API_KEY in your .env file. " +
      "Note: exposing API keys in client-side code is a security risk — prefer calling Gemini from a server."
  );
}

const ai = new GoogleGenAI({ apiKey });
export async function ReviewCode(value: string, code: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: systemPrompt(value, code),
  });
  console.log(response.text);
  return response.text;
}

export async function FixCode(value: string, code: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: fixPrompt(value, code),
  });
  return response.text;
}
