/*
  ABOUT: src/routers/authors.ts

  This file contains a router that will be configured to handle requests to:
  http://127.0.0.1:4666/authors
*/

//_____________________________________________________________________________

// Imports the `Hono` class from the hono package
import { Hono } from "hono";

// Imports the `MockDatabase` data type
import type { Author, MockDatabase } from "../mock-database/schema_definitions";

// Imports the `createMockDatabase` function
import { createMockDatabase } from "../mock-database/mock_database_creation";

// Imports `z` from the zod package to create data validation schemas.
import { z } from "zod";

// Imports the `zValidator` middleware that will allow Hono to use
// data validation schemas when handling requests.
import { zValidator } from "@hono/zod-validator";

//_____________________________________________________________________________

// Create a new instance of a mock database
// const mockDatabase: DatabaseSchema = createMockDatabase();
const mockDatabase: MockDatabase = createMockDatabase();

// Creates a new instance of the `Hono` class, for the `/authors` route.
export const authorsRouter = new Hono();

//_____________________________________________________________________________

// SECTION: GET /authors

// This is will handle requests to:
// http://127.0.0.1:4666/authors
authorsRouter.get("/", (c) => {
  // .json() accepts a variable that can be converted to JSON
  // When a request is made to this endpoint,
  // the `authors` table from the mock database will be returned to the
  // called as JSON data.
  return c.json(mockDatabase.authors);
});

//_____________________________________________________________________________

// SECTION: GET /authors[id]

// This will handle dynamic requests to:
// http://127.0.0.1:4666/authors/:id
//
// `:id` is a variable that will be received from the request.
//
// E.g. If this request is made:
// http://127.0.0.1:4666/authors/abc123
// Then `:id` is "abc123"

authorsRouter.get("/:id", (c) => {
  // This is how you store the `:id` value from the request to a variable.
  // This is the id requested by the caller of the API.
  const idRequested: string = c.req.param("id");

  // Checks the `authors` list from the mock database to see if there is
  // an author that matches the `idRequested`.
  // `.find()` iterates through each `element` (an Author object)
  // and checks if `element.id` equals `idRequested`.
  const resultOfSearch: Author | undefined = mockDatabase.authors.find(
    (element) => {
      return element.id === idRequested;
    }
  );

  // Error handling for when there is no match
  if (resultOfSearch === undefined) {
    // 404 is the HTTP status code for Not Found
    return c.json({ error: "No author matched the id requested" }, 404);
  }

  // Returns the JSON object for the author that matches the `idRequested`
  return c.json(resultOfSearch);
});

//_____________________________________________________________________________

// SECTION: POST /authors

/*  

A POST request sent to `/authors` will be used to add a new author to the
authors table of the mock database.

This POST request that is sent to the API will contain a JSON object.

You need to create an author creation request schema definition for 
the JSON object that meets two standards:

1. Data type checks
The fields of the authorCreationRequestSchema must match the data types
that were defined in mock-database/schema_definitions.ts`

export type Author = {
  id: string;
  name: string;
  birthday: string | null;
};

2. Data value checks
And in addition to this, you can use the Zod validation library to further
restrict what are valid values.

E.g. 

*/

const authorCreationRequestSchema = z.object({
  name: z.string().min(1, "Name must be longer than 1 character"),

  birthday: z.iso
    .date({ error: "Date must be in YYYY-MM-DD format" })
    .nullable()
    .default(null)
});

// The sytax for zValidator is:
// zValidator("request data type", validation schema)
authorsRouter.post(
  "/",
  // This is why zValidator is called middleware. 
  zValidator("json", authorCreationRequestSchema),
  (c) => {
    
    const authorCreationData = c.req.valid("json");

    // Create a new author
    // the id field will be auto-generated,
    // and ...authorCreationData means that the rest of the fields from
    // the newAuthor will be filled in using the authorCreationData from
    // the request.
    const newAuthor = {id: crypto.randomUUID(), ...authorCreationData};

    mockDatabase.authors.push(newAuthor);

    // 201 is the HTTP status code for created
    return c.json(newAuthor, 201);
  }
);

// TODO: Implement Update and Delete
