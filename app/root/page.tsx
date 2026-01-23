import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const Page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Upload your resume, select your role, and start practicing with AI-powered interviews
          </p>
          
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/setup">Start an Interview</Link>
          </Button>
        </div>
        
        <Image src="/robot.png" alt="robo-dude" width={400} height={400} className="max-sm:hidden" />
      </section>
    </>
  )
}

export default Page