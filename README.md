# Bun Hono Postgres API
_______________________________________________________________________________

## Starting the server

To start the server, open a new terminal and run
```bash
bun run dev
```
_______________________________________________________________________________

## Dependencies Explained
(Listed in the order that they were installed in)
_______________________________________________________________________________

### devDependencies

- **@types/bun**
    - Allows the TypeScript language server to understand Bun specific syntax
    like `Bun.serve()` which is used to start the server.
- **prettier**
    - Applies a formatting standard specified in `prettier.config.js`to files
    in the project
- **drizzle-kit**
    - For performing database migrations
_______________________________________________________________________________

### dependencies 

- **hono**
    - Handles routing of requests made to the API
- **zod**
    - A validation library
- **@hono/zod-validator**
    - This is middleware that allows Hono to use the zod validation library
    when handling requests.
- **drizzle-orm**
    - For interacting with a Postgres database using TypeScript
_______________________________________________________________________________
