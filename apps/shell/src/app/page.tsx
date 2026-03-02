export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Shell - MFE Whitelabel</h1>
      <p>Página renderizada via SSR (Server-Side Rendering)</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </main>
  )
}
