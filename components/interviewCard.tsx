import React from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import { Button } from './ui/button'
import Link from 'next/link'

interface InterviewCardProps {
  interviewId: string
  userId: string
  role: string
  type: string
  techstack: string[]
  createdAt: string
  cover?: string
}

const getTechIcon = (tech: string) => {
  const techLower = tech.toLowerCase().replace(/\s+/g, '')
  const iconMap: Record<string, string> = {
    'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'typescript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'nodejs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'mongodb': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'nextjs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
    'vue': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    'netflix': 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    'docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    'aws': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    'django': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    'postgresql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  }
  return iconMap[techLower] || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg'
}

const InterviewCard = ({ interviewId, userId, role, type, techstack, createdAt, cover }: InterviewCardProps) => {
  const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
  const formattedDate = dayjs(createdAt).format('MMM D, YYYY');
  const mainTech = techstack?.[0] || 'react'

  return (
    <div className="card-border w-[360px] max-sm:w-full">
      <div className="card-interview flex flex-col gap-4 min-h-[320px]">
        <div className="relative">
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-primary-200/30">
            <p className="badge-text">{normalizedType}</p>
          </div>

          <div className="flex justify-center pt-4 pb-2">
            {cover ? (
              <Image 
                src={cover} 
                alt="company logo" 
                width={80} 
                height={80} 
                quality={100}
                className="object-contain size-[80px]"
              />
            ) : (
              <div className="size-[80px] rounded-full bg-gradient-to-br from-primary-200 to-primary-100 flex items-center justify-center p-5">
                <Image 
                  src={getTechIcon(mainTech)} 
                  alt={`${mainTech} logo`} 
                  width={60} 
                  height={60} 
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 flex-1">
          <h3 className="text-xl font-semibold">{role} Interview</h3>
          
          <div className="flex items-center gap-4 text-sm text-light-400">
            <div className="flex items-center gap-1">
              <span>📅</span>
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>⭐</span>
              <span>--/100</span>
            </div>
          </div>

          <p className="text-sm text-light-400">
            You haven&apos;t taken the interview yet. Take it now to improve your skills.
          </p>

          <div className="flex items-center justify-between mt-auto pt-4">
            <div className="flex gap-2">
              {techstack.slice(0, 3).map((tech, index) => (
                <div key={index} className="relative group">
                  <div className="size-10 rounded-full bg-dark-200 flex items-center justify-center p-2 hover:scale-110 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
                    <Image 
                      src={getTechIcon(tech)} 
                      alt={tech} 
                      width={24} 
                      height={24} 
                      className="object-contain"
                    />
                  </div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs bg-dark-200 px-2 py-1 rounded whitespace-nowrap transition-opacity duration-200">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
            
            <Button asChild className="bg-white text-black hover:bg-gray-50 font-semibold rounded-full px-8 py-3 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 hover:brightness-110 transition-all duration-300 ease-out cursor-pointer" size="sm">
              <Link href={`/interview/${interviewId}`}>View Interview</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InterviewCard
