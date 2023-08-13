/**
 * This is an auto-generated handler for testing purposes,
 * this handler will catch all request to "/api/tests/*"
 *
 * You can test this by sending a GET request to "/api/tests"
 * for example, which will return "Hello Pigeon GET!", since this
 * handler is for testing purposes only you can remove it anytime.
 */
import { IncomingMessage, ServerResponse } from "node:http";
import { Pigeon } from "pigeon-core";
/**
 * This handler will catch all requests to "/api/tests/*"
 * please check https://github.com/luisbazdev/pigeon-framework 
 * for more understanding :)
 */
const testHandler = Pigeon.createHandler("/tests");

/**
 * GET method handler for "/api/tests" route.
 * @param {IncomingMessage} request - The incoming request object.
 * @param {ServerResponse} response - The server response object.
 */
testHandler.GET("/", async (request: IncomingMessage, response: ServerResponse) => {
  response.end("Hello Pigeon GET!");
});

/**
 * POST method handler for "/api/tests" route.
 * @param {IncomingMessage} request - The incoming request object.
 * @param {ServerResponse} response - The server response object.
 */
testHandler.POST("/", async (request: IncomingMessage, response: ServerResponse) => {
  response.end("Hello Pigeon POST!");
});

/**
 * PUT method handler for "/api/tests" route.
 * @param {IncomingMessage} request - The incoming request object.
 * @param {ServerResponse} response - The server response object.
 */
testHandler.PUT("/", async (request: IncomingMessage, response: ServerResponse) => {
  response.end("Hello Pigeon PUT!");
});

/**
 * DELETE method handler for "/api/tests" route.
 * @param {IncomingMessage} request - The incoming request object.
 * @param {ServerResponse} response - The server response object.
 */
testHandler.DELETE("/", async (request: IncomingMessage, response: ServerResponse) => {
  response.end("Hello Pigeon DELETE!");
});
