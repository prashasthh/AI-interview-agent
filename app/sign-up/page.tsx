import React from 'react'
import AuthForm from "@/components/authform";

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 via-dark-300 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:100%_4px]"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <AuthForm type="sign-up" />
      </div>
    </div>
  )
}

export default SignUpPage
