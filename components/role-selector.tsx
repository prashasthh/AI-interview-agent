"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2, Briefcase } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Role {
  id: string
  title: string
  department?: string
  level?: string
}

interface RoleSelectorProps {
  onRoleSelect?: (roleId: string) => void
  className?: string
  apiEndpoint?: string
}

export default function RoleSelector({ 
  onRoleSelect, 
  className,
  apiEndpoint = 'http://localhost:3000/api/roles'
}: RoleSelectorProps) {
  const [roles, setRoles] = useState<Role[]>([])
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch(apiEndpoint)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch roles: ${response.statusText}`)
        }
        
        const data = await response.json()
        
        // Handle different possible response formats
        const rolesData = Array.isArray(data) ? data : data.roles || []
        setRoles(rolesData)
      } catch (err) {
        console.error('Error fetching roles:', err)
        setError(err instanceof Error ? err.message : 'Failed to load roles')
        
        // Fallback to sample data for development
        setRoles([
          { id: '1', title: 'Frontend Developer', department: 'Engineering', level: 'Mid' },
          { id: '2', title: 'Backend Developer', department: 'Engineering', level: 'Senior' },
          { id: '3', title: 'Full Stack Developer', department: 'Engineering', level: 'Junior' },
          { id: '4', title: 'Product Manager', department: 'Product', level: 'Mid' },
          { id: '5', title: 'UI/UX Designer', department: 'Design', level: 'Mid' },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchRoles()
  }, [apiEndpoint])

  const handleRoleChange = (value: string) => {
    setSelectedRole(value)
    onRoleSelect?.(value)
  }

  return (
    <Card className={cn("bg-white/5 backdrop-blur-sm border-white/10", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Briefcase className="w-5 h-5" />
          Select Role
        </CardTitle>
        <CardDescription className="text-gray-400">
          Choose the role you're interviewing for
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <Select value={selectedRole} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{role.title}</span>
                      {(role.department || role.level) && (
                        <span className="text-xs text-gray-500">
                          {[role.department, role.level].filter(Boolean).join(' • ')}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {error && (
              <p className="text-sm text-amber-400 mt-2 flex items-center gap-1">
                <span className="text-xs">⚠️</span>
                {error} (Using sample data)
              </p>
            )}
            
            {!isLoading && roles.length === 0 && (
              <p className="text-sm text-gray-400 mt-2 text-center">
                No roles available
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
