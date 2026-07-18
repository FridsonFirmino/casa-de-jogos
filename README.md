# Casa de Jogos

Um hub de jogos moderno e escalável construído com Next.js 16. Jogue jogos clássicos de navegador instantaneamente sem downloads, sem cadastro.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Stack Tecnológica

| Camada                 | Tecnologia                                     |
| ---------------------- | ---------------------------------------------- |
| Framework              | [Next.js 16](https://nextjs.org) (App Router)  |
| Linguagem              | [TypeScript 5](https://www.typescriptlang.org) |
| Estilização            | [Tailwind CSS 4](https://tailwindcss.com)      |
| Ícones                 | [Lucide React](https://lucide.dev)             |
| Primitivas de UI       | Componentes personalizados                     |
| Gerenciador de Pacotes | [pnpm](https://pnpm.io)                        |

---

## Arquitetura

Arquitetura baseada em funcionalidades organizada para escalabilidade. Cada jogo vive como uma funcionalidade independente, adicionar um novo jogo requer zero alterações na estrutura principal.

```
src/
├── app/                    # Páginas do Next.js App Router
├── registry/               # Registro central de jogos (fonte única da verdade)
│   ├── games.ts            #   - Catálogo de jogos (importação e exportação)
│   └── categories.ts       #   - Categorias geradas automaticamente do registro
├── game-template/          # Template para criar novos jogos
├── components/
│   ├── ui/                 # Primitivas compartilhadas (Button, Container, Badge...)
│   ├── layout/             # Navbar, Footer
│   └── shared/             # Componentes compartilhados do app
├── features/               # Módulos de funcionalidades
│   ├── home/               # Seções da página inicial
│   ├── games/              # Catálogo de jogos, filtros, cards de jogos
│   │   ├── components/     #   - Componentes de UI compartilhados de jogos
│   │   ├── hooks/          #   - Hooks relacionados a jogos
│   │   └── all/            #   - Todos os jogos individuais
│   │       ├── snake/      #   - Módulo de jogo individual
│   │       └── ...         #   - Cada jogo é autocontido
│   └── categories/         # Navegação por categorias
├── hooks/                  # Custom hooks compartilhados
├── constants/              # Constantes (rotas, navegação...)
├── types/                  # Interfaces TypeScript
├── utils/                  # Funções utilitárias
├── lib/                    # Configurações de bibliotecas
├── services/               # Serviços de API
├── assets/                 # Assets estáticos
└── styles/                 # Estilos globais
```

### Estrutura por Jogo

Cada jogo segue uma estrutura idêntica para consistência:

```
features/games/all/<nome-do-jogo>/
├── assets/          # Imagens e sons específicos do jogo
├── components/      # Componentes específicos do jogo
├── constants/       # Constantes específicas do jogo
├── engine/          # Lógica/motor do jogo
├── hooks/           # Hooks específicos do jogo
├── utils/           # Utilitários específicos do jogo
├── Game.tsx         # Componente principal do jogo (exportação padrão)
├── config.ts        # Metadados do jogo
└── index.ts         # API pública (exporta config + componente)
```

---

## Começando

### Pré-requisitos

- [Node.js](https://nodejs.org) >= 20
- [pnpm](https://pnpm.io/installation) >= 9

### Instalar

```bash
pnpm install
```

### Desenvolvimento

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

### Verificação de Tipos

```bash
npx tsc --noEmit
```

---

## Adicionar um Novo Jogo

Adicionar um novo jogo requer **zero alterações estruturais**. O aplicativo inteiro consome o registro de jogos — nenhum componente, página ou hook precisa ser editado.

### Passo a passo

#### 1. Copie o template

```bash
cp -r src/game-template src/features/games/all/meu-jogo
```

#### 2. Configure os metadados

Edite `src/features/games/all/meu-jogo/config.ts`:

```ts
export const config: GameConfig = {
  id: "meu-jogo",
  slug: "meu-jogo",
  title: "Meu Jogo",
  description: "Descrição do novo jogo.",
  shortDescription: "Um jogo novo divertido.",
  thumbnail: "https://picsum.photos/id/42/400/300",
  cover: "https://picsum.photos/id/42/800/600",
  categoryId: "arcade",
  category: "Arcade",
  difficulty: "Médio",
  players: "1",
  averagePlayTime: "10 min",
  averagePlayTimeMinutes: 10,
  tags: ["Arcade", "Novo"],
  featured: true,
  popular: true,
  isNew: true,
  status: "published",
  version: "1.0.0",
  rating: 4.5,
  gradient: "from-indigo-500 to-violet-600",
  releaseDate: "2025-01-01",
};
```

#### 3. Implemente o jogo

Construa a lógica e a UI do seu jogo em `Game.tsx`.

#### 4. Registre no registro

Adicione uma linha em `src/registry/games.ts`:

```ts
import { config as meuJogo } from "@/features/games/all/meu-jogo/config";

const gamesList: GameRegistryEntry[] = [
  // ... jogos existentes
  { config: meuJogo },
];
```

**Pronto.** O jogo aparece automaticamente em:

- Grade do catálogo com busca, filtro e ordenação
- Contagens de categorias na barra lateral
- Seções de destaque/populares/novos (baseado nas flags de configuração)
- Sua própria página em `/games/meu-jogo` (rota dinâmica)

As categorias são geradas automaticamente a partir do registro — nenhuma atualização manual de categorias é necessária.

---

## Diretrizes do Projeto

### Qualidade de Código

- **Sem `any`** — cada valor deve ter um tipo específico.
- Funções pequenas com responsabilidade única.
- Código autoexplicativo em vez de comentários.
- Siga os princípios **SOLID**, **DRY**, **KISS** e **Clean Code**.
- Composição em vez de herança.

### Componentes

- Um componente = uma responsabilidade.
- Componentes reutilizáveis ficam em `components/ui/` ou `components/shared/`.
- Nunca duplique código — se for usado duas vezes, extraia.

### Server Components

- Prefira Server Components por padrão.
- Adicione `"use client"` apenas ao usar `useState`, `useEffect`, eventos, animações, canvas ou APIs do navegador.

### Estilização

- Tailwind CSS apenas — sem CSS modules ou estilos inline.
- Design responsivo mobile-first.
- Espaçamento, grade e tipografia consistentes.

### Imports

- Sempre use imports absolutos com prefixo `@/` (ex.: `@/components/ui/Button`).
- Sem caminhos relativos longos.

### Estado

- React state + Context API apenas.
- Sem Redux, Zustand ou bibliotecas de estado externas.

---

## Visão Geral da Estrutura do Projeto

| Diretório                | Propósito                                          |
| ------------------------ | -------------------------------------------------- |
| `src/app/`               | Páginas e rotas                                    |
| `src/registry/`          | Registro central de jogos (fonte única da verdade) |
| `src/game-template/`     | Template para criar novos jogos                    |
| `src/components/ui/`     | Primitivas de UI reutilizáveis                     |
| `src/components/layout/` | Navbar, Footer                                     |
| `src/features/home/`     | Seções da página inicial                           |
| `src/features/games/`    | Catálogo de jogos + módulos individuais            |
| `src/constants/`         | Constantes da aplicação                            |
| `src/types/`             | Interfaces TypeScript (GameConfig, etc.)           |
| `src/hooks/`             | Custom Hooks React                                 |

## Princípios-chave

- **Registro como fonte única da verdade** — todos os metadados dos jogos vêm de `registry/games.ts`
- **Categorias geradas automaticamente** — derivadas do registro, nunca escritas manualmente
- **Zero alterações estruturais** para adicionar um jogo — nenhum componente, página ou hook precisa ser editado
- **Módulos de jogo isolados** — cada jogo em sua própria pasta com `config.ts` + `Game.tsx`
- **Roteamento dinâmico** — `/games/[slug]` carrega o jogo correto automaticamente
- **Home não conhece jogos individuais** — ela apenas consome o registro

---

## Contribuindo

1. Faça um fork do repositório.
2. Crie um branch de funcionalidade (`git checkout -b feature/minha-funcionalidade`).
3. Faça suas alterações seguindo as convenções do projeto acima.
4. Execute lint e verificação de tipos:

```bash
pnpm lint
npx tsc --noEmit
```

5. Certifique-se de que o build passa:

```bash
pnpm build
```

6. Faça um commit com uma mensagem clara e descritiva.
7. Envie para seu branch e abra um Pull Request.

---

## Licença

Este projeto está licenciado sob a Licença MIT.
