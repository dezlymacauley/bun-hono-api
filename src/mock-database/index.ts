/*
  ABOUT: src/mock-database/index.ts

  The entry point for the mock-database.
  It exports all database types and the initialized in-memory state.
*/

// Import the structure of the database
import type { DatabaseSchema } from "./schema";

// Import the initial data for the authors table
import { authorsTable } from "./seed_data_authors_table";

// Create a new mock database (which follows the structure of DatabaseSchema)
const mock_database: DatabaseSchema = {
  authors: authorsTable
};

//_____________________________________________________________________________

// Allow the mock database to be used outside this file
export { mock_database };

// allow the data types that were defined in src/mock-database/schema.ts
// to be used outside of this file.
export type { Author, AuthorsTable, DatabaseSchema } from "./schema.ts";

//_____________________________________________________________________________
