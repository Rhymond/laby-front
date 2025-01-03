"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from '../components/logo'

const skills = [
  { name: "Cognitive / Thinking Skills", value: 70, color: "#FF6B6B" },
  { name: "Language & Communication", value: 60, color: "#4ECDC4" },
  { name: "Motor Skills", value: 80, color: "#45B7D1" },
  { name: "Social & Emotional Development", value: 65, color: "#FFA07A" },
  { name: "Creativity & Imagination", value: 75, color: "#98D8C8" },
  { name: "Adaptive / Self-Help Skills", value: 55, color: "#FFBE76" },
]

const activities = [
  { id: 1, title: "Shape Sorting Challenge", skill: "Cognitive / Thinking Skills" },
  { id: 2, title: "Storytelling Adventure", skill: "Language & Communication" },
  { id: 3, title: "Obstacle Course Fun", skill: "Motor Skills" },
  { id: 4, title: "Emotion Charades", skill: "Social & Emotional Development" },
  { id: 5, title: "Imaginative Art Project", skill: "Creativity & Imagination" },
  { id: 6, title: "Dressing Up Race", skill: "Adaptive / Self-Help Skills" },
]

function CircularProgress({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200 stroke-current"
            strokeWidth="8"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          ></circle>
          <circle
            className="progress-ring__circle stroke-current"
            strokeWidth="8"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - value / 100)}`}
            style={{
              transition: "stroke-dashoffset 0.35s",
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
              stroke: color,
            }}
          ></circle>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold" style={{ color: color }}>{value}</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-center">{label}</span>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Logo href="/dashboard" />
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Child's Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <CircularProgress key={skill.name} value={skill.value} label={skill.name} color={skill.color} />
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Available Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <Card key={activity.id}>
              <CardHeader>
                <CardTitle>{activity.title}</CardTitle>
                <CardDescription>{activity.skill}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This activity helps improve your child's {activity.skill.toLowerCase()}.</p>
              </CardContent>
              <CardFooter>
                <Link href={`/activity/${activity.id}`} passHref>
                  <Button>View Activity</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

