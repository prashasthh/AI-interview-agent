import { NextResponse } from 'next/server'

export async function GET() {
  // Sample roles data - replace with your actual data source
  const roles = [
    { id: '1', title: 'Frontend Developer', department: 'Engineering', level: 'Mid' },
    { id: '2', title: 'Backend Developer', department: 'Engineering', level: 'Senior' },
    { id: '3', title: 'Full Stack Developer', department: 'Engineering', level: 'Junior' },
    { id: '4', title: 'DevOps Engineer', department: 'Engineering', level: 'Mid' },
    { id: '5', title: 'Product Manager', department: 'Product', level: 'Senior' },
    { id: '6', title: 'UI/UX Designer', department: 'Design', level: 'Mid' },
    { id: '7', title: 'Data Scientist', department: 'Data', level: 'Senior' },
    { id: '8', title: 'Mobile Developer', department: 'Engineering', level: 'Mid' },
    { id: '9', title: 'QA Engineer', department: 'Engineering', level: 'Junior' },
    { id: '10', title: 'System Architect', department: 'Engineering', level: 'Senior' },
  ]
  
  return NextResponse.json(roles)
}
