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
type DatabaseSchema = {
  // tableName: Data Type
  authors: AuthorsTable;
}

//_____________________________________________________________________________


// export const authorsDatabase: Array<Author> = [
//   {
//     id: "5ed614ec-b3cb-4b37-9f19-4304e5574fd5",
//     name: "Seth Baradock"
//   },
//   {
//     id: "2221a287-b633-4473-950b-ba4e5b6e6632",
//     name: "Cassie Elmore"
//   }
// ];
