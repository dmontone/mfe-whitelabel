# MFE Whitelabel

Monorepo com arquitetura de Micro Frontends (MFE) para soluções whitelabel.

## Visão Arquitetural

### Estrutura do Monorepo

```
/
├── apps/
│   └── shell/          # Aplicação principal (host)
├── packages/           # Pacotes compartilhados (futuro)
└── pnpm-workspace.yaml # Configuração do workspace
```

### Shell (apps/shell)

Aplicação Next.js que serve como container/orquestrador dos micro frontends.

- **Framework**: Next.js 14 com App Router
- **Renderização**: Server-Side Rendering (SSR)
- **Porta**: 3001 (desenvolvimento)

### Tecnologias

- **Gerenciador de pacotes**: pnpm com workspaces
- **Runtime**: Node.js
- **Framework**: Next.js 14
- **Linguagem**: TypeScript

## 🎨 FASE 1 — White Label via SSR

### Objetivo

Provar que o SSR controla identidade visual antes do hydration, garantindo zero flicker na troca de temas.

### Estratégia SSR-first

A implementação utiliza **Server-Side Rendering (SSR)** para injetar as CSS Variables diretamente no HTML antes de enviar ao cliente. Isso garante:

- **Zero flicker**: O tema já está aplicado quando o cliente recebe o HTML
- **Performance**: Não há re-renderização client-side para aplicar o tema
- **SEO**: O HTML já contém o tema correto para indexação

### Uso de CSS Variables

O sistema utiliza CSS Custom Properties para permitir troca dinâmica de temas:

```css
:root {
  --color-primary: #0066cc; /* Injetado via SSR */
  --logo-path: '/logos/client-a.svg'; /* Injetado via SSR */
  --spacing-md: 1rem; /* Injetado via SSR */
  --radius-md: 8px; /* Injetado via SSR */
}
```

### Simulador de Tenant

Use query parameters ou cookies para alternar entre tenants:

```bash
# Via query param (define cookie automaticamente)
http://localhost:3002/?tenant=a
http://localhost:3002/?tenant=b

# Via cookie direto (apenas servidor - httpOnly)
# Não é possível acessar via JavaScript por segurança
```

**Prioridade de resolução**: Cookie > Query Param > Default 'a'

### Configuração de Temas

Os temas são configurados em `apps/shell/lib/tenant.ts`:

```typescript
const tenantThemes = {
  a: {
    primaryColor: '#0066cc', // Azul para Cliente A
    logoPath: '/logos/client-a.svg'
  },
  b: {
    primaryColor: '#00aa44', // Verde para Cliente B
    logoPath: '/logos/client-b.svg'
  }
}
```

### Fluxo de Resolução

1. **Middleware** (`middleware.ts`): Extrai tenant (Cookie > Query > Default) e seta cookie se necessário
2. **Layout SSR** (`layout.tsx`): Lê tenant e injeta CSS Variables
3. **Componentes**: Usam `var(--color-primary)` automaticamente

## 🧩 FASE 2 — Introdução do Design System

### Objetivo

Isolar visual em um pacote compartilhado mínimo, permitindo reuso entre MFEs.

### Estrutura do Design System

```
packages/design-system/
├── tokens.json       # Tokens de design (contrato visual)
├── src/
│   ├── button.tsx    # Componente Button
│   └── index.ts      # Exportações
├── package.json      # Configuração do pacote
└── tsconfig.json     # Configuração TypeScript
```

### Tokens como Contrato Visual

Os tokens em `tokens.json` definem o contrato visual do sistema:

```json
{
  "color": {
    "primary": "var(--color-primary)"
  },
  "spacing": {
    "md": "var(--spacing-md, 1rem)"
  },
  "radius": {
    "md": "var(--radius-md, 8px)"
  }
}
```

**Benefícios dos tokens:**
- **Consistência**: Valores padronizados em todos os componentes
- **Manutenibilidade**: Mudança centralizada afeta todos os componentes
- **White Label**: CSS Variables permitem tema sem rebuild

### Componente Button

O componente Button consome CSS Variables diretamente, sem dependências externas:

```typescript
// Sem Tailwind, sem styled-components, sem libs extras
const variantStyles = {
  primary: {
    backgroundColor: 'var(--color-primary)',
    color: 'white',
  },
  secondary: {
    backgroundColor: 'transparent',
    color: 'var(--color-primary)',
    border: '2px solid var(--color-primary)',
  }
}
```

### Consumo no Shell

O Shell importa e usa componentes do Design System:

```typescript
import { Button } from '@mfe/design-system'

<Button variant="primary">Botão Primário</Button>
<Button variant="secondary">Botão Secundário</Button>
```

### CSS Variables para White Label

As CSS Variables permitem White Label sem rebuild:

- **Runtime**: Temas mudam via CSS Variables injetadas no SSR
- **Zero rebuild**: Design System compilado uma vez, temas mudam em runtime
- **Isolamento**: Componentes não dependem de temas específicos

### Versionamento SemVer

O Design System seguirá versionamento SemVer:
- **MAJOR**: Mudanças quebram compatibilidade
- **MINOR**: Novas features (backwards compatible)
- **PATCH**: Bug fixes (backwards compatible)

## Comandos

### Desenvolvimento
```bash
# Instalar dependências
pnpm install

# Iniciar aplicação shell em modo desenvolvimento
pnpm dev
```

### Build
```bash
# Build da aplicação shell
pnpm build

# Iniciar produção
pnpm start
```
