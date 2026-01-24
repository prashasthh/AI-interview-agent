"use client";

import { useState, useEffect } from "react";
import PageTransition from '@/components/page-transition';
import { db } from "@/firebase/client";
import { collection, query, where, getDocs } from "firebase/firestore";
import Vapi from "@vapi-ai/web";
import Image from "next/image";
import LogoutButton from "@/components/logout-button";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/client";
import { onAuthStateChanged } from "firebase/auth";

/* -------------------- VAPI INSTANCE -------------------- */
const vapi = new Vapi(
  process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!
);

export default function InterviewPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [callActive, setCallActive] = useState(false);
  const [transcript, setTranscript] = useState(
    "Wait for the AI to start speaking..."
  );
  const [showFeedbackButton, setShowFeedbackButton] = useState(false);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  /* -------------------- AUTH + VAPI EVENTS -------------------- */
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/sign-in");
      } else {
        setIsLoading(false);
        setUserId(user.uid);

        const q = query(
          collection(db, "interviews"),
          where("userId", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        const data: any[] = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setInterviews(data);
      }
    });

    vapi.on("call-start", () => {
      setCallActive(true);
      setShowFeedbackButton(false);
      setTranscript("Interview in progress...");
    });

    vapi.on("call-end", () => {
      setCallActive(false);
      setTranscript("Interview completed. Feedback is ready.");
      setShowFeedbackButton(true);
    });

    vapi.on("message", (message: any) => {
      if (
        message.type === "transcript" &&
        message.transcriptType === "partial"
      ) {
        setTranscript(message.transcript);
      }
    });

    vapi.on("error", () => {
      setCallActive(false);
      setTranscript("Interview ended due to connection issue.");
      setShowFeedbackButton(true);
    });

    return () => {
      unsubscribeAuth();
      vapi.removeAllListeners();
      vapi.stop();
    };
  }, [router]);

  /* -------------------- START CALL -------------------- */
  const startCall = async () => {
    try {
      setShowFeedbackButton(false);
      await vapi.start("94430b07-949d-4c66-a462-c61f6e54b94b");
    } catch (err) {
      console.error("VAPI START ERROR:", err);
      alert("Failed to start call.");
    }
  };

  /* -------------------- STOP CALL -------------------- */
  const stopCall = () => {
    vapi.stop();
    setCallActive(false);
    setTranscript("Interview completed. Feedback is ready.");
    setShowFeedbackButton(true);
  };

  /* -------------------- LOADING -------------------- */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  /* -------------------- UI -------------------- */
  return (
    <PageTransition>
      <div className="min-h-screen w-full bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">

        {/* Past Interviews */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-2">Your Past Interviews</h2>
          {interviews.length === 0 ? (
            <p className="text-gray-400">No interviews found.</p>
          ) : (
            <div className="space-y-6">
              {interviews.map((interview) => (
                <div
                  key={interview.id}
                  className="border border-white/10 rounded-xl p-4 bg-white/5"
                >
                  <div className="mb-2 text-sm text-gray-300">
                    <span className="font-semibold">Role:</span> {interview.role} |{" "}
                    <span className="font-semibold">Level:</span> {interview.level} |{" "}
                    <span className="font-semibold">Type:</span> {interview.type}
                  </div>
                  <ol className="list-decimal list-inside text-white/90">
                    {Array.isArray(interview.questions) &&
                      interview.questions.map((q: string, idx: number) => (
                        <li key={idx}>{q}</li>
                      ))}
                  </ol>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            <h1 className="text-xl font-semibold">IntervAi</h1>
          </div>
          <LogoutButton variant="outline" />
        </div>

        <h2 className="text-lg text-gray-300 mb-10">
          Live Interview Session
        </h2>

        {/* Transcript */}
        <div className="w-full max-w-3xl mx-auto mb-6">
          <div className="rounded-xl border border-white/10 bg-black/40 px-6 py-4">
            <p className="text-gray-300 text-center text-sm">
              {transcript}
            </p>
          </div>
        </div>

        {/* Call Button */}
        <div className="flex justify-center">
          <button
            onClick={callActive ? stopCall : startCall}
            className={`px-8 py-3 rounded-full font-medium transition-all duration-300
              ${
                callActive
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
          >
            {callActive ? "End Call" : "Start Call"}
          </button>
        </div>

        {/* ✅ VIEW FEEDBACK BUTTON */}
        {showFeedbackButton && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => {
                window.location.href = "/feedback";
              }}
              className="px-8 py-3 rounded-full bg-indigo-500 hover:bg-indigo-600 transition font-medium"
            >
              View Feedback
            </button>
          </div>
        )}

        </div>
      </div>
    </PageTransition>
  );
}
