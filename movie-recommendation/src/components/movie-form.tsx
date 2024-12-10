'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FilmIcon, StarIcon } from 'lucide-react'

export function MovieForm({ onSuccess }: { onSuccess: () => void }) {
  const [movie, setMovie] = useState('')
  const [rating, setRating] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log('Submitted:', { movie, rating })
    // Reset form and close modal
    setMovie('')
    setRating('')
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="movie">Movie Title</Label>
        <div className="flex mt-1">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-800 text-gray-400">
            <FilmIcon className="h-5 w-5" />
          </span>
          <Input
            type="text"
            id="movie"
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            className="rounded-none rounded-r-lg"
            placeholder="Enter movie title"
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="rating">Rating (1-5)</Label>
        <div className="flex mt-1">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-800 text-gray-400">
            <StarIcon className="h-5 w-5" />
          </span>
          <Input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            className="rounded-none rounded-r-lg"
            placeholder="Rate from 1 to 5"
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">Add Movie</Button>
    </form>
  )
}