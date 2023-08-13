/**
 * This is an auto-generated middleware for testing purposes only,
 * you can apply it to any handler or handler route, which when hit
 * will log in the console "Hello from Pigeon middleware!" message.
 *
 * Since this middleware is for testing purposes only you can remove 
 * it anytime.
 */
import { IncomingMessage, ServerResponse } from "node:http";
import { IMiddlewareFunction } from "pigeon-core";

/**
 * Custom middleware function testMiddleware.
 * @param {IncomingMessage} req - The incoming request object.
 * @param {ServerResponse} res - The server response object.
 * @param {Function} next - The next function to be called.
 *
 * Please check https://github.com/luisbazdev/pigeon-framework
 * for more understanding :)
 */
export const testMiddleware: IMiddlewareFunction = function (
  req: IncomingMessage,
  res: ServerResponse,
  next: Function
) {
  console.log("Hello from Pigeon middleware!");
  next();
};
