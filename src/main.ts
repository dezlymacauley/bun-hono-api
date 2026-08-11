/*
  ABOUT: src/main.ts

  This file is the entry point of the API

  It purpose is to:
  1. Imports the handler functions for all the routes.
  2. Set up the connection settings that the server will use
  3. Create a new instance of the `Hono` class
  4. Add the routes to the `Hono` instance
  5. Display the connection settings
  6. Start the server

*/

//_____________________________________________________________________________

// Imports the `Hono` class from the hono package
import { Hono } from "hono";

// Import the handler functions for the `/authors` route
import authorsRouteHandlerFunctions from "./routes/authors.ts";

// Defines the entry point of the server
function main() {
  // Connection settings
  const protocol: string = "http";
  const host: string = "127.0.0.1";
  const port: number = 4666;
  const url: string = `${protocol}://${host}:${port}`;

  // Creates a new instance of the `Hono` class
  const app = new Hono();

  app.route("/", ???RouteHandlerFunctions);
  app.route("/authors", authorsRouteHandlerFunctions);

  // Displays the connection settings
  console.log("\nThe server is running on:");
  console.log(`${url}\n`);

  // Starts the server
  Bun.serve({
    port: port,
    fetch: app.fetch
  });
}

// Executes the `main` function
main();
