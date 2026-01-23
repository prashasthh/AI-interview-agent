"use client";

import { useEffect, useState } from "react";
import { vapi } from "@/lib/vapi.sdk";

export default function VapiTest() {
  const [callActive, setCallActive] = useState(false);

  const startCall = async () => {
    await vapi.start({
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [{ role: "system", content: "You are a friendly AI interviewer. Ask one question." }],
      } as any,
      voice: {
        provider: "11labs",
        voiceId: "Rachel",
      } as any,
    });
    setCallActive(true);
  };

  const stopCall = () => {
    vapi.stop();
    setCallActive(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {!callActive ? (
        <button onClick={startCall} className="px-4 py-2 bg-green-600 text-white">
          Start Interview
        </button>
      ) : (
        <button onClick={stopCall} className="px-4 py-2 bg-red-600 text-white">
          Stop Interview
        </button>
      )}
    </div>
  );
}
