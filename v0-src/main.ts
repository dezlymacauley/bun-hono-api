/*
  ABOUT: src/main.ts

  This file is the entry point of the API

  The purpose of this file is to:
  1. Define the connections details in advance for the Bun Server.
  2. Create a Hono App.
  3. Define the routes of the API, 
  and attach a router that will handle requests made to each route.
  4. Create a Bun Server that uses the connection details,
  and the uses the functionality of the Hono App to handle routing.

*/

//_____________________________________________________________________________

// Imports the `Hono` class from the hono package
import { Hono } from "hono";

// Import the router for the `/` route
import { rootRouter } from "./routers/root";

// Import the route for the `/authors` route
import { authorsRouter } from "./routers/authors";

//_____________________________________________________________________________

// Connection settings
const protocol: string = "http";
const hostname: string = "127.0.0.1";
const port: number = 4666;
const url: string = `${protocol}://${hostname}:${port}`;

// Creates a new instance of the `Hono` class called `honoApp`
// This is where each route of the API defined, and attached to a hono Router
// that has been configured to handle requests for that route.
const honoApp = new Hono()
  .route("/", rootRouter)
  .route("/authors", authorsRouter);

// Displays the connection settings
console.log("\nThe server is running on:");
console.log(`${url}\n`);

// Starts a Bun Server with the hostname and port that were specified
// in the variables, and delegates the handling of requests to the honoApp.
// Note that `hostname, port` is short hand for:
// hostname: hostname, port: port
Bun.serve({ hostname, port, fetch: honoApp.fetch });
