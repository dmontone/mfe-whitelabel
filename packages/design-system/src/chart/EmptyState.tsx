import React from 'react'
import { BarChartProps } from './types'

export const EmptyState: React.FC<{ config: Required<BarChartProps['config']> }> = ({ config }) => (
  <div 
    style={{
      width: config?.width || 400,
      height: config?.height || 300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      border: '1px solid #e9ecef',
      color: '#6c757d'
    }}
  >
    Sem dados
  </div>
)
