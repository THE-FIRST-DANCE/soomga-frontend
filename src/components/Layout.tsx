import { ReactNode } from 'react'
import Footer from './common/Footer'
import Header from './common/Header'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      {/* 1. Header */}
      <Header />

      {/* 2. 페이지에 따른 내용등 */}
      {children}

      {/* 3. Footer */}
      <Footer />
    </div>
  )
}

export default Layout
