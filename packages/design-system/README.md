# @dmontone/design-system

Design System compartilhado para MFE Whitelabel

## Instalação

```bash
pnpm add @dmontone/design-system
```

## Uso

```tsx
import { Button, BarChart } from '@dmontone/design-system'

function App() {
  return (
    <div>
      <Button variant="primary">Clique aqui</Button>
      <BarChart data={chartData} />
    </div>
  )
}
```

## Componentes

- **Button**: Botões com múltiplas variantes
- **BarChart**: Gráfico de barras configurável

## Tokens de Design
O sistema usa variáveis CSS para white label:

```json
{
  "color": { "primary": "var(--color-primary)" },
  "spacing": { "md": "var(--spacing-md, 1rem)" },
  "radius": { "md": "var(--radius-md, 8px)" }
}
```

## Desenvolvimento

```bash
pnpm install    # Instalar dependências
pnpm dev        # Desenvolvimento
pnpm build      # Build
```

## Versionamento

### Tipos de Versão

- **Patch (1.0.0 → 1.0.1)**: Correções de bugs
- **Minor (1.0.0 → 1.1.0)**: Novas funcionalidades
- **Major (1.0.0 → 2.0.0)**: Mudanças que quebram compatibilidade

### Publicação

```bash
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0
npm publish        # Publicar versão
```
