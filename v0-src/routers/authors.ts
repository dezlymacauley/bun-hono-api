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
    const newAuthor = { id: crypto.randomUUID(), ...authorCreationData };

    mockDatabase.authors.push(newAuthor);

    // 201 is the HTTP status code for created
    return c.json(newAuthor, 201);
  }
);

//_____________________________________________________________________________

// SECTION: Put /authors[id]

/*  

A PUT request sent to `/authors` will be used to update the data of an
existing author from the authors table of the mock database 

*/

const authorUpdateRequestSchema = z.object({
  // `name` should be an optional field for a PUT request
  // because it is valid to send a PUT request that does not update
  // the name field.
  // update one field.
  // E.g. An put request to update only the birthday
  name: z.string().min(1, "Name must be longer than 1 character").optional(),

  // The difference here is birthday should also be optional(),
  // and should not have a default value.
  birthday: z.iso
    .date({ error: "Date must be in YYYY-MM-DD format" })
    // nullable is still fine because you may want to remove the birthday
    // of an existing user.
    .nullable()
    .optional()
});

authorsRouter.put(
  "/:id",
  zValidator("json", authorUpdateRequestSchema),
  (c) => {
    // Validate the incoming request body against authorUpdateRequestSchema
    const authorUpdateData = c.req.valid("json");

    // Extract the `id` value from the request
    const idRequested = c.req.param("id");

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

    // If there is a match then update the fields of the author
    // in the database
    if (authorUpdateData.name !== undefined) {
      resultOfSearch.name = authorUpdateData.name;
    }

    if (authorUpdateData.birthday !== undefined) {
      resultOfSearch.birthday = authorUpdateData.birthday;
    }

    // Returns the JSON object for the author that matches the `idRequested`
    return c.json(resultOfSearch, 200);
  }
);

//_____________________________________________________________________________

// SECTION: DELETE /authors[id]

authorsRouter.delete("/:id", (c) => {

  // Extract the `id` value from the request
  const idRequested = c.req.param("id");

  // Find the index of the target author in the mock database
  // that matches the idRequested.

  // NOTE: The index is different from the id.

  // The id is a unique identifier for the author
  // The index is the position of the author's data in the table.
  //
  // E.g.
  // [
  //   {
  //     id: "5ed614ec-b3cb-4b37-9f19-4304e5574fd5",
  //     name: "Seth Baradock",
  //     birthday: "2001-04-28"
  //   },
  //   {
  //     id: "2221a287-b633-4473-950b-ba4e5b6e6632",
  //     name: "Cassie Elmore",
  //     birthday: null
  //   }
  // ];
  //
  // Seth Baradock's data is at index 0, 
  // and Cassie Elmore's data is index 1

  // findIndex returns the index number if there is a match,
  // and if there is not match then it returns -1 

  const authorIndex: number = mockDatabase.authors.findIndex(
    (element) => element.id === idRequested
  );

  // Error handling for when there is no match
  if (authorIndex === -1) {
    // 404 is the HTTP status code for Not Found
    return c.json({ error: "No author matched the id requested" }, 404);
  }

  // Delete the author from the database
  // (authorIndex, 1) means "start from the authorIndex and delete 1 element"
  mockDatabase.authors.splice(authorIndex, 1);

  return c.body(null, 204);
});

//_____________________________________________________________________________
