/*
  ABOUT: src/routers/root.ts

  This file contains a router that will be configured to handle requests to:
  http://127.0.0.1:4666/

*/

//_____________________________________________________________________________

// Imports the `Hono` class from the hono package
import { Hono } from "hono";

// Creates a new instance of the `Hono` class, for the `/` 
// (The root of the API)
export const rootRouter = new Hono();

//_____________________________________________________________________________

// SECTION: GET /

rootRouter.get("/", (c) => {
  return c.text("This is the / route\n");
});

//_____________________________________________________________________________
