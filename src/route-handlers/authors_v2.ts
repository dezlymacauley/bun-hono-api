/*
  ABOUT: src/route-handlers/authors.ts

  This file contains all the route handler functions for:
  http://127.0.0.1:4666/authors (including nested routes)

*/

//_____________________________________________________________________________

// Imports the `Hono` class from the hono package
import { Hono } from "hono";

// Import the createMockDatabase function, and the Author type
import {
  createMockDatabase,
  type Author,
  type DatabaseSchema
} from "../mock-database/mock_database_creation";

//_____________________________________________________________________________

// Create a new instance of a mock database
const mockMockDatabase: DatabaseSchema = createMockDatabase();

// Creates a new instance of the `Hono` class
const app = new Hono();

//_____________________________________________________________________________

// This is the handler function for:
// http://127.0.0.1:4666/authors
app.get("/", (c) => {
  // .json() accepts a variable that can be converted to JSON
  // When a request is made to this endpoint,
  // the `authors` table from the mock database will be returned to the
  // called as JSON data.
  return c.json(mockMockDatabase.authors);
});

//_____________________________________________________________________________

// NOTE: This is a dynamic route

// This is the handler function for:
// http://127.0.0.1:4666/authors/:id
//
// `:id` is a variable that will be received from the request.
// E.g. If this request is made
// http://127.0.0.1:4666/authors/5ed614ec-b3cb-4b37-9f19-4304e5574fd5
// Then `:id` is 5ed614ec-b3cb-4b37-9f19-4304e5574fd5
app.get("/:id", (c) => {
  // This is how you store the `:id` value from the request to a variable.
  // This is the id requested by the caller of the API.
  const id_requested: string = c.req.param("id");

  // Checks the `authors` table from the mock database to see if there is
  // an author that matches the `id_requested`.
  // `.find()` iterates through each `element` (an Author object)
  // and checks if `element.id` equals `id_requested`.
  const author: Author | undefined = mockMockDatabase.authors.find(
    (element) => {
      return element.id === id_requested;
    }
  );

  // Error handling for when there is no match
  if (author === undefined) {
    // 404 is the http status code for not found
    return c.json({ error: "No author matched the id requested" }, 404);
  }

  // Returns the JSON data for that author that matches the `id_requested`
  return c.json(author);
});

//_____________________________________________________________________________

export const authorsRouteHandlers = app;
