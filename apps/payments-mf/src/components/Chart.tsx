'use client'

import { BarChart, ChartState, Button } from '@dmontone/design-system'
import { useState } from 'react'

const mockData = [
  { label: 'Jan', value: 65, color: '#007bff' },
  { label: 'Fev', value: 85, color: '#28a745' },
  { label: 'Mar', value: 45, color: '#ffc107' },
  { label: 'Abr', value: 95, color: '#dc3545' },
  { label: 'Mai', value: 75, color: '#6f42c1' }
]

const chartStates = [
  { 
    id: 'loading', 
    label: 'Loading', 
    state: { status: 'loading' as const },
    color: '#6c757d'
  },
  { 
    id: 'error', 
    label: 'Error', 
    state: { status: 'error' as const, error: 'Falha ao conectar com o servidor' },
    color: '#dc3545'
  },
  { 
    id: 'empty', 
    label: 'Empty', 
    state: { status: 'empty' as const },
    color: '#ffc107'
  },
  { 
    id: 'success', 
    label: 'Success', 
    state: { status: 'success' as const, data: mockData },
    color: '#28a745'
  }
]

export function Chart() {
  const [chartState, setChartState] = useState<ChartState>({ status: 'loading' })

  const handleStateChange = (newState: ChartState) => {
    setChartState(newState)
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>
        Análise de Pagamentos
      </h3>
      <p style={{ color: '#64748b', marginBottom: '1rem' }}>
        Estado atual: <strong>{chartState.status}</strong>
      </p>
      
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ color: '#64748b', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
          Clique nos botões para alterar o estado do gráfico:
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {chartStates.map((chartStateOption) => (
            <Button
              key={chartStateOption.id}
              variant={chartState.status === chartStateOption.id ? 'primary' : 'secondary'}
              onClick={() => handleStateChange(chartStateOption.state)}
              style={{
                fontSize: '0.875rem',
                padding: '0.5rem 1rem',
                backgroundColor: chartState.status === chartStateOption.id ? chartStateOption.color : undefined,
                borderColor: chartStateOption.color,
                color: chartState.status === chartStateOption.id ? 'white' : chartStateOption.color
              }}
            >
              {chartStateOption.label}
            </Button>
          ))}
        </div>
      </div>
      
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
        Use os botões acima para testar diferentes estados do componente de gráfico.
      </div>
    </div>
  )
}
