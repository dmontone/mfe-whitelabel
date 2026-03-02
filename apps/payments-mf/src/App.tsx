import { Button } from '@dmontone/design-system'

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
      <h2 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>
        Payments Microfrontend
      </h2>
      <p style={{ color: '#64748b', marginBottom: '1rem' }}>
        Tenant: <strong>{tenant}</strong>
      </p>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
        Este é um microfrontend independente desenvolvido por outro time.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variant="primary">
          Processar Pagamento
        </Button>
        <Button variant="secondary">
          Ver Histórico
        </Button>
      </div>
      
      <div style={{ marginTop: '1.5rem' }}>
        <h3 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
          Funcionalidades do Payments MF:
        </h3>
        <ul style={{ color: '#64748b', paddingLeft: '1.5rem' }}>
          <li>Processamento de pagamentos</li>
          <li>Gestão de métodos de pagamento</li>
          <li>Histórico de transações</li>
          <li>Integração com gateways de pagamento</li>
        </ul>
      </div>
    </div>
  )
}

export default PaymentsApp
