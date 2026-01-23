import { google } from '@ai-sdk/google'
import { generateText } from 'ai'
import { db } from '@/firebase/admin'
import { getRandomInterviewCover } from '@/public/constants'

export async function GET() {
  return Response.json({ success: true, data: 'THANK YOU!' }, { status: 200 })
}

export async function POST(request: Request) {
  try {
    const { type, role, level, techstack, amount, userid } = await request.json()
    const { text: questions } = await generateText({
      model: google('gemini-2.0-flash'),
      prompt: `Prepare questions for a job interview.
The job role is ${role}.
The job experience level is ${level}.
The tech stack used in the job is: ${techstack}.
The focus between behavioural and technical questions should lean towards: ${type}.
The amount of questions required is: ${amount}.
Please return only the questions, without any additional text.
The questions are going to be read by a voice assistant so do not use "/" or "*" or any special characters.
Return the questions formatted like this:
["Question 1", "Question 2", "Question 3"]

Thank you! <3`,
    })

    const parsedQuestions = parseQuestions(questions)

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(',').map((item: string) => item.trim()),
      questions: parsedQuestions,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    }

    await db.collection('interviews').add(interview)

    return Response.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

function parseQuestions(raw: string) {
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return parsed
    }
  } catch {}

  const match = raw.match(/\[[\s\S]*\]/)
  if (match) {
    try {
      const parsed = JSON.parse(match[0])
      if (Array.isArray(parsed)) {
        return parsed
      }
    } catch {}
  }

  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}
