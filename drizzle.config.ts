import {defineConfig} from "drizzle-kit"

export default defineConfig({
  out: "src/database/migrations",
  schema: "src/database/schema.ts",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  dbCredentials: {
    password: process.env.DB_PASSWORD
  }
})
