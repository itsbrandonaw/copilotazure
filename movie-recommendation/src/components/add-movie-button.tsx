'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { PlusIcon } from 'lucide-react'
import { MovieForm } from './movie-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function AddMovieButton() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4 w-full group transition-all duration-300 ease-in-out transform hover:scale-105">
          <PlusIcon className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
          Add Movie
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a movie you&apos;ve watched</DialogTitle>
        </DialogHeader>
        <MovieForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
