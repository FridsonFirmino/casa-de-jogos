# Contribuindo para o Casa de Jogos

Obrigado pelo interesse em contribuir! 🎮

O Casa de Jogos é um projeto open source que reúne jogos simples e nostálgicos que rodam direto no navegador. Qualquer pessoa pode contribuir — seja com um novo jogo, uma correção de bug, uma melhoria de UI/UX ou uma atualização de documentação.

Este guia explica como começar e quais padrões o projeto segue. Em caso de dúvida, abra uma Issue ou pergunte nos comentários de um Pull Request.

## Antes de começar

- **Leia o [README.md](README.md)** — ele explica a arquitetura e o fluxo do projeto.
- **Verifique as Issues existentes** — o problema ou funcionalidade que você quer resolver já pode ter sido reportado.
- **Verifique os Pull Requests existentes** — alguém pode já estar trabalhando em algo parecido.
- **Converse antes de mudanças grandes** — para novas funcionalidades ou refatorações extensas, abra uma Issue para discutir antes de escrever código.

## Desenvolvimento local

### Pré-requisitos

- [Node.js](https://nodejs.org) >= 20
- [pnpm](https://pnpm.io/installation) >= 9

### Clonando o repositório

```bash
git clone https://github.com/FridsonFirmino/casa-de-jogos.git
cd games-hub
```

> Se você vai contribuir via fork, use a URL do seu fork no clone e adicione o repositório original como `upstream`:
>
> ```bash
> git remote add upstream https://github.com/FridsonFirmino/casa-de-jogos.git
> ```

### Instalando dependências

O projeto usa **pnpm**. Não use `npm` ou `yarn`.

```bash
pnpm install
```

### Iniciando o ambiente de desenvolvimento

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador. A página recarrega automaticamente conforme você edita o código.

### Verificações

Antes de abrir um Pull Request, execute localmente as mesmas verificações do CI:

```bash
pnpm lint
npx tsc --noEmit
pnpm build
```

- `pnpm lint` — verifica o código com o ESLint.
- `npx tsc --noEmit` — verifica os tipos TypeScript.
- `pnpm build` — gera o build de produção (o mais completo, pois executa lint e typecheck do Next.js).

> O projeto ainda não possui testes automatizados. Quando testes forem adicionados, eles farão parte das verificações obrigatórias.

## Criando uma branch

A branch `main` (produção) e a branch `develop` (integração) não devem ser usadas diretamente para desenvolvimento. Crie sempre uma branch a partir de `develop`:

```bash
git checkout develop
git checkout -b feature/nome-da-feature
```

Sugestões de nome:

```text
feature/nome-da-feature     # nova funcionalidade ou novo jogo
fix/nome-do-bug             # correção de bug
docs/nome-da-documentacao   # documentação
refactor/nome-da-refatoracao # refatoração
```

## Adicionando um novo jogo

Adicionar um jogo novo é um processo bem definido. Cada jogo é um **módulo autocontido** em `src/features/games/all/<nome-do-jogo>/`, e não depende de nenhum outro jogo.

### Estrutura de um jogo

```
src/features/games/all/<nome-do-jogo>/
├── assets/          # Imagens e sons específicos do jogo
├── components/      # Componentes específicos do jogo
├── constants/       # Constantes específicas do jogo
├── engine/          # Lógica/motor do jogo
├── hooks/           # Hooks específicos do jogo
├── utils/           # Utilitários específicos do jogo
├── Game.tsx         # Componente principal (exportação padrão)
├── config.ts        # Metadados do jogo
└── index.ts         # API pública (re-exporta config e componente)
```

### Passo a passo

#### 1. Copie o template

Use o template como ponto de partida:

```bash
cp -r src/game-template src/features/games/all/meu-jogo
```

#### 2. Configure os metadados em `config.ts`

Edite `src/features/games/all/meu-jogo/config.ts` seguindo o tipo `GameConfig`:

```ts
import type { GameConfig } from "@/types/game";

export const config: GameConfig = {
  id: "meu-jogo",
  slug: "meu-jogo",
  title: "Meu Jogo",
  description: "Descrição do novo jogo.",
  shortDescription: "Um jogo novo divertido.",
  thumbnail: "https://picsum.photos/seed/meu-jogo/400/300",
  cover: "https://picsum.photos/seed/meu-jogo-cover/800/600",
  categoryId: "arcade",
  category: "Arcade",
  difficulty: "Medium",
  players: "1",
  averagePlayTime: "10 min",
  averagePlayTimeMinutes: 10,
  tags: ["Arcade"],
  featured: false,
  popular: false,
  isNew: true,
  status: "draft",
  version: "1.0.0",
  rating: 0,
  gradient: "from-indigo-500 to-violet-600",
  releaseDate: new Date().toISOString().split("T")[0],
  githubUsername: "seu-usuario-github",
};
```

> **`githubUsername` é obrigatório** — identifica o contribuidor responsável pelo jogo e é exibido na página de detalhes e na página de contribuidores.

> **Assets:** para usar imagens locais, coloque-as em `assets/` e importe como `import img from "./assets/img.png"`. As categorias são geradas automaticamente a partir do `categoryId` no registro — não é preciso atualizar nada manualmente.

#### 3. Implemente o jogo em `Game.tsx`

Construa a lógica e a interface. Use o `Game.tsx` do template como referência. Não esqueça do `"use client"` no topo, já que jogos usam estado, eventos e muitas vezes canvas.

#### 4. Registre o jogo em `src/registry/games.ts`

Adicione o import e a entrada na lista:

```ts
import { config as meuJogo } from "@/features/games/all/meu-jogo/config";

const gamesList: GameRegistryEntry[] = [
  // ... jogos existentes
  { config: meuJogo },
];
```

#### 5. Registre o componente no renderizador

O carregamento do jogo é feito via import dinâmico em `src/components/games/GameRenderer.tsx`. Adicione a linha correspondente:

```ts
const gameComponents: Record<string, ComponentType> = {
  snake: dynamic(() => import("@/features/games/all/snake/Game"), {
    ssr: false,
  }),
  pacman: dynamic(() => import("@/features/games/all/pacman/Game"), {
    ssr: false,
  }),
  "meu-jogo": dynamic(() => import("@/features/games/all/meu-jogo/Game"), {
    ssr: false,
  }),
};
```

#### Pronto

O jogo passa a aparecer automaticamente na grade do catálogo (com busca, filtro e ordenação), nas contagens de categorias e na sua própria página em `/games/meu-jogo`.

### Regras para novos jogos

- **Funciona no navegador** — sem servidores, backends ou instalações adicionais.
- **Responsivo** — deve funcionar bem em desktop e dispositivos móveis (mobile-first).
- **Controles claros** — o jogador deve entender como jogar rapidamente.
- **Estados de vitória/derrota** — quando aplicável, o jogo deve indicar fim de partida, pontuação ou progresso.
- **Instruções mínimas** — informe o objetivo do jogo na interface.
- **Sem dependências desnecessárias** — use React, TypeScript e Tailwind; evite adicionar bibliotecas novas sem discutir antes.
- **Sem conteúdo inadequado** — o projeto é de uso geral e familiar.
- **Sem coleta de dados** — não colete dados pessoais sem necessidade.
- **Siga as convenções do projeto** — imports `@/`, Tailwind apenas, `"use client"` apenas quando necessário, sem `any`.
- **Reutilize componentes** — use os primitivos existentes em `src/components/ui/` quando fizer sentido.

## Pull Requests

O fluxo de colaboração é:

```text
Fork
↓
Clone
↓
Branch
↓
Desenvolvimento
↓
Testes
↓
Pull Request
↓
CI
↓
Code Review
↓
Merge
```

### Diretrizes

- **Descrição clara** — use o template de PR e explique o que mudou e por quê.
- **Foco** — cada PR deve resolver uma única alteração. PRs grandes devem ser discutidos antes.
- **CI verde** — o CI precisa passar (lint, typecheck e build). Ele roda automaticamente para PRs.
- **Responda aos reviewers** — discuta e ajuste o que for solicitado.
- **Nada de merges na `main` direto** — contribuições entram via PR.

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/) para mensagens claras e padronizadas:

```text
feat: add chess game
fix: fix snake collision
docs: update contributing guide
refactor: simplify game engine
style: improve game card layout
test: add game logic tests
```

## Boas práticas

- **Componentização** — um componente = uma responsabilidade. Componentes reutilizáveis vão para `src/components/ui/` ou `src/components/shared/`.
- **Reutilização** — nunca duplique código. Se for usado duas vezes, extraia.
- **TypeScript** — nunca use `any`; crie interfaces e tipos específicos.
- **Server Components** — prefira Server Components por padrão; adicione `"use client"` apenas ao usar `useState`, `useEffect`, eventos, animações, canvas ou APIs do navegador.
- **Acessibilidade** — HTML semântico, labels em inputs, `alt` em imagens, navegação por teclado.
- **Responsividade** — design mobile-first, testado em várias larguras de tela.
- **Performance** — lazy load quando fizer sentido, imports dinâmicos para componentes pesados, evite re-renders desnecessários.
- **Código simples** — funções pequenas, nomes claros, sem comentários desnecessários (o código deve se explicar).
- **Evite dependências** — antes de adicionar uma biblioteca, pergunte se ela é realmente necessária. Estado local + Context API são suficientes hoje.

## Dúvidas?

Abra uma Issue com a tag `question` ou comente no Pull Request. A comunidade vai ajudar. 🚀
