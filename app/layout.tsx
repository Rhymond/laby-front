import './globals.css'
import { Inter } from 'next/font/google'
import { Logo } from './components/logo'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Laby - Child Development Platform',
  description: 'Personalized activities for child development',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
          {children}
        </div>
      </body>
    </html>
  )
}

