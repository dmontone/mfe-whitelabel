import { Chart } from './components/Chart'

export interface PaymentsProps {
  tenant: string
}

export function PaymentsApp({ tenant }: PaymentsProps) {
  return (
    <div
      style={{
        padding: '2rem',
        border: '2px solid var(--color-primary)',
        borderRadius: '8px',
        backgroundColor: '#f8fafc',
        marginTop: '2rem'
      }}
    >
      <Chart />
    </div>
  )
}

export default PaymentsApp
