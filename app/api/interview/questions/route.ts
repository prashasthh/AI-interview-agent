import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const {
      resumeSummary,
      questionCount = 5
    } = await req.json();

    const prompt = `
You are a senior technical interviewer.

Candidate Resume Summary:
Primary skills: ${resumeSummary.primarySkills.join(", ")}
Secondary skills: ${resumeSummary.secondarySkills.join(", ")}
Experience level: ${resumeSummary.experienceLevel}
Project highlights: ${resumeSummary.projectHighlights.join(", ")}
Claimed strengths: ${resumeSummary.claimedStrengths.join(", ")}
Weak or missing areas: ${resumeSummary.missingOrWeakAreas.join(", ")}

Generate ${questionCount} interview questions that:
1. Validate claimed strengths
2. Test depth in primary skills
3. Ask about real project experience
4. Probe weak or missing areas
5. Increase difficulty gradually

Rules:
- Questions must sound like a real interviewer
- Avoid generic textbook questions
- Return ONLY a JSON array of strings
`;

    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      prompt,
      temperature: 0.4,
    });

    const match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error("Invalid JSON");

    return NextResponse.json(JSON.parse(match[0]));
  } catch (error) {
    console.error("QUESTION GENERATION ERROR:", error);
    return NextResponse.json(
      { error: "Question generation failed" },
      { status: 500 }
    );
  }
}
