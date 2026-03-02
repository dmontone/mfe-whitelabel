import { PaymentsApp } from '../App'

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <PaymentsApp tenant="default" />
    </main>
  )
}
