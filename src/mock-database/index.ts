/*
  ABOUT: src/mock-database/index.ts

  The entry point for the mock-database.
  It exports all database types and the initialized in-memory state.
*/

// Import the structure of the database
import type { DatabaseSchema } from "./schema.ts";

// Import the seedAuthorsTable function
import { createAuthorsTable } from "./create_authors_table.ts";

// Create a new mock database (which follows the structure of DatabaseSchema)
// Create a mock database function, that creates a new database that follows
// the structure of the DatabaseSchema type.
function createMockDatabase(): DatabaseSchema {
  return {
    authors: createAuthorsTable()
  };
}

//_____________________________________________________________________________

// Allow the createMockDatabase function to be used outside this file
export { createMockDatabase };

// allow the data types that were defined in src/mock-database/schema.ts
// to be used outside of this file.
export type { Author, AuthorsTable, DatabaseSchema } from "./schema.ts";

//_____________________________________________________________________________
