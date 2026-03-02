export interface TenantTheme {
  primaryColor: string
  logoPath: string
}

const tenantThemes: Record<string, TenantTheme> = {
  a: {
    primaryColor: '#0066cc', // Azul para Cliente A
    logoPath: '/logos/client-a.svg',
  },
  b: {
    primaryColor: '#00aa44', // Verde para Cliente B
    logoPath: '/logos/client-b.svg',
  },
}

export function getTenantTheme(tenantId?: string): TenantTheme {
  if (!tenantId || !tenantThemes[tenantId]) {
    return tenantThemes.a // Default para Cliente A
  }
  return tenantThemes[tenantId]
}

export function getTenantFromRequest(request: Request | URL): string {
  const url = request instanceof URL ? request : new URL(request.url)
  return url.searchParams.get('tenant') || 'a'
}
