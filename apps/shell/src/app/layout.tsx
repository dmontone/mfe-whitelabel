import { headers } from 'next/headers'
import { getTenantTheme } from '@/lib/tenant'

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const headersList = headers()
  const tenantId = headersList.get('x-tenant') || 'a'
  const theme = getTenantTheme(tenantId)

  return (
    <html lang='pt-BR'>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            :root {
              --color-primary: ${theme.primaryColor};
              --logo-path: '${theme.logoPath}';
              --spacing-md: 1rem;
              --radius-md: 8px;
            }
          `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
