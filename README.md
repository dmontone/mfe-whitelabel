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

## 🏛️ FASE 4 — Governança do Design System

### Objetivo

Demonstrar maturidade arquitetural através de governança clara do Design System, garantindo evolução controlada e sem quebras.

### Versionamento Semântico Documentado

O Design System segue controle de versões rigoroso baseado em SemVer:

#### **MAJOR (X.0.0) → Quebra de Contrato**
- **Remoção de tokens**: Tokens existentes são removidos
- **Mudança de nome**: Tokens renomeados sem backward compatibility
- **Mudança de tipo**: Alteração fundamental de estrutura
- **Exemplo**: `color.primary` removido ou renomeado

#### **MINOR (0.X.0) → Novos Tokens**
- **Adição de tokens**: Novos tokens sem afetar existentes
- **Novas categorias**: Expansão do sistema de design
- **Exemplo**: Adicionar `spacing.xs`, `border.radius.sm`

#### **PATCH (0.0.X) → Fixes Internos**
- **Correção de valores**: Ajustes sem quebrar API
- **Documentação**: Melhorias descritivas
- **Performance**: Otimizações internas
- **Exemplo**: Corrigir valor de `color.primary` para melhor contraste

### Estratégia de Deprecação

Nunca removemos tokens abruptamente. Processo controlado:

#### **Fase 1: Marcar como Deprecated**
```json
{
  "color": {
    "primary": "var(--color-primary)",
    "primaryOld": {
      "value": "#0066cc",
      "deprecated": true,
      "deprecationMessage": "Use 'color.primary' instead. Will be removed in v2.0.0",
      "removalVersion": "2.0.0"
    }
  }
}
```

#### **Fase 2: Comunicação Ativa**
- **Changelog**: Documentar mudanças em CHANGELOG.md
- **PR Description**: Alertar sobre deprecação em PRs
- **Slack/Teams**: Comunicar times afetados
- **Documentação**: Guia de migração claro

#### **Fase 3: Período de Transição**
- **Duração**: Mínimo 2 meses para deprecação
- **Suporte**: Ajuda ativa aos times para migração
- **Monitoramento**: Verificar uso de tokens deprecated

#### **Fase 4: Remoção Controlada**
- **Apenas na próxima MAJOR**: Tokens removidos só em versões major
- **Testes automatizados**: Verificar ausência de uso
- **Rollback plan**: Estratégia caso algo quebre

### Exemplo Prático de Evolução

#### **v1.2.0 → v1.3.0 (MINOR)**
```json
// Novo token adicionado
{
  "color": {
    "primary": "var(--color-primary)",
    "secondary": "var(--color-secondary)" // NOVO
  }
}
```

#### **v1.3.0 → v1.3.1 (PATCH)**
```json
// Correção de valor
{
  "spacing": {
    "md": "var(--spacing-md, 1.2rem)" // Corrigido de 1rem
  }
}
```

#### **v1.3.1 → v2.0.0 (MAJOR)**
```json
// Token removido (após deprecação)
{
  "color": {
    "primary": "var(--color-primary)"
    // "primaryOld" removido após deprecação
  }
}
```

### Processo de Mudança

#### **1. Proposta**
- Issue descrevendo mudança necessária
- Impact analysis: quais componentes afetados
- Risk assessment: nível de risco da mudança

#### **2. Decisão**
- Comitê de Design System aprova mudança
- Definição da versão (MAJOR/MINOR/PATCH)
- Timeline de implementação

#### **3. Implementação**
- Desenvolvimento seguindo estratégia definida
- Testes automatizados para garantir compatibilidade
- Documentação atualizada

#### **4. Comunicação**
- Release notes detalhadas
- Guia de migração se necessário
- Workshops com times afetados

### Benefícios da Governança

#### **Para Times Consumidores**
- **Previsibilidade**: Mudanças controladas e documentadas
- **Segurança**: Tempo adequado para migração
- **Clareza**: Comunicados claros sobre impactos

#### **Para Time do Design System**
- **Evolução controlada**: Mudanças sem quebras abruptas
- **Rastreabilidade**: Histórico claro de decisões
- **Alinhamento**: Processo padronizado de decisões

#### **Para o Produto**
- **Consistência**: Evolução mantendo coerência visual
- **Qualidade**: Processos que garantem excelência
- **Escalabilidade**: Sistema que cresce de forma sustentável

### Ferramentas de Governança

#### **Versionamento**
- **Semantic Release**: Automatização de versões
- **Conventional Commits**: Padronização de mensagens
- **Changelog**: Geração automática de histórico

#### **Monitoramento**
- **Bundle Analysis**: Verificar uso de tokens
- **Deprecation Warnings**: Alertas em development
- **Usage Analytics**: Estatísticas de adoção

#### **Documentação**
- **Storybook**: Catálogo vivo de componentes
- **Design Tokens**: Documentação de tokens
- **Migration Guides**: Guias passo a passo

### O Que Existe ao Final

1. **Maturidade Arquitetural**: Processos bem definidos de governança
2. **Evolução Controlada**: Sistema que evolui sem caos
3. **Confiança**: Times sabem como e quando o sistema muda
4. **Sustentabilidade**: Design System que escala com o produto

## 📍 FASE 3 — Estrutura de Microfrontend Plugável

### Objetivo

Permitir que outro time entregue uma feature independente através de microfrontends plugáveis, sem Module Federation.

### Estrutura de Apps

```
apps/
├── shell/           # Aplicação principal (host/orquestrador)
└── payments-mf/     # Microfrontend de pagamentos (independente)
```

### Microfrontend payments-mf

App React simples e independente desenvolvido por outro time:

- **Isolamento**: Pasta própria com package.json independente
- **Contrato**: Exporta `<PaymentsApp />` com interface definida
- **Auto-suficiente**: Contém sua própria lógica e UI

#### Contrato Mínimo

O microfrontend define um contrato claro de comunicação:

```typescript
// payments-mf/src/App.tsx
export interface PaymentsProps {
  tenant: string  // Dado explícito do Shell
}

export function PaymentsApp({ tenant }: PaymentsProps) {
  // Implementação independente do time de pagamentos
}
```

**Benefícios do contrato explícito:**
- **Acoplamento mínimo**: Shell passa apenas dados necessários
- **Independência**: MF pode evoluir sem afetar Shell
- **Testabilidade**: Interface clara facilita testes

### Importação Dinâmica no Shell

O Shell importa o microfrontend dinamicamente para carregamento sob demanda:

```typescript
// apps/shell/src/app/page.tsx
const PaymentsApp = dynamic(
  () => import('payments-mf').then(mod => ({ default: mod.PaymentsApp })),
  { ssr: false }  // Client-side only
)

export default function Home() {
  const tenant = 'tenant-a'
  
  return (
    <div>
      {/* Conteúdo do Shell */}
      <PaymentsApp tenant={tenant} />
    </div>
  )
}
```

**Vantagens do dynamic import:**
- **Lazy loading**: Carrega apenas quando necessário
- **Isolamento**: Erros no MF não afetam o Shell
- **Performance**: Reduz bundle inicial do Shell

### Isolamento por Times

Cada time tem autonomia completa sobre seu microfrontend:

#### Time de Shell (Orquestração)
- **Responsabilidade**: Layout, routing, estado global
- **Controle**: Define tenants e gerencia microfrontends
- **Evolução**: Pode adicionar/remover MFs sem afetá-los

#### Time de Pagamentos (Feature)
- **Responsabilidade**: Lógica de pagamentos, UI específica
- **Autonomia**: Desenvolvimento, testes e deploy independentes
- **Evolução**: Pode atualizar seu MF sem afetar outros

### Publicação de Versões

Times publicam versões dos seus microfrontends:

```json
// payments-mf/package.json
{
  "name": "payments-mf",
  "version": "2.1.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}
```

**Fluxo de publicação:**
1. **Desenvolvimento**: Time desenvolve em seu workspace
2. **Testes**: Validação isolada do microfrontend
3. **Versão**: Incremento versionamento SemVer
4. **Publicação**: Disponibilização para outros times
5. **Consumo**: Shell atualiza dependência quando desejar

### Contratos Evitam Acoplamento

O contrato explícito é a chave para o desacoplamento:

#### Sem Contrato (Problema)
```typescript
// Shell precisa conhecer estrutura interna do MF
<PaymentsMF 
  user={user}
  config={config}
  onPayment={handlePayment}
  theme={theme}
  // ... muitas dependências implícitas
/>
```

#### Com Contrato (Solução)
```typescript
// Shell passa apenas o necessário
<PaymentsApp tenant={tenant} />
```

**Benefícios:**
- **Manutenibilidade**: Mudanças internas não afetam consumidores
- **Flexibilidade**: MF pode refatorar internamente
- **Clareza**: Interface explícita documenta dependências

### Trade-offs de Não Usar Module Federation

#### Vantagens desta Abordagem
- **Simplicidade**: Sem configuração complexa de Module Federation
- **Controle**: Shell controla quando carregar cada MF
- **Isolamento**: Build e runtime completamente separados
- **Debugging**: Mais fácil identificar problemas por app

#### Desvantagens
- **Bundle Size**: Cada MF tem seu próprio bundle (React, etc.)
- **Carregamento**: Múltiplos network requests para carregar MFs
- **Versionamento**: Requer sincronia manual de versões
- **Shared Dependencies**: Potencial duplicação de código

#### Quando Escolher Esta Abordagem
- **Times independentes**: Cada time tem autonomia completa
- **Features isoladas**: MFs não compartilham muito estado
- **Simplicidade > Performance**: Prioridade em facilidade de manutenção
- **Controle de versão**: Necessidade de versionamento explícito

### O Que Existe ao Final

1. **Payments rodando dentro do Shell**: MF integrado via import dinâmico
2. **Isolamento por pasta**: Cada time em sua pasta com package.json
3. **Contrato claro**: Interface PaymentsProps definida explicitamente
4. **Independência**: Times podem desenvolver sem interferência

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
