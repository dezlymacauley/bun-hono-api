import { z } from "zod";

const dotEnvSchema = z.object({
  SERVER_PORT: z.coerce.number().int().positive().default(4666),

  DB_PORT: z.coerce.number().int().positive().default(5432),
  DB_NAME: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
});

export const env = dotEnvSchema.parse(process.env);
