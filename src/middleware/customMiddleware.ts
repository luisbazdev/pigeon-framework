import { IncomingMessage, ServerResponse } from "node:http";
import { IMiddlewareFunction } from "pigeon-core";
/**
 * This is a generated custom middleware function, it needs to
 * call the next function at the end for it to work correctly.
 * 
 * You can create more handlers by running "plop" or "plop middleware".
 */
export const customMiddleware: IMiddlewareFunction = function (
  req: IncomingMessage,
  res: ServerResponse,
  next: Function
) {
  // Write your middleware here...
  console.log("Hello Pigeon!");
  next();
};
