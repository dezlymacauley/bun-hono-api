/*
  ABOUT: src/routes/root.ts

  This file contains the route handler function for:
  http://127.0.0.1:4666/

*/

//_____________________________________________________________________________

// Imports the `Hono` class from the hono package
import { Hono } from "hono";

// Creates a new instance of the `Hono` class
const app = new Hono();

//_____________________________________________________________________________

// This is the handler function for:
// http://127.0.0.1:4666/
app.get("/", (c) => {
  return c.text("This is /");
});

//_____________________________________________________________________________

export default app;
