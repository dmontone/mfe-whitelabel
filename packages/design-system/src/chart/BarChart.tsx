import React from 'react'
import { BarChartProps } from './types'
import { LoadingState } from './LoadingState'
import { ErrorState } from './ErrorState'
import { EmptyState } from './EmptyState'
import { BarChartInternal } from './BarChartInternal'

const defaultConfig = {
  width: 400,
  height: 300,
  showGrid: true,
  showLabels: true,
  animationDuration: 300
}

export const BarChart: React.FC<BarChartProps> = ({ 
  state, 
  config = {}, 
  className,
  style 
}) => {
  const finalConfig = { ...defaultConfig, ...config }

  const renderContent = () => {
    switch (state.status) {
      case 'loading':
        return <LoadingState config={finalConfig} />
      case 'error':
        return <ErrorState error={state.error} config={finalConfig} />
      case 'empty':
        return <EmptyState config={finalConfig} />
      case 'success':
        return <BarChartInternal data={state.data} config={finalConfig} />
      default:
        return null
    }
  }

  return (
    <div className={className} style={style}>
      {renderContent()}
    </div>
  )
}
