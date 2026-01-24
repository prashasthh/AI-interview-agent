"use client"

import { useState, useEffect } from 'react'
import PageTransition from '@/components/page-transition';
import ResumeUploader from '@/components/resume-uploader'
import RoleSelector from '@/components/role-selector'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/firebase/client'
import { onAuthStateChanged } from 'firebase/auth'

export default function InterviewSetupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/sign-in');
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async () => {
    if (!selectedFile || !selectedRole) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append('resume', selectedFile)
      formData.append('roleId', selectedRole)

      // Example: Upload to your backend
      // const response = await fetch('http://localhost:3000/api/upload-resume', {
      //   method: 'POST',
      //   body: formData,
      // })
      
      // if (!response.ok) {
      //   throw new Error('Failed to upload resume')
      // }

      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Navigate to interview or next step
      console.log('Resume uploaded:', selectedFile.name)
      console.log('Selected role:', selectedRole)
      
      // You can navigate to the interview page or show success message
      router.push('/interview')
      
    } catch (error) {
      console.error('Error submitting:', error)
      alert('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isValid = selectedFile && selectedRole

  if (isLoading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-black py-12 px-4">
        <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <Link href="/" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              ← Back to Home
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Prepare for Your Interview
          </h1>
          <p className="text-gray-300 text-lg">
            Upload your resume and select the role you're applying for
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <ResumeUploader onFileSelect={setSelectedFile} />
          <RoleSelector onRoleSelect={setSelectedRole} />
        </div>

        {/* Status Indicators */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6 mb-6">
          <h3 className="font-semibold mb-4 text-white">Setup Progress</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {selectedFile ? (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
              )}
              <span className={selectedFile ? "text-green-400" : "text-gray-400"}>
                Resume uploaded
              </span>
            </div>
            <div className="flex items-center gap-3">
              {selectedRole ? (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
              )}
              <span className={selectedRole ? "text-green-400" : "text-gray-400"}>
                Role selected
              </span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            size="lg"
            className="min-w-[200px]"
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">Processing...</span>
              </>
            ) : (
              <>
                <span className="mr-2">Start Interview</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </div>

        {/* Help Text */}
        {!isValid && (
          <p className="text-center text-sm text-gray-400 mt-4">
            Please complete both steps to continue
          </p>
        )}
        </div>
      </div>
    </PageTransition>
  )
}
