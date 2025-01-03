"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Logo } from '../../components/logo'

const activities = [
  {
    id: 1,
    title: "Shape Sorting Challenge",
    skill: "Cognitive / Thinking Skills",
    evaluationQuestions: [
      "Can your child name all the shapes used in the activity?",
      "Did your child match all shapes correctly without assistance?",
      "Was your child able to complete the activity faster on subsequent attempts?",
      "Did your child show problem-solving skills when faced with more complex shapes?"
    ]
  },
  // Add more activities here...
]

export default function ActivityEvaluation({ params }: { params: { id: string } }) {
  const [evaluationAnswers, setEvaluationAnswers] = useState<Record<string, string>>({})
  const router = useRouter()
  const activity = activities.find(a => a.id === parseInt(params.id)) || activities[0]

  const handleEvaluationChange = (questionId: string, value: string) => {
    setEvaluationAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleEvaluationSubmit = () => {
    console.log('Evaluation answers:', evaluationAnswers)
    router.push('/dashboard')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Logo href="/dashboard" />
        <h1 className="text-3xl font-bold">Activity Evaluation</h1>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{activity.title} - Evaluation</CardTitle>
          <CardDescription>{activity.skill}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Please answer the following questions about your child's performance:</p>
          {activity.evaluationQuestions.map((question, index) => (
            <div key={index} className="mb-6">
              <p className="mb-2 font-medium">{question}</p>
              <RadioGroup
                onValueChange={(value) => handleEvaluationChange(index.toString(), value)}
                value={evaluationAnswers[index.toString()] || ''}
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id={`q${index}-yes`} />
                    <Label htmlFor={`q${index}-yes`}>Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partially" id={`q${index}-partially`} />
                    <Label htmlFor={`q${index}-partially`}>Partially</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id={`q${index}-no`} />
                    <Label htmlFor={`q${index}-no`}>No</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button onClick={handleEvaluationSubmit} className="w-full">Submit Evaluation</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

