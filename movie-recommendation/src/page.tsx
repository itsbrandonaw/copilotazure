import { MovieList } from './components/movie-list'
import { Recommendations } from './components/recommendations'
import { AddMovieButton } from './components/add-movie-button'
import { BackgroundEffect } from './components/background-effect'

export default function Home() {
  return (
    <>
      <BackgroundEffect />
      <main className="h-screen flex flex-col p-8">
        <h1 className="text-4xl font-bold mb-8 text-red-600">MovieGPT</h1>
        <div className="flex-grow flex gap-8 overflow-hidden">
          <div className="w-1/2 flex flex-col">
            <AddMovieButton />
            <MovieList />
          </div>
          <Recommendations />
        </div>
      </main>
    </>
  )
}
