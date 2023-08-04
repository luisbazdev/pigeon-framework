import { IncomingMessage, ServerResponse } from "node:http";
import { createHandler } from "pigeon-core"
/**
 * This is a generated handler for "/api/users" route,
 * all request to such will be handled by the handler below.
 * 
 * You can create more handlers by running "plop" or "plop handler".
 */
export const userHandler = createHandler("/users");

userHandler.GET("/", async (request: IncomingMessage, response: ServerResponse) => {
  // ...
  response.end()
});
userHandler.POST("/", async (request: IncomingMessage, response: ServerResponse) => {
  // ...
  response.end()
});
userHandler.PUT("/", async (request: IncomingMessage, response: ServerResponse) => {
  // ...
  response.end()
});
userHandler.DELETE("/", async (request: IncomingMessage, response: ServerResponse) => {
  // ...
  response.end()
});
