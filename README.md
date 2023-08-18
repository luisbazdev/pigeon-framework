# Pigeon Framework

- [Overview](#overview)
- [How to run](#how-to-run)
- [Routing](#routing)
- [Repositories](#repositories)
- [Authentication](#authentication)
- [Middleware](#middleware)
- [Database](#database)

## Overview

Pigeon is a backend framework for creating **Application Programming Interfaces** inspired mainly by [Express.js framework](https://expressjs.com/) and created by Luis Barraza (luisbazdev) for learning purposes. It supports routing, authentication, middleware, and databases. 

The programmer can modify their API's settings in `index.ts` entry file by calling methods on the `Pigeon` object, this is the default `index.ts` file: 

```typescript
import dotenv from "dotenv";
import { Pigeon, HTTPBasicSettings, JWTSettings } from "pigeon-core";
dotenv.config();

/**
 * This file sets up and starts your API, you can modify settings related to
 * authentication, databases and other general stuff, please check the docs 
 * https://github.com/luisbazdev/pigeon-framework for more understanding :)
 */

Pigeon.auth("none");

// Pigeon.auth("jwt", <JWTSettings>{
//   privateKey: <string>process.env["pigeon.auth.jwt.privatekey"],
//   routes: {
//     enabled: <string>process.env["pigeon.auth.jwt.routes.enabled"],
//     login: <string>process.env["pigeon.auth.jwt.routes.login"],
//     signup: <string>process.env["pigeon.auth.jwt.routes.signup"],
//     logout: <string>process.env["pigeon.auth.jwt.routes.logout"],
//   },
// });

// Pigeon.auth("basic", <HTTPBasicSettings>{
//   user: <string>process.env["pigeon.auth.basic.user"],
//   password: <string>process.env["pigeon.auth.basic.password"],
// })

Pigeon.port(process.env["pigeon.port"] || "2020");

Pigeon.start();
```

Where the `auth` and `port` methods are used to set the current API's authentication method and change the default API's port, respectively.

Then the `start` method runs the API with the settings the programmer set (or the default settings if none were set).

## How to run

To begin using `Pigeon` follow these instructions:

1. Clone this repository `git clone https://github.com/luisbazdev/pigeon-framework.git`
2. Run `npm install`
3. Add API settings in your .env file
4. Run `npm run migrate` (Make sure to add correct database settings in your `.env` file, see `Database` section)
5. Start your API by running `npm start`

## Routing

Routing in **Pigeon** is done by creating handlers (via running **plop** command or creating them manually).

This is an example handler that comes by default in Pigeon:
```typescript
import { IncomingMessage, ServerResponse } from "node:http";
import { Pigeon, IPigeonHandler } from "pigeon-core";

const testHandler: IPigeonHandler = Pigeon.createHandler("/tests");

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
```

You create the handler by calling the `createHandler` method of the `Pigeon` object and specifying a handler path and an optional array of middleware functions.

All subsequent requests to `/api/handler-path` will be caught by this handler.

The handler object contains a few methods which you can use to catch requests that contain specific routes and specific HTTP methods, those methods are `GET`, `POST`, `PUT` and `DELETE`.

Each one of these methods need the programmer to provide a path, a callback function to be executed when the request hits and an optional array of middleware functions.

The callback function provided by the programmer has two parameters, `request` and `response`, both which has custom methods and objects for you to use in your handlers:

### request
* `get(header)` - Returns the value of the header the programmer specifies
* `body` - Request body sent by the client
* `cookies` - Cookies sent in the request by the client
* `query` - Query parameters in the URL sent by the client
* `params` - Custom parameters in the URL sent by the client
* `user` - The identity of the currently logged in user (in case there is any)

### Response
* `download(filePath)` - Sends the client the file located at `filePath` to download
* `redirect(to)` - Redirects the current response to `to`
* `set(header, value)` - Sets the value of header in the response;
* `send(value)` - Sends a response;
* `sendFile(filePath)` - Sends a file located in `filePath`
* `json(val)` - Send a JSON object as a response
* `status(status)` - Sets the status code of the response
* `cookie(name, value, options)` - Creates a new cookie in the response with the options the programmer specifies 

Since Pigeon adds all these custom methods to both `IncomingMessage` and `ServerResponse` interfaces, request and response will have all the methods of the interfaces previously mentioned, respectively, see [IncomingMessage](https://nodejs.org/dist/latest-v18.x/docs/api/http.html#class-httpincomingmessage) and [ServerResponse](https://nodejs.org/dist/latest-v18.x/docs/api/http.html#class-httpserverresponse) for more understanding.

## Repositories

In Pigeon you can create repositories to separate the business logic from handlers themselves, you can do this by running the `plop` command.

A repository file would look like this:

```typescript
import { IRepository } from "pigeon-core";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
/**
 * Repository for Test objects.
 * @type {IRepository}
 *
 * Please check https://github.com/luisbazdev/pigeon-framework 
 * for more understanding :)
 */
export const TestRepository: IRepository = {
  create: async function(Test: any) {
    try {
      const result = await prisma.test.create({
        data: Test
      });
      return result;
    } catch (error) {
      throw error;  
    } finally{
      await prisma.$disconnect();
    }
  },
  findById: async function(id: number) {
    try {
      const result = await prisma.test.findUnique({
        where: {
          id,
        },
      });
      return result
    } catch (error) {
      throw error;  
    } finally{
      await prisma.$disconnect();
    }
  },
  findAll: async function () {
    try {
      const result = await prisma.test.findMany();
      return result
    } catch (error) {
      throw error;  
    } finally{
      await prisma.$disconnect();
    }
  },
  update: async function(id: number, Test: any) {
    try {
      const test = await prisma.test.update({
        data: Test,
        where: {
          id,
        },
      })
      return test;
    } catch (error) {
      throw error;  
    } finally{
      await prisma.$disconnect();
    }
  },
  delete: async function(id: number) {
    try {
      const test = await prisma.test.delete({
        where: {
          id,
        },
      })
      return test;
    } catch (error) {
      throw error;  
    } finally{
      await prisma.$disconnect();
    }
  },
};
```

Which you can then import and use in your handler:

```typescript
import { IncomingMessage, ServerResponse } from "node:http";
import { Pigeon, IPigeonHandler } from "pigeon-core";
import { TestRepository } from "../repository/test";

const testHandler: IPigeonHandler = Pigeon.createHandler("/tests");

/**
 * GET method handler for "/api/tests" route.
 * @param {IncomingMessage} request - The incoming request object.
 * @param {ServerResponse} response - The server response object.
 */
testHandler.GET("/", async (request: IncomingMessage, response: ServerResponse) => {
  // Queries all tests
  const tests = await TestRepository.findAll();
  response.json({tests})
});

...
```

## Middleware

Middleware functions intercept the current HTTP request to perfome some actions before the actual request gets sent a response, you can create them by running `plop` or creating them manually.

This is an example of a test middleware function in Pigeon: 

```typescript
import { IncomingMessage, ServerResponse } from "node:http";
import { IMiddlewareFunction } from "pigeon-core";

/**
 * Custom middleware function testMiddleware.
 * @param {IncomingMessage} req - The incoming request object.
 * @param {ServerResponse} res - The server response object.
 * @param {Function} next - The next function to be called.
 */
export const testMiddleware: IMiddlewareFunction = function (
  req: IncomingMessage,
  res: ServerResponse,
  next: Function
) {
  console.log("Hello from Pigeon middleware!");
  next();
};
```

Which you can then use in one of your handlers or handler routes, respectively: 

```typescript
import { Pigeon, IPigeonHandler } from "pigeon-core";
import { testMiddleware } from "../middleware/testMiddleware"

const testHandler: IPigeonHandler = Pigeon.createHandler("/tests", [testMiddleware]);

...
```

```typescript
...

testHandler.GET("/", async (request: IncomingMessage, response: ServerResponse) => {
  // ...
  response.end()
}, [testMiddleware]);

...
```

At some point of the execution of a middleware function it must terminate and pass control to the next middleware function in the **middleware cycle**, which is done by calling `next()` function, if the programmer does not call `next()` the request will be left hanging because the rest of the middlewares will not be executed (remember the actual callback that will intercept the request is also treated as a middleware).

All functions that will be executed after an HTTP request hits the server are treated as `middlewares` (including the actual callback of a handler route), the order of middleware execution goes as: `general middleware`, `handler middleware`, `route middleware` and `callback functions`.

### General middleware

First, the `general middleware` is executed, these are the first global middleware functions that get added your API, for example, when you have set any type of `authentication method` in your API, be it either `basic` or `jwt`, the respective middleware to authenticate requests based on that method is added for all handlers in your API.

### Handler middleware

These are the middleware that get executed before any route of a specific router.

### Route middleware

These are the middleware that get executed in a specific route(s) of a specific router.

### Callback functions

These are the actual functions you provided for any specific route in your handler, this is where the response gets sent.

## Authentication

Pigeon currently support two different methods of authentication which are `HTTP Basic Authentication` and `JWT Authentication`, you can also decide not to use any of them (by default all authentication methods are disabled and your API is public).

### HTTP Basic Authentication

[HTTP Basic Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) type works by storing a username and password in the server which then the user will have to send in the Authorization HTTP header and be compared against the credentials you specified.

To use `HTTP Basic Authentication` you need to set the authentication provide a user and password in your `.env` file like this:

```typescript
pigeon.auth.basic.user=username
pigeon.auth.basic.password=password
```

And then set the authentication type to `basic` like this:

```typescript
import { Pigeon, HTTPBasicSettings } from "pigeon-core";

Pigeon.auth("basic", <HTTPBasicSettings>{
  user: <string>process.env["pigeon.auth.basic.user"],
  password: <string>process.env["pigeon.auth.basic.password"],
})
```

### JWT Authentication

[JWT Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) type works by storing a secret key which will be used to sign and verify [JWT Tokens](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) that clients will send in the Authorization header.

In Pigeon you can also specify to use `JWT Authentication routes` which are routes where the client can: log-in and receive a `JWT Token`, sign-up, and log-out and invalidate its current `JWT Token`, respectively.

Here's an example of how you can set up `JWT Authentication` in Pigeon:

Please pay attention to the `pigeon.auth.jwt.global` environment variable, as setting it to true will secure every handler there is in the API, if it is set to false, it will not secure any handler by default and the programmer will have to set `JWTAuthentication` middleware wherever they want to use `JWT Authentication`! 

The programmer needs to provide a `global`, `secret` and optional `routes` variables for authentication purposes in your `.env` file like this:

```typescript
pigeon.auth.jwt.global=true
pigeon.auth.jwt.privatekey=secret
pigeon.auth.jwt.routes.enabled=true
pigeon.auth.jwt.routes.login=/login
pigeon.auth.jwt.routes.signup=/signup
pigeon.auth.jwt.routes.logout=/logout
```

And then set the authentication type to `jwt` like this:

```typescript
import { Pigeon, JWTSettings } from "pigeon-core";

Pigeon.auth("jwt", <JWTSettings>{
    privateKey: <string>process.env["pigeon.auth.jwt.privatekey"],
    routes: {
      enabled: <string>process.env["pigeon.auth.jwt.routes.enabled"],
      login: <string>process.env["pigeon.auth.jwt.routes.login"],
      signup: <string>process.env["pigeon.auth.jwt.routes.signup"],
      logout: <string>process.env["pigeon.auth.jwt.routes.logout"],
    },
});
```

The programmer might also choose to not enable `JWT Authentication routes` and just secure the API by verifying the client's `JWT Token`, here is how you can do it: 

```typescript
import { Pigeon, JWTSettings } from "pigeon-core";

Pigeon.auth("jwt", <JWTSettings>{
    privateKey: <string>process.env["pigeon.auth.jwt.privatekey"],
});
```

## Database

Pigeon uses [Prisma ORM](https://www.prisma.io/) to perform database queries, creating schemas and migrations. 

The programmer can configure which database and schemas he wants to use in `schema.prisma` file:

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("pigeon.db.mysql.url")
}

model Test {
  id      Int      @id @default(autoincrement())
  name    String
}
```

The example above specifies that the database to use is `mysql`, `url` is a string of type `mysql://user:password@host:port/database` which specifies the details of the connection, and `Test` is a data schema, read [Prisma documentation](https://www.prisma.io/) for more understanding.

When you create a repository for `Object` you must ensure you create its respective schema in `schema.prisma` file inside `prisma` directory for `Object` (and run the migrations) so that the repository can fetch the data correctly. For example, in the repository shown earlier: 

```typescript
import { IRepository } from "pigeon-core";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
/**
 * Repository for Test objects.
 * @type {IRepository}
 *
 * Please check https://github.com/luisbazdev/pigeon-framework 
 * for more understanding :)
 */
export const TestRepository: IRepository = {
  ...

  findAll: async function () {
    try {
      const result = await prisma.test.findMany();
      return result
    } catch (error) {
      throw error;  
    } finally{
      await prisma.$disconnect();
    }
  },

  ...
};

```

This `findAll` method queries all `Test` objects (`prisma.test.findMany()`) and then returns the result of the query, if the `Test` object schema does not exist then `prisma.test.findMany()` will not work, therefore you must create its schema in `schema.prisma`, for example:

```prisma
model Test {
  id      Int      @id @default(autoincrement())
  name    String
}
```

And then `Test` will be a valid schema to use, which you can query as `prisma.test`. For more information please read [Prisma documentation](https://www.prisma.io/).