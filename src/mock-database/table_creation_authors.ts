/*
  ABOUT: src/mock-database/table_creation_authors.ts

  The purpose of this file is to create a function that will create a new
  instance of an AuthorsTable. 

  The instance should also have some initial data for API testing.
*/

// Imports the AuthorsTable data type
import type { AuthorsTable } from "./schema_definitions";

// This is a function that will create a new instance of an `AuthorsTable`,
// that already contains initial data.
// The export keyword allows this function to be used outside of this file
export function createAuthorsTable(): AuthorsTable {
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
