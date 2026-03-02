import React from 'react'
import { BarChartProps } from './types'

export const LoadingState: React.FC<{ config: Required<BarChartProps['config']> }> = ({ config }) => (
  <div 
    style={{
      width: config?.width || 400,
      height: config?.height || 300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      border: '1px solid #e9ecef'
    }}
  >
    Carregando...
  </div>
)
