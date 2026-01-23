import Vapi from "@vapi-ai/web";

const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;

if (!token) {
  console.warn("VAPI TOKEN is missing. Set NEXT_PUBLIC_VAPI_WEB_TOKEN in your .env file.");
}

export const vapi = typeof window !== "undefined" 
  ? new Vapi(token!) 
  : null as unknown as Vapi;
