/*
  ABOUT: src/mock-database/seed_data_authors_table.ts

  Initial seed data for the authors table of the mock-database
*/

// Imports the AuthorsTable type
import type { AuthorsTable } from "./schema";

// This is a function that will create a new instance of an `AuthorsTable`,
// that already contains initial data.
// The export keyword allows this function to be used outside of this file
export function seedAuthorsTable(): AuthorsTable {
  return [
    {
      id: "5ed614ec-b3cb-4b37-9f19-4304e5574fd5",
      name: "Seth Baradock"
    },
    {
      id: "2221a287-b633-4473-950b-ba4e5b6e6632",
      name: "Cassie Elmore"
    }
  ];
}
