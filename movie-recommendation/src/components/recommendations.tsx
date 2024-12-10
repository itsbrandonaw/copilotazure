'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"

type Movie = {
  id: number
  title: string
  description: string
}

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)

  const fetchRecommendations = async () => {
    setLoading(true)
    // This is where you would typically call your Azure AI endpoint
    // For now, we'll simulate an API call with a timeout
    await new Promise(resolve => setTimeout(resolve, 2000))
    setRecommendations([
      { id: 1, title: "The Shawshank Redemption", description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency." },
      { id: 2, title: "The Godfather", description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son." },
      { id: 3, title: "Pulp Fiction", description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption." },
    ])
    setLoading(false)
  }

  useEffect(() => {
    fetchRecommendations()
  }, [])

  return (
    <div className="w-1/2 flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
      <ScrollArea className="flex-grow">
        <AnimatePresence>
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <Loader2 className="h-8 w-8 animate-spin" />
            </motion.div>
          ) : (
            <motion.ul
              key="recommendations"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 pr-4"
            >
              {recommendations.map((movie) => (
                <motion.li
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800 p-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-700 hover:shadow-lg"
                >
                  <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                  <p className="text-gray-400">{movie.description}</p>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </ScrollArea>
      <Button onClick={fetchRecommendations} className="mt-4 group transition-all duration-300 ease-in-out transform hover:scale-105">
        <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
        Refresh Recommendations
      </Button>
    </div>
  )
}
