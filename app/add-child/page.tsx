"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Logo } from '../components/logo'

const interests = [
  "Art & Crafts", "Music", "Sports", "Nature", "Science", "Reading",
  "Cooking", "Animals", "Puzzles", "Building", "Dancing", "Gardening"
]

export default function AddChild() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    interests: [] as string[],
    notes: '',
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Child details submitted:', formData)
    router.push('/evaluation')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <Logo />
      </div>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Child Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Child's Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="age">Child's Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                required
                min="2"
                max="6"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Interests</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {interests.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest}
                      checked={formData.interests.includes(interest)}
                      onCheckedChange={() => handleInterestChange(interest)}
                    />
                    <label
                      htmlFor={interest}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {interest}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any additional information about your child..."
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-6">
            Save and Continue
          </Button>
        </form>
      </div>
    </div>
  )
}

