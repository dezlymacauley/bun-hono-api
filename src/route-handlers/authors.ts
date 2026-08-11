/*
  ABOUT: src/route-handlers/authors.ts

  This file contains all the route handler functions for:
  http://127.0.0.1:4666/authors (including nested routes)

*/

//_____________________________________________________________________________

// Imports the `Hono` class from the hono package
import { Hono } from "hono";

// Creates a new instance of the `Hono` class
const app = new Hono();

//_____________________________________________________________________________

// SECTION: In-memory database

type Author = {
  id: string;
  name: string;
}

const authors: Array<Author> = [
  {
    id: "5ed614ec-b3cb-4b37-9f19-4304e5574fd5",
    name: "Seth Baradock"
  },
  {
    id: "2221a287-b633-4473-950b-ba4e5b6e6632",
    name: "Cassie Elmore"
  }
];

//_____________________________________________________________________________

// This is the handler function for:
// http://127.0.0.1:4666/authors
app.get("/", (c) => {
  return c.text("This is /authors");
});

//_____________________________________________________________________________

// This is the handler function for:
// http://127.0.0.1:4666/authors/one
app.get("/one", (c) => {
  return c.text("This is /authors/one");
});

//_____________________________________________________________________________

// This is the handler function for:
// http://127.0.0.1:4666/authors/two
app.get("/two", (c) => {
  return c.text("This is /authors/two");
});

//_____________________________________________________________________________

export const authorsRouteHandlers = app;
