"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import PageTransition from '@/components/page-transition'
import InterviewCard from '@/components/interviewCard'

// Dummy data for testing
const dummyInterviews = [
  { id: '1', title: 'React Interview', date: '2026-01-20', status: 'completed' as const },
  { id: '2', title: 'Node.js Interview', date: '2026-01-22', status: 'pending' as const },
]

const InterviewPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen p-6 md:p-8">
        <section className="flex flex-col gap-6 mt-8">
          <h2>Your Interviews</h2>
          
          <div className="interviews-section">
            {dummyInterviews.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6 mt-8">
          <h2>Take an Interview</h2>
          
          <div className="interviews-section">
            <p>There are no interviews available</p>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}

export default InterviewPage
