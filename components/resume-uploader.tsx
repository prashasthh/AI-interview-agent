"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, X, FileText, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ResumeUploaderProps {
  onFileSelect?: (file: File | null) => void
  className?: string
}

export default function ResumeUploader({ onFileSelect, className }: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const acceptedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  const maxSize = 5 * 1024 * 1024 // 5MB

  const validateFile = (file: File): boolean => {
    setError(null)
    
    if (!acceptedTypes.includes(file.type)) {
      setError('Please upload a PDF, DOC, or DOCX file')
      return false
    }
    
    if (file.size > maxSize) {
      setError('File size must be less than 5MB')
      return false
    }
    
    return true
  }

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      setFile(file)
      onFileSelect?.(file)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFile(droppedFile)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleFile(selectedFile)
    }
  }

  const removeFile = () => {
    setFile(null)
    setError(null)
    onFileSelect?.(null)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <Card className={cn("bg-white/5 backdrop-blur-sm border-white/10", className)}>
      <CardHeader>
        <CardTitle className="text-white">Upload Your Resume</CardTitle>
        <CardDescription className="text-gray-400">
          Upload your resume in PDF, DOC, or DOCX format (max 5MB)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!file ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragging ? "border-primary bg-primary/10" : "border-gray-600 hover:border-primary/50",
              error && "border-red-500"
            )}
          >
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInput}
            />
            <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center gap-4">
              <Upload className="w-12 h-12 text-gray-500" />
              <div>
                <p className="text-lg font-medium mb-1 text-white">
                  Drop your resume here or click to browse
                </p>
                <p className="text-sm text-gray-400">
                  Supports: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>
              <Button type="button" variant="outline">
                Select File
              </Button>
            </label>
          </div>
        ) : (
          <div className="border rounded-lg p-4 bg-green-900/20 border-green-700">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <FileText className="w-10 h-10 text-green-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm truncate text-white">{file.name}</p>
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
        
        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}
      </CardContent>
    </Card>
  )
}
