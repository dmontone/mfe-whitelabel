import React from 'react'
import { BarChartProps, BarChartInternalProps, ChartData } from './types'

const defaultConfig = {
  width: 400,
  height: 300,
  showGrid: true,
  showLabels: true,
  animationDuration: 300
}

const LoadingState: React.FC<{ config: Required<BarChartProps['config']> }> = ({ config }) => (
  <div 
    style={{
      width: config?.width || 400,
      height: config?.height || 300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e9ecef'
    }}
  >
    <div 
      style={{
        width: '40px',
        height: '40px',
        border: '4px solid #e9ecef',
        borderTop: '4px solid #007bff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)

const ErrorState: React.FC<{ error: string; config: Required<BarChartProps['config']> }> = ({ error, config }) => (
  <div 
    style={{
      width: config?.width || 400,
      height: config?.height || 300,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff5f5',
      borderRadius: '8px',
      border: '1px solid #fed7d7',
      color: '#c53030',
      padding: '1rem'
    }}
  >
    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</div>
    <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Erro ao carregar gráfico</div>
    <div style={{ fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>
  </div>
)

const EmptyState: React.FC<{ config: Required<BarChartProps['config']> }> = ({ config }) => (
  <div 
    style={{
      width: config?.width || 400,
      height: config?.height || 300,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e9ecef',
      color: '#6c757d'
    }}
  >
    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
    <div style={{ fontWeight: '600' }}>Sem dados disponíveis</div>
  </div>
)

const BarChartInternal: React.FC<BarChartInternalProps> = ({ data, config }) => {
  const maxValue = Math.max(...data.map(item => item.value))
  const barWidth = (config.width - 60) / data.length - 10
  const chartHeight = config.height - 80

  return (
    <div style={{ width: config.width, height: config.height }}>
      <svg 
        width={config.width} 
        height={config.height}
        style={{ border: '1px solid #e9ecef', borderRadius: '8px', backgroundColor: '#ffffff' }}
      >
        {/* Grid */}
        {config.showGrid && (
          <g>
            {[0, 25, 50, 75, 100].map(percentage => {
              const y = chartHeight - (chartHeight * percentage / 100) + 40
              return (
                <g key={percentage}>
                  <line
                    x1="40"
                    y1={y}
                    x2={config.width - 20}
                    y2={y}
                    stroke="#e9ecef"
                    strokeWidth="1"
                  />
                  <text
                    x="35"
                    y={y + 4}
                    textAnchor="end"
                    fontSize="12"
                    fill="#6c757d"
                  >
                    {Math.round(maxValue * percentage / 100)}
                  </text>
                </g>
              )
            })}
          </g>
        )}

        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * chartHeight
          const x = 40 + index * (barWidth + 10)
          const y = chartHeight - barHeight + 40
          const color = item.color || '#007bff'

          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={color}
                style={{
                  transition: `all ${config.animationDuration}ms ease-in-out`,
                  animation: `growBar ${config.animationDuration}ms ease-out ${index * 50}ms both`
                }}
              />
              {config.showLabels && (
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 55}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#495057"
                >
                  {item.label}
                </text>
              )}
              {config.showLabels && barHeight > 20 && (
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#495057"
                  fontWeight="600"
                >
                  {item.value}
                </text>
              )}
            </g>
          )
        })}

        {/* Axes */}
        <line
          x1="40"
          y1={chartHeight + 40}
          x2={config.width - 20}
          y2={chartHeight + 40}
          stroke="#495057"
          strokeWidth="2"
        />
        <line
          x1="40"
          y1="40"
          x2="40"
          y2={chartHeight + 40}
          stroke="#495057"
          strokeWidth="2"
        />
      </svg>

      <style>{`
        @keyframes growBar {
          from {
            transform: scaleY(0);
            transform-origin: bottom;
          }
          to {
            transform: scaleY(1);
            transform-origin: bottom;
          }
        }
      `}</style>
    </div>
  )
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
