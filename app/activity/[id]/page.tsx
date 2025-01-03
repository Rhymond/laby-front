"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Logo } from '../../components/logo'

const activities = [
  {
    id: 1,
    title: "Shape Sorting Challenge",
    skill: "Cognitive / Thinking Skills",
    description: "This activity helps improve your child's cognitive skills by recognizing shapes and solving problems.",
    parentInstructions: [
      "Prepare a variety of household items with different shapes (e.g., blocks, cups, balls).",
      "Create outlines of these shapes on a large piece of paper or cardboard.",
      "Explain the activity to your child and demonstrate how to match a shape to its outline.",
      "Encourage your child to sort the items by matching them to their outlines.",
      "Gradually increase difficulty by adding more shapes or introducing time challenges."
    ],
    childInstructions: [
      "Look at the shape of each item.",
      "Find the outline that matches the item's shape.",
      "Place the item on its matching outline.",
      "Try to match all the shapes as quickly as you can!"
    ],
    images: [
      "/placeholder.svg?height=200&width=300&text=Step+1:+Prepare+items",
      "/placeholder.svg?height=200&width=300&text=Step+2:+Create+outlines",
      "/placeholder.svg?height=200&width=300&text=Step+3:+Child+sorting+shapes",
      "/placeholder.svg?height=200&width=300&text=Step+4:+Completed+activity"
    ],
  },
  // Add more activities here...
]

function FakeLoader({ isLoading }: { isLoading: boolean }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = oldProgress + 10
          if (newProgress === 100) {
            clearInterval(timer)
          }
          return newProgress
        })
      }, 500)
      return () => clearInterval(timer)
    }
  }, [isLoading])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Generating Personalized Activity</h2>
        <Progress value={progress} className="w-full" />
        <p className="mt-2 text-sm text-gray-600">Analyzing child's skill levels...</p>
      </div>
    </div>
  )
}

export default function Activity({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true)
  const [completed, setCompleted] = useState(false)
  const router = useRouter()
  const activity = activities.find(a => a.id === parseInt(params.id)) || activities[0]

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleComplete = () => {
    setCompleted(true)
    router.push(`/activity-evaluation/${params.id}`)
  }

  if (loading) {
    return <FakeLoader isLoading={loading} />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Logo href="/dashboard" />
        <h1 className="text-3xl font-bold">Activity Details</h1>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{activity.title}</CardTitle>
          <CardDescription>{activity.skill}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{activity.description}</p>
          
          <h3 className="font-semibold text-lg mb-2">Instructions for Parents:</h3>
          <ol className="list-decimal list-inside mb-4">
            {activity.parentInstructions.map((instruction, index) => (
              <li key={index} className="mb-2">{instruction}</li>
            ))}
          </ol>

          <h3 className="font-semibold text-lg mb-2">Instructions for Child:</h3>
          <ol className="list-decimal list-inside mb-4">
            {activity.childInstructions.map((instruction, index) => (
              <li key={index} className="mb-2">{instruction}</li>
            ))}
          </ol>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {activity.images.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Activity step ${index + 1}`}
                width={300}
                height={200}
                className="rounded-lg w-full h-auto"
              />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleComplete} disabled={completed} className="w-full">
            {completed ? 'Activity Completed' : 'Mark as Completed'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

