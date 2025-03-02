import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
      <div className="relative w-[1920px] h-[2600px] bg-white">
        {children}
      </div>
  )
} 