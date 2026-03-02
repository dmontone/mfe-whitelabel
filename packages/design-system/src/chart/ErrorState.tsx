import React from 'react'
import { BarChartProps } from './types'

export const ErrorState: React.FC<{ error: string; config: Required<BarChartProps['config']> }> = ({ error, config }) => (
  <div 
    style={{
      width: config?.width || 400,
      height: config?.height || 300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff5f5',
      border: '1px solid #fed7d7',
      color: '#c53030',
      padding: '1rem'
    }}
  >
    Erro: {error}
  </div>
)
