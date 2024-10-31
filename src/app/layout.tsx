import type { Metadata, Viewport } from 'next'
import './styles/globals.css'

export const metadata: Metadata = {
  title: 'PromptLib - AI Prompt Library',
  description: 'A collection of useful AI prompts for various purposes',
  keywords: ['AI', 'Prompts', 'ChatGPT', 'Machine Learning'],
  authors: [{ name: 'PromptLib Team' }],
}

// 分离视口配置
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  )
}
