/*
  ABOUT: src/mock-database/mock_database_creation.ts

  The purpose of this file is to create a function 
  that will create a new database
*/

// Import the structure of the mock database
import type { MockDatabase } from "./schema_definitions.ts";

// Import the `createAuthorsTable` function
import { createAuthorsTable } from "./table_creation_authors.ts";

// A function that creates a new database
export function createMockDatabase(): MockDatabase {
  return {
    authors: createAuthorsTable()
  };
}
