// Imports the `Hono` class
import { Hono } from "hono";

// Connection settings
const protocol: string = "http";
const host: string = "127.0.0.1";
const port: string = "4666";
const url: string = `${protocol}://${host}:${port}`;

// Creates a new instance of the `Hono` class
const app = new Hono();

// Sets up a basic route that returns text data
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// Starts the server
Bun.serve({
  port: port,
  fetch: app.fetch
});

// Displays the connection settings
console.log("\nThe server is running on:");
console.log(`${url}\n`);
