import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const { resumeText } = await req.json();

    const prompt = `
You are a senior technical recruiter and hiring manager.

Analyze the following resume and extract a structured summary.

Resume:
${resumeText}

Return ONLY valid JSON in this exact format:

{
  "primarySkills": string[],
  "secondarySkills": string[],
  "experienceLevel": "Junior | Mid | Senior",
  "yearsOfExperience": number,
  "projectHighlights": string[],
  "claimedStrengths": string[],
  "missingOrWeakAreas": string[]
}

Rules:
- Be realistic and conservative
- If information is missing, infer reasonably
- Do NOT add any explanation outside JSON
`;

    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      prompt,
      temperature: 0.3,
    });

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Invalid JSON");

    return NextResponse.json(JSON.parse(match[0]));
  } catch (error) {
    console.error("RESUME ANALYSIS ERROR:", error);
    return NextResponse.json(
      { error: "Resume analysis failed" },
      { status: 500 }
    );
  }
}
