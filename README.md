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
- **Porta**: 3000 (padrão Next.js)

### Tecnologias

- **Gerenciador de pacotes**: pnpm com workspaces
- **Runtime**: Node.js
- **Framework**: Next.js 14
- **Linguagem**: TypeScript

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

## Próximos Passos

1. Adicionar configuração de Module Federation
2. Implementar micro frontends remotos
3. Configurar roteamento entre MFEs
4. Adicionar pacotes compartilhados em `packages/`
