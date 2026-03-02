export interface ChartData {
  label: string
  value: number
  color?: string
}

export interface ChartConfig {
  width?: number
  height?: number
  showGrid?: boolean
  showLabels?: boolean
  animationDuration?: number
}

export type ChartState = 
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'empty' }
  | { status: 'success'; data: ChartData[] }

export interface BarChartProps {
  state: ChartState
  config?: ChartConfig
  className?: string
  style?: React.CSSProperties
}

export interface BarChartInternalProps {
  data: ChartData[]
  config: Required<ChartConfig>
}
