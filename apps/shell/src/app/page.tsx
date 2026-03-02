import { headers } from 'next/headers'
import { PaymentsApp } from 'payments-mf'

export default function Home() {
  const headersList = headers()
  const tenant = headersList.get('x-tenant') || 'a'

  return <PaymentsApp tenant={tenant} />
}
