// Imports the `Hono` class from the hono package
import { Hono } from "hono";

import authorRoutes from "./routes/author.ts";

// Defines the entry point of the server
function main() {
  // Connection settings
  const protocol: string = "http";
  const host: string = "127.0.0.1";
  const port: number = 4666;
  const url: string = `${protocol}://${host}:${port}`;

  // Creates a new instance of the `Hono` class
  const app = new Hono();

  app.route("/authors", authorRoutes);

  // Sets up a basic route that returns text data
  // app.get("/", (c) => {
  //   return c.text("Hello Hono!");
  // });

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
