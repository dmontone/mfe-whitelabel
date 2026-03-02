'use client'

import { BarChart, ChartState } from '@mfe/design-system'
import { useState, useEffect } from 'react'

// Mock data para demonstração
const mockData = [
  { label: 'Jan', value: 65, color: '#007bff' },
  { label: 'Fev', value: 85, color: '#28a745' },
  { label: 'Mar', value: 45, color: '#ffc107' },
  { label: 'Abr', value: 95, color: '#dc3545' },
  { label: 'Mai', value: 75, color: '#6f42c1' }
]

export function ChartDemo() {
  const [chartState, setChartState] = useState<ChartState>({ status: 'loading' })
  const [currentStateIndex, setCurrentStateIndex] = useState(0)

  const states: ChartState[] = [
    { status: 'loading' },
    { status: 'error', error: 'Falha ao conectar com o servidor' },
    { status: 'empty' },
    { status: 'success', data: mockData }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStateIndex((prev) => (prev + 1) % states.length)
      setChartState(states[currentStateIndex])
    }, 3000)

    return () => clearInterval(interval)
  }, [currentStateIndex])

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Demonstração do Componente Chart</h2>
      <p>Estado atual: <strong>{chartState.status}</strong></p>
      
      <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #e9ecef', borderRadius: '8px' }}>
        <BarChart 
          state={chartState}
          config={{
            width: 500,
            height: 300,
            showGrid: true,
            showLabels: true,
            animationDuration: 500
          }}
        />
      </div>

      <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6c757d' }}>
        O ciclo automático demonstra todos os estados: Loading → Error → Empty → Success
      </div>
    </div>
  )
}
