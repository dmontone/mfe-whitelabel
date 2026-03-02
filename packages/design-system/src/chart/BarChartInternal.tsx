import React from 'react'
import { BarChartInternalProps } from './types'

export const BarChartInternal: React.FC<BarChartInternalProps> = ({
  data,
  config,
}) => {
  const maxValue = Math.max(...data.map((item) => item.value))
  const barWidth = (config.width - 60) / data.length - 10
  const chartHeight = config.height - 80

  return (
    <div style={{ width: config.width, height: config.height }}>
      <svg
        width={config.width}
        height={config.height}
        style={{ border: '1px solid #e9ecef', backgroundColor: '#ffffff' }}
      >
        {config.showGrid && (
          <g>
            {[0, 25, 50, 75, 100].map((pct) => {
              const y = chartHeight - (chartHeight * pct) / 100 + 40
              return (
                <g key={pct}>
                  <line
                    x1='40'
                    y1={y}
                    x2={config.width - 20}
                    y2={y}
                    stroke='#e9ecef'
                    strokeWidth='1'
                  />
                  <text
                    x='35'
                    y={y + 4}
                    textAnchor='end'
                    fontSize='12'
                    fill='#6c757d'
                  >
                    {Math.round((maxValue * pct) / 100)}
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
              />
              {config.showLabels && (
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 55}
                  textAnchor='middle'
                  fontSize='12'
                  fill='#495057'
                >
                  {item.label}
                </text>
              )}
              {config.showLabels && barHeight > 20 && (
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor='middle'
                  fontSize='11'
                  fill='#495057'
                  fontWeight='600'
                >
                  {item.value}
                </text>
              )}
            </g>
          )
        })}

        {/* Axes */}
        <line
          x1='40'
          y1={chartHeight + 40}
          x2={config.width - 20}
          y2={chartHeight + 40}
          stroke='#495057'
          strokeWidth='2'
        />
        <line
          x1='40'
          y1='40'
          x2='40'
          y2={chartHeight + 40}
          stroke='#495057'
          strokeWidth='2'
        />
      </svg>
    </div>
  )
}
