"use client";

import { useEffect, useState } from "react";

interface AnswerAnalysis {
  question: string;
  strengths: string[];
  gaps: string[];
  howToImprove: string[];
}

interface Feedback {
  roleFit: {
    score: number;
    summary: string;
  };
  answerAnalysis: AnswerAnalysis[];
  hireLikelihood: {
    decision: string;
    reasoning: string;
  };
}

export default function FeedbackPage() {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const res = await fetch("/api/interview/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: "Frontend Developer",
            level: "Senior",
            techStack: ["Next.js", "React", "TypeScript"],
            questions: [
              "How do you optimize performance in a Next.js application?"
            ],
            answers: [
              "I use image optimization, code splitting, and reduce bundle size."
            ],
          }),
        });

        const data = await res.json();

        if (!data?.roleFit) throw new Error("Invalid feedback");

        setFeedback(data);
      } catch {
        setError("Unable to generate feedback.");
      } finally {
        setLoading(false);
      }
    };

    loadFeedback();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Generating in-depth interview feedback…
      </div>
    );
  }

  if (error || !feedback) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        {error}
      </div>
    );
  }

  const confidence =
    feedback.roleFit.score > 75
      ? "High"
      : feedback.roleFit.score > 55
      ? "Moderate"
      : "Low";

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-semibold">
            Interview Performance Report
          </h1>
          <p className="text-gray-400 mt-2 max-w-3xl">
            This report simulates how a real hiring panel would evaluate your
            interview responses for this role.
          </p>
        </div>

        {/* TOP METRICS */}
        <div className="grid md:grid-cols-4 gap-6">
          <MetricCard
            title="Role Fit"
            value={`${feedback.roleFit.score}/100`}
            color="text-green-400"
          />
          <MetricCard
            title="Confidence Level"
            value={confidence}
            color="text-indigo-400"
          />
          <MetricCard
            title="Answer Depth"
            value={
              feedback.roleFit.score > 70
                ? "Good"
                : feedback.roleFit.score > 50
                ? "Average"
                : "Weak"
            }
            color="text-yellow-400"
          />
          <MetricCard
            title="Hiring Signal"
            value={feedback.hireLikelihood.decision}
            color="text-purple-400"
          />
        </div>

        {/* OVERALL ASSESSMENT */}
        <Section title="Overall Assessment">
          <p className="text-gray-300 leading-relaxed">
            {feedback.roleFit.summary}
          </p>
        </Section>

        {/* ANSWER ANALYSIS */}
        <Section title="Question-by-Question Review">
          {feedback.answerAnalysis.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/10 bg-white/5 p-6 mb-6"
            >
              <p className="text-lg font-medium mb-4">
                {item.question}
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <FeedbackList
                  title="Strengths"
                  color="text-green-400"
                  items={item.strengths}
                />
                <FeedbackList
                  title="Gaps"
                  color="text-red-400"
                  items={item.gaps}
                />
                <FeedbackList
                  title="How to Improve"
                  color="text-yellow-400"
                  items={item.howToImprove}
                />
              </div>
            </div>
          ))}
        </Section>

        {/* IMPROVEMENT PLAN */}
        <Section title="Recommended Improvement Plan">
          <ul className="list-disc ml-6 space-y-2 text-gray-300">
            <li>Practice explaining performance trade-offs (SSR vs ISR).</li>
            <li>Prepare 1–2 real production examples with metrics.</li>
            <li>Revise Next.js optimization strategies (caching, edge).</li>
            <li>Structure answers using problem → action → impact.</li>
          </ul>
        </Section>

        {/* HIRING DECISION */}
        <Section title="Hiring Recommendation">
          <p className="text-xl font-medium mb-2">
            {feedback.hireLikelihood.decision}
          </p>
          <p className="text-gray-300 leading-relaxed">
            {feedback.hireLikelihood.reasoning}
          </p>
        </Section>

      </div>
    </div>
  );
}

/* -------------------- COMPONENTS -------------------- */

function MetricCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        {children}
      </div>
    </div>
  );
}

function FeedbackList({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: string;
}) {
  return (
    <div>
      <p className={`${color} font-semibold mb-2`}>{title}</p>
      <ul className="list-disc ml-5 space-y-1 text-gray-200">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
