import { ReactNode } from 'react'
import Header from '../Header/Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <Header/>
        <div className="grow">{children}</div>
        <Footer/>
      </div>
    </div>
  )
} 