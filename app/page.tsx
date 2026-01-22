"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import PageTransition from '@/components/page-transition'
import { motion } from 'framer-motion'
import InterviewCard from '@/components/interviewCard'
import { getRandomInterviewCover } from '@/public/constants'

const Page = () => {
  const [dummyInterviews, setDummyInterviews] = useState([
    { 
      interviewId: '1', 
      userId: 'user1',
      role: 'Frontend Developer',
      type: 'Technical', 
      techstack: ['Netflix', 'React', 'TypeScript'],
      createdAt: '2026-01-20',
      cover: ''
    },
    { 
      interviewId: '2', 
      userId: 'user1',
      role: 'Full Stack Developer',
      type: 'Mixed', 
      techstack: ['Node.js', 'MongoDB'],
      createdAt: '2026-01-22',
      cover: ''
    },
    { 
      interviewId: '3', 
      userId: 'user1',
      role: 'Backend Developer',
      type: 'Technical', 
      techstack: ['Python', 'Django', 'PostgreSQL'],
      createdAt: '2026-01-19',
      cover: ''
    },
    { 
      interviewId: '4', 
      userId: 'user1',
      role: 'DevOps Engineer',
      type: 'Technical', 
      techstack: ['Docker', 'Kubernetes', 'AWS'],
      createdAt: '2026-01-18',
      cover: ''
    },
  ])

  useEffect(() => {
    // Generate random covers only on client side
    setDummyInterviews([
      { 
        interviewId: '1', 
        userId: 'user1',
        role: 'Frontend Developer',
        type: 'Technical', 
        techstack: ['Netflix', 'React', 'TypeScript'],
        createdAt: '2026-01-20',
        cover: getRandomInterviewCover()
      },
      { 
        interviewId: '2', 
        userId: 'user1',
        role: 'Full Stack Developer',
        type: 'Mixed', 
        techstack: ['Node.js', 'MongoDB'],
        createdAt: '2026-01-22',
        cover: getRandomInterviewCover()
      },
      { 
        interviewId: '3', 
        userId: 'user1',
        role: 'Backend Developer',
        type: 'Technical', 
        techstack: ['Python', 'Django', 'PostgreSQL'],
        createdAt: '2026-01-19',
        cover: getRandomInterviewCover()
      },
      { 
        interviewId: '4', 
        userId: 'user1',
        role: 'DevOps Engineer',
        type: 'Technical', 
        techstack: ['Docker', 'Kubernetes', 'AWS'],
        createdAt: '2026-01-18',
        cover: getRandomInterviewCover()
      },
    ])
  }, [])

  return (
    <PageTransition>
      <div className="min-h-screen p-4">
        <div className="flex items-center justify-center py-12">
          <div className="card-border max-w-5xl w-full">
            <div className="card p-8 md:p-12">
              <section className="flex items-center justify-between gap-8 md:gap-12 flex-col md:flex-row">
                <div className="flex flex-col gap-6 max-w-lg">
                  <h2 className="text-3xl md:text-4xl font-semibold">Get Interview-Ready with AI-Powered Practice & Feedback</h2>
                  <p className="text-lg text-light-100">
                    Practice on real interview questions & get instant feedback
                  </p>
                  
                  <Button asChild className="btn-primary max-sm:w-full hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:brightness-110 transition-all duration-300 ease-out">
                    <Link href="/interview">Start an Interview</Link>
                  </Button>
                </div>
                
                <motion.div
                  className="max-sm:hidden shrink-0"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <Image src="/robot.png" alt="robo-dude" width={400} height={400} />
                </motion.div>
              </section>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <section className="flex flex-col gap-6 mt-8">
            <h2>Your Interviews</h2>
            
            <div className="interviews-section">
              <div className="flex gap-4 flex-wrap">
                {dummyInterviews.map((interview) => (
                  <InterviewCard key={interview.interviewId} {...interview} />
                ))}
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6 mt-8 mb-12">
            <h2>Take an Interview</h2>
            
            <div className="interviews-section">
              <p>There are no interviews available</p>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  )
}

export default Page
