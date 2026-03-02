'use client'

import { useState, ReactNode } from 'react'
import { Sidebar } from './Sidebar'

interface LayoutProps {
  children: ReactNode
  tenant?: string
}

export function Layout({ children, tenant = 'a' }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8fafc'
    }}>
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        tenant={tenant}
      />
      
      <div style={{
        flex: 1,
        marginLeft: sidebarOpen ? '250px' : '0',
        transition: 'margin-left 0.3s ease'
      }}>
        <main style={{
          padding: '2rem'
        }}>
          {children}
        </main>
      </div>
    </div>
  )
}
