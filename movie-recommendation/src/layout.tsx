import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MovieGPT',
  description: 'Get personalized movie recommendations powered by AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100 overflow-hidden`}>
        {children}
      </body>
    </html>
  )
}