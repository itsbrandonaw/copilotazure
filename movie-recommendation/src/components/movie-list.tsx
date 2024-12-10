'use client'

import { useState } from 'react'
import { StarIcon } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"

type Movie = {
  id: number
  title: string
  rating: number
}

export function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([
    { id: 1, title: "Inception", rating: 5 },
    { id: 2, title: "The Matrix", rating: 4 },
    { id: 3, title: "Interstellar", rating: 5 },
  ])

  return (
    <div className="flex-grow">
      <h2 className="text-2xl font-semibold mb-4">Your Watched Movies</h2>
      <ScrollArea className="h-[calc(100vh-300px)]">
        <ul className="space-y-2 pr-4">
          {movies.map((movie) => (
            <li key={movie.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center transition-all duration-300 ease-in-out hover:bg-gray-700 hover:shadow-lg transform hover:-translate-y-1">
              <span>{movie.title}</span>
              <span className="flex items-center">
                {[...Array(movie.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </span>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}

