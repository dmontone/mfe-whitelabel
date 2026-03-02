# @dmontone/design-system

Design System compartilhado para MFE Whitelabel

## Publicação

### Publicando Versões

```bash
npm pack --dry-run # Verificar o que será publicado
npm publish --tag beta # Publicar versão beta
npm publish --tag latest # Publicar versão estável
```

### Versionamento

```bash
npm version patch # Patch (1.0.0 -> 1.0.1)
npm version minor # Minor (1.0.0 -> 1.1.0)
npm version major # Major (1.0.0 -> 2.0.0)
```

### Instalação

```bash
npm install @dmontone/design-system
# ou
pnpm add @dmontone/design-system
# ou
yarn add @dmontone/design-system
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

## Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Desenvolvimento
pnpm dev

# Build
pnpm build

# Publicar versão beta
pnpm publish:beta

# Publicar versão estável
pnpm publish:latest
```

## Gerenciamento de Versões

### Tipos de Versão

- **Patch (1.0.0 → 1.0.1)**: Correções de bugs
- **Minor (1.0.0 → 1.1.0)**: Novas funcionalidades
- **Major (1.0.0 → 2.0.0)**: Mudanças que quebram compatibilidade

### Scripts Automatizados

```bash
# Publicar versões estáveis
npm run version:patch  # 1.0.0 → 1.0.1
npm run version:minor  # 1.0.0 → 1.1.0
npm run version:major  # 1.0.0 → 2.0.0

# Publicar versão beta
npm run version:beta   # 1.0.0 → 1.0.1-beta.0

# Versão customizada
npm run version:custom 1.2.3 latest
npm run version:custom 1.2.3-beta.0 beta
```

### Fluxo de Publicação

1. **Desenvolvimento**: Faça suas mudanças
2. **Teste**: `npm run build` e `npm pack --dry-run`
3. **Versione**: Use um dos scripts acima
4. **Publicação**: Automática no script

### Tags de Publicação

- **latest**: Versão estável (padrão)
- **beta**: Versões de teste
- **alpha**: Versões experimentais
- **next**: Próxima versão em desenvolvimento

### Instalando Versões Específicas

```bash
# Última versão estável
npm install @dmontone/design-system

# Versão específica
npm install @dmontone/design-system@1.2.3

# Versão beta
npm install @dmontone/design-system@beta

# Versão alpha
npm install @dmontone/design-system@alpha
```

### Mantendo Múltiplas Versões

Para manter versões antigas funcionando:

1. **Não remova versões publicadas**
2. **Use branches de manutenção**:
   ```bash
   git checkout -b maint/v1.x
   ```

3. **Correções em versões antigas**:
   ```bash
   # Branch maint/v1.x
   npm run version:patch  # 1.0.0 → 1.0.1
   ```

4. **Documente breaking changes** no CHANGELOG.md

### Boas Práticas

- **Sempre use versionamento semântico**
- **Teste antes de publicar**
- **Mantenha o CHANGELOG atualizado**
- **Comunique mudanças quebram compatibilidade**
- **Use tags beta para testes**

## Licença

MIT
