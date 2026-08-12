/*
  ABOUT: src/mock-database/schema.ts

  The variable types that define the database.

*/

//_____________________________________________________________________________

// SECTION: Authors Table

// Each author in the table will be saved as an object 
// that contains the following fields.
export type Author = {
  id: string;
  name: string;
};

// The AuthorsTable is an array of Author objects.
export type AuthorsTable = Array<Author>;

//_____________________________________________________________________________

// SECTION: Database Schema

// The database is an array of tables
export type DatabaseSchema = {
  // tableName: Data Type
  authors: AuthorsTable;
}

//_____________________________________________________________________________
