'use client'

import { getTenantTheme } from '@/lib/tenant'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  tenant: string
}

const navigationItems = [
  {
    id: 'payments',
    label: 'Pagamentos',
    icon: '💳',
    path: '/',
    active: true
  }
]

export function Sidebar({ isOpen, onToggle, tenant }: SidebarProps) {
  const theme = getTenantTheme(tenant)

  return (
    <div style={{
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100vh',
      width: isOpen ? '250px' : '0',
      backgroundColor: '#1e293b',
      color: 'white',
      transition: 'width 0.3s ease',
      zIndex: 1000,
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid #334155',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: theme.primaryColor,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1.25rem'
          }}>
            {tenant.toUpperCase()}
          </div>
          {isOpen && (
            <div>
              <h3 style={{
                margin: 0,
                fontSize: '1.125rem',
                fontWeight: '600'
              }}>
                Whitelabel
              </h3>
              <p style={{
                margin: 0,
                fontSize: '0.875rem',
                color: '#94a3b8'
              }}>
                Tenant {tenant.toUpperCase()}
              </p>
            </div>
          )}
        </div>
        
        <button
          onClick={onToggle}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.25rem',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '4px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#334155'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          {isOpen ? '◀' : '▶'}
        </button>
      </div>

      <nav style={{
        padding: '1rem 0'
      }}>
        {navigationItems.map((item) => (
          <button
            key={item.id}
            style={{
              width: '100%',
              padding: '0.875rem 1.5rem',
              border: 'none',
              backgroundColor: item.active ? theme.primaryColor : 'transparent',
              color: 'white',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.95rem',
              transition: 'background-color 0.2s',
              borderLeft: item.active ? `4px solid ${theme.primaryColor}` : '4px solid transparent'
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
            {isOpen && (
              <span style={{ fontWeight: item.active ? '600' : '400' }}>
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}
