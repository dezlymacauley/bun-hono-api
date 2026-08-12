/*
  ABOUT: src/route-handlers/authors.ts

  This file contains all the route handler functions for:
  http://127.0.0.1:4666/authors (including nested routes)

*/

//_____________________________________________________________________________

// Imports the `Hono` class from the hono package
import { Hono } from "hono";

// Import the type definition for what how each author in the database 
// should be represented.
import type { Author } from "../in_memory_database";

//_____________________________________________________________________________

// Creates a new instance of the `Hono` class
const app = new Hono<Env>();

// const authorsDatabase: Array<Author> = [
//   {
//     id: "5ed614ec-b3cb-4b37-9f19-4304e5574fd5",
//     name: "Seth Baradock"
//   },
//   {
//     id: "2221a287-b633-4473-950b-ba4e5b6e6632",
//     name: "Cassie Elmore"
//   }
// ];

//_____________________________________________________________________________

// This is the handler function for:
// http://127.0.0.1:4666/authors
app.get("/", (c) => {
  // .json() accepts a variable that can be converted to JSON
  // When a request is made to this endpoint,
  // JSON will be returned to the caller.
  return c.json(authorsDatabase);
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

  // Check the database if an author with this id exists
  // 1. If there is a match,
  // then the data type of author will be an `Author` object
  // 2. If there isn't a match,
  // then the data type of author will be `undefined`.
  const author: Author | undefined = authorsDatabase.find(
    (a) => a.id === id_requested
  );

  if (author === undefined) {
    // 404 is the http status code for not found
    return c.json({error: "Author not found"}, 404);
  }

  return c.json(author);
});

//_____________________________________________________________________________

export const authorsRouteHandlers = app;
