/*
  ABOUT: src/mock-database/index.ts

  The purpose of this file is to create a function that will create a new
  database 
  instance of an AuthorsTable. 

  The instance should also have some initial data for API testing.
  The entry point for the mock-database.
  It exports all database types and the initialized in-memory state.
*/

// Import the structure of the database
import type { DatabaseSchema } from "./schema.ts";

// Import the `createAuthorsTable` function
import { createAuthorsTable } from "./table_creation_authors.ts";

// A function that creates a new database
export function createMockDatabase(): DatabaseSchema {
  return {
    authors: createAuthorsTable()
  };
}
