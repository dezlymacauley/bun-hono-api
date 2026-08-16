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
import { zValidator } from "@hono/zod-validator";
import z from "zod";

//_____________________________________________________________________________

// Create a new instance of a mock database
// const mockDatabase: DatabaseSchema = createMockDatabase();
const mockDatabase: MockDatabase = createMockDatabase();

// Creates a new instance of the `Hono` class, for the `/authors` route.
export const authorsRouter = new Hono();

//_____________________________________________________________________________

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

// SECTION: POST requests /authors

// const createAuthorSchema = z.object({
//   name: z.string().min(1), 
//   birthday: z.coerce.date().optional()
// })
//
// authorsRouter.post("/", zValidator("json", createAuthorSchema), (c) => {
//   const data = c.req.valid("json");
//
//   const author = { id: crypto.randomUUID(), ...data};
//
//   mockDatabase.authors.push(author);
//
//   // Returns the JSON object for the author that matches the `idRequested`
//   return c.json(author, 201);
// });
