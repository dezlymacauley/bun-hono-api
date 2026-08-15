/*
  ABOUT: src/mock-database/schema_definitions.ts

  The purpose of this file is to create:
  1. A data type to represent a specific row of a table in the database.
  2. A data type to represent a specific table in the mock database.
  3. A data types that represents the entire mock database.
*/

//_____________________________________________________________________________

// SECTION: Authors Table

// Each row in the Authors table will contain data about an author
export type Author = {
  id: string;
  name: string;
};

// The AuthorsTable is an array of Author objects.
export type AuthorsTable = Array<Author>;

//_____________________________________________________________________________

// SECTION: Mock Database

// The database is an array of tables
export type MockDatabase = {
  // tableName: Data Type
  authors: AuthorsTable;
}

//_____________________________________________________________________________
