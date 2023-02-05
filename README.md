# Todo List Demo

## Link

https://todo-list-demo-rho.vercel.app/

## Environment Setup

- use `Next.js` official [example](https://github.com/vercel/next.js/tree/canary/examples/api-routes-apollo-server-and-client) for TS, Next.js client, and Apollo server

- use `eslint` and `prettier` for linting and formatting

## Usage

1. `npm run dev`: starts running dev-server

2. `npm run build`: builds bundled file for hosting

3. `next start`: starts the application in production mode. The application should be compiled with next build first.

4. `npm run lint`: use `eslint` for manually checking files lint

5. `npm run format`: use `prettier` for manually formatting

## Folder Structure

```
┌── .vscode                    # VSCode setting for ESLint/prettier auto-fix function
├── apollo                     # mock query and mutation
│    ├── client.tsx
│    ├── resolvers.ts
│    ├── schema.ts
│    └── type-defs.ts
│
├── components                 # shared components
│    └── Snackbar.tsx          # Snackbar encapsulated with MUI and Nice-Modal
│
├── constants                  # shared constants
│    ├── texts.ts              # layout and error message constants
│    └── themes.ts             # css constants
│
├── gqls                       # graphQL query syntax
│    └── todo.ts
│
├── modules                    # specific business logic and component
│    └── PageTodos             # for todo page usage
│         ├── CreateForm
│         │    ├── index.tsx
│         │    └── CreateButton.tsx
│         │
│         ├── TodoList
│         │    ├── index.tsx
│         │    ├── IconList.tsx
│         │    └── Todo.tsx
│         │
│         ├── Header.tsx
│         └── index.tsx        # Root of <PageTodos />
│
├── pages                      # Entry points for each pages
│    ├── api
│    │    └── graphql.ts       # offers '/api/graphql' API endpoint
│    │
│    ├── _app.tsx              # general page settings before entering specific route
│    └── index.tsx             # Main Todo Page
│
├── .gitignore                 # Exclude files from Git version control
├── .eslintrc.json             # ESLint settings
├── .prettierrc                # prettier settings
├── README.md                  # README
├── package-lock.json          # Lock the version of dependencies packages
├── package.json               # List dependencies packages, npm scripts etc.
└── tsconfig.json              # TypeScript settings
```
