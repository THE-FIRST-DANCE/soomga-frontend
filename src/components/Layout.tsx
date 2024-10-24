import { ReactNode } from 'react'
import Footer from './common/Footer'
import Header from './common/Header'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* 1. Header */}
      <Header />

      {/* 2. 페이지에 따른 내용등 */}
      <main style={{ flex: 1 }}>{children}</main>

      {/* 3. Footer */}
      <Footer />
    </div>
  )
}

export default Layout
