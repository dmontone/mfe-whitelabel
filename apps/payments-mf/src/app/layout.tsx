import { ReactNode } from 'react'

export const metadata = {
  title: 'Payments Microfrontend',
  description: 'Payments MFE powered by @dmontone/design-system',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  )
}
