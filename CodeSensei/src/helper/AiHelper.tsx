import { GoogleGenAI } from "@google/genai";
import { systemPrompt } from "../enums/enum";

// Vite exposes only variables that start with VITE_ to the client code.
// Try the Vite-provided variable first, then fall back to a Node-style env var
// which can be useful when running server-side or in non-Vite environments.
const apiKey = 'your api key here';

if (!apiKey) {
  throw new Error(
    "Gemini API key is missing. Set VITE_GEMINI_API_KEY in your .env for Vite (or GEMINI_API_KEY for Node). " +
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
}
