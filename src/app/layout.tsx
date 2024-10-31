import type { Metadata } from 'next'
import './styles/globals.css'

export const metadata: Metadata = {
  title: 'PromptLib - AI Prompt Library',
  description: 'A collection of useful AI prompts for various purposes',
  keywords: ['AI', 'Prompts', 'ChatGPT', 'Machine Learning'],
  authors: [{ name: 'PromptLib Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  )
}
