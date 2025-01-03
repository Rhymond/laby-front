"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Logo } from '../components/logo'

export default function Loading() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard')
    }, 3000) // Redirect after 3 seconds

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Logo />
      <Loader2 className="h-12 w-12 animate-spin text-purple-600 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700">Generating Activities...</h2>
      <p className="text-gray-500 mt-2">Please wait while we personalize activities for your child.</p>
    </div>
  )
}

