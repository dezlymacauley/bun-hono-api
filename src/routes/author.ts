// Imports the `Hono` class from the hono package
import { Hono } from "hono";

// Creates a new instance of the `Hono` class
const app = new Hono();

// Sets up a basic route that returns text data
// This is a nested route:
// http://127.0.0.1:4666/authors/two
app.get("/two", (c) => {
  return c.text("Authors");
});

export default app;
