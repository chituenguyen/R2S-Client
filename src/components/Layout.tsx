import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-violet-500 to-purple-600">
      <div className="container mx-auto px-4">
        {children}
      </div>
    </div>
  )
} 