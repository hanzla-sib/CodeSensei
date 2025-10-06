import { useState } from "react";
import { ReviewCode, FixCode } from "../helper/AiHelper";

export const useCodeReview = () => {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const reviewCode = async (language: string, code: string) => {
    if (loading) return; // Prevent multiple clicks
    
    setError(null);
    setResponse("");
    setLoading(true);
    
    try {
      const responseAi = await ReviewCode(language, code);
      setResponse(responseAi?.toString() || "No response");
    } catch (err: unknown) {
      console.error("ReviewCode error:", err);
      let msg = "Unknown error";
      if (typeof err === "string") {
        msg = err;
      } else if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as { message?: unknown }).message === "string"
      ) {
        msg = (err as { message?: unknown }).message as string;
      }
      setError(msg);
      setResponse("");
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, reviewCode };
};

export const useCodeFix = () => {
  const [fixLoading, setFixLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Extract code from a fenced markdown code block. If none found, return full text.
  const extractCodeFromMarkdown = (text: string) => {
    if (!text) return "";
    // Try to find ```lang\n...``` blocks
    const fenceRe = /```(?:\w+)?\n([\s\S]*?)\n```/m;
    const m = text.match(fenceRe);
    if (m && m[1]) return m[1].trim();
    return text.trim();
  };

  const fixCode = async (
    language: string,
    code: string,
    onCodeUpdate: (newCode: string) => void,
    onResponseUpdate: (response: string) => void
  ) => {
    if (fixLoading) return;
    
    setError(null);
    setFixLoading(true);
    
    try {
      const resp = await FixCode(language, code);
      const respText = resp?.toString() || "";
      
      // Extract code block from response
      const fixed = extractCodeFromMarkdown(respText);
      
      // Update editor content
      onCodeUpdate(fixed);
      
      // Also show the full response in the response panel for transparency
      onResponseUpdate(respText);
    } catch (err: unknown) {
      console.error("FixCode error:", err);
      let msg = "Unknown error";
      if (typeof err === "string") {
        msg = err;
      } else if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as { message?: unknown }).message === "string"
      ) {
        msg = (err as { message?: unknown }).message as string;
      }
      setError(msg);
    } finally {
      setFixLoading(false);
    }
  };

  return { fixLoading, error, fixCode };
};