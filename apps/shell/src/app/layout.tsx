import { headers } from 'next/headers'
import { getTenantTheme } from '@/lib/tenant'
import { Layout } from '@/components/Layout'

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
            }
            
            * {
              box-sizing: border-box;
            }
            
            body {
              margin: 0;
              padding: 0;
              font-family: system-ui, -apple-system, sans-serif;
            }
          `,
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Layout tenant={tenantId}>
          {children}
        </Layout>
      </body>
    </html>
  )
}

export default RootLayout
