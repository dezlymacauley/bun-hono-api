/*
  ABOUT: src/main.ts

  This file is the entry point of the API

  It purpose is to:
  1. Create a `main` function to define the entry point of the application
  2. Imports the handler functions for all the routes.
  3. Set up the connection settings that the server will use
  4. Create a new instance of the `Hono` class
  5. Add the routes to the `Hono` instance
  6. Display the connection settings
  7. Start the server
  8. Execute the application

*/

//_____________________________________________________________________________

// Imports the `Hono` class from the hono package
import { Hono } from "hono";

// Import the handler functions for the `/` route
import { rootRouteHandlers } from "./route-handlers/root";

// Import the handler functions for the `/authors` route
import { authorsRouteHandlers } from "./route-handlers/authors";

//_____________________________________________________________________________

// SECTION: In-memory database



//_____________________________________________________________________________

// Defines the entry point of the server
function main() {
  // Connection settings
  const protocol: string = "http";
  const host: string = "127.0.0.1";
  const port: number = 4666;
  const url: string = `${protocol}://${host}:${port}`;

  // Creates a new instance of the `Hono` class and adds the routes
  const app = new Hono()
    .route("/", rootRouteHandlers)
    .route("/authors", authorsRouteHandlers);

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
