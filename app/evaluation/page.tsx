"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Logo } from '../components/logo'

const questions = [
  {
    category: "Cognitive / Thinking Skills",
    questions: [
      "Can your child sort objects by color, shape, or size?",
      "Does your child show interest in counting and numbers?",
      "Can your child complete simple puzzles (4-6 pieces)?",
      "Does your child ask 'why' questions frequently?",
    ],
  },
  {
    category: "Language & Communication",
    questions: [
      "Can your child speak in simple sentences (3-5 words)?",
      "Does your child understand and follow two-step instructions?",
      "Can your child name common objects and body parts?",
      "Does your child engage in pretend play with verbal storylines?",
    ],
  },
  {
    category: "Motor Skills",
    questions: [
      "Can your child catch a large ball with both hands?",
      "Is your child able to use child-safe scissors to cut paper?",
      "Can your child draw basic shapes like circles and squares?",
      "Is your child able to hop on one foot?",
    ],
  },
  {
    category: "Social & Emotional Development",
    questions: [
      "Does your child show empathy when others are upset?",
      "Can your child take turns and share with other children?",
      "Does your child express a range of emotions appropriately?",
      "Can your child engage in cooperative play with peers?",
    ],
  },
  {
    category: "Creativity & Imagination",
    questions: [
      "Does your child engage in imaginative play, creating stories or scenarios?",
      "Can your child use everyday objects in creative ways during play?",
      "Does your child enjoy drawing or painting, creating recognizable forms?",
      "Can your child come up with original ideas for games or activities?",
    ],
  },
  {
    category: "Adaptive / Self-Help Skills",
    questions: [
      "Can your child dress and undress with minimal assistance?",
      "Is your child able to use utensils properly during meals?",
      "Can your child perform basic hygiene tasks (e.g., washing hands, brushing teeth) with reminders?",
      "Does your child help with simple household chores?",
    ],
  },
]

export default function Evaluation() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = () => {
    // In a real application, you would process and store these answers
    console.log('Evaluation answers:', answers)
    router.push('/loading')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Logo />
        <h1 className="text-3xl font-bold">Child Skill Evaluation</h1>
      </div>

      <div className="space-y-8">
        {questions.map((category, categoryIndex) => (
          <Card key={categoryIndex}>
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
              <CardDescription>Please answer the following questions about your child's abilities.</CardDescription>
            </CardHeader>
            <CardContent>
              {category.questions.map((question, questionIndex) => {
                const questionId = `${categoryIndex}-${questionIndex}`
                return (
                  <div key={questionId} className="mb-4">
                    <p className="mb-2">{question}</p>
                    <RadioGroup
                      onValueChange={(value) => handleAnswerChange(questionId, value)}
                      value={answers[questionId] || ''}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id={`${questionId}-yes`} />
                        <Label htmlFor={`${questionId}-yes`}>Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sometimes" id={`${questionId}-sometimes`} />
                        <Label htmlFor={`${questionId}-sometimes`}>Sometimes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id={`${questionId}-no`} />
                        <Label htmlFor={`${questionId}-no`}>No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button onClick={handleSubmit} size="lg">
          Submit Evaluation
        </Button>
      </div>
    </div>
  )
}

