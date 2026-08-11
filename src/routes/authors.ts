/*
  ABOUT: src/routes/authors.ts

  This file contains all the route handlers for:
  http://127.0.0.1:4666/authors, including nested routes.

*/

//_____________________________________________________________________________

// Imports the `Hono` class from the hono package
import { Hono } from "hono";

// Creates a new instance of the `Hono` class
const app = new Hono();

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

export default app;
