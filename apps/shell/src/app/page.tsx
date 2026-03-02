import { Button } from '@mfe/design-system'

export default function Home() {
  return (
    <main
      style={{
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        color: 'var(--color-primary)',
      }}
    >
      <h1 style={{ color: 'var(--color-primary)' }}>Shell - MFE Whitelabel</h1>
      <p>Página renderizada via SSR (Server-Side Rendering)</p>
      <p>Timestamp: {new Date().toISOString()}</p>
      
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variant="primary">Botão Primário</Button>
        <Button variant="secondary">Botão Secundário</Button>
      </div>
      
      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          border: `2px solid var(--color-primary)`,
          borderRadius: '8px',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
        }}
      >
        <p>Elemento estilizado com CSS Variable do tenant</p>
      </div>
    </main>
  )
}
