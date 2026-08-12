/*
  ABOUT: src/mock-database/authors_table_seed_data.ts

  Initial seed data for the authors table of the mock-database
*/

// Imports the AuthorsTable type
import type { AuthorsTable } from "./schema";

// Creates a new instance of the Authors table,
// with starting data.
export const authorsTable: AuthorsTable = [
  {
    id: "5ed614ec-b3cb-4b37-9f19-4304e5574fd5",
    name: "Seth Baradock"
  },
  {
    id: "2221a287-b633-4473-950b-ba4e5b6e6632",
    name: "Cassie Elmore"
  }
];
