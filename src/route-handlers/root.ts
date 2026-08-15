/*
  ABOUT: src/route-handlers/root.ts

  This file contains the route handler functions for:
  http://127.0.0.1:4666/

*/

//_____________________________________________________________________________

// Imports the `Hono` class from the hono package
import { Hono } from "hono";

// Creates a new instance of the `Hono` class, for the `/` 
// (The root of the API)
const rootRoute = new Hono();

//_____________________________________________________________________________

// This is the handler function for:
// http://127.0.0.1:4666/
rootRoute.get("/", (c) => {
  return c.text("This is /");
});

//_____________________________________________________________________________

export const rootRouteHandlers = rootRoute;
