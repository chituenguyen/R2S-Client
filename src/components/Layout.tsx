import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        {children}
      </div>
    </div>
  )
} 