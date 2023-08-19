# Pigeon Framework

## Introduction

Pigeon is a backend framework for creating `Application Programming Interfaces` inspired mainly by [Express.js framework](https://expressjs.com/) and created by Luis Barraza for learning purposes. It supports `routing`, `authentication`, `middleware`, and `databases`. Click [here](https://github.com/luisbazdev/pigeon-example-api) to see an example API created with Pigeon.

The heart of Pigeon is located in the main `index.ts` file, this is where you can modify your API settings.


```typescript
// index.ts

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

## Table of Contents

* [Handlers](#handlers)
* [Repositories](#repositories)
* [Middleware](#middleware)
   * [General middleware](#general-middleware)
   * [Handler middleware](#handler-middleware)
   * [Route middleware](#route-middleware)
   * [Callback functions](#callback-functions)
* [Authentication](#authentication)
   * [HTTP Basic Authentication](#http-basic-authentication)
   * [JWT Authentication](#jwt-authentication)
* [Database](#database)
* [API](#api)
   * [Pigeon](#pigeon)
   * [Request](#request)
   * [Response](#response)

## Handlers

Routing in Pigeon is done by using `handlers` (you can create them by running `plop` or you can create them manually).

This is an example `handler` that comes by default in Pigeon:
```typescript
// test.ts

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

You can create a handler by calling the `createHandler` method of the `Pigeon` object, which will create a handler that catches requests to a certain path and return that handler:

```typescript
// Creates a handler that catches requests to "/api/tests/*"
const testHandler: IPigeonHandler = Pigeon.createHandler("/tests");
```

Now you can create routes inside `/api/tests` path:

```typescript
// Catches all GET requests to "/api/tests"
testHandler.GET("/", async (request: IncomingMessage, response: ServerResponse) => {
  response.end("Hello Pigeon GET!");
});
// Catches all POST requests to "/api/tests"
testHandler.POST("/", async (request: IncomingMessage, response: ServerResponse) => {
  response.end("Hello Pigeon POST!");
});
```

## Repositories 

In Pigeon you can create `repositories` to separate business logic from your `handlers` by running `plop` or creating them manually.

This is an example `repository`:

```typescript
// test.ts

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
  /**
   * Creates a new test.
   * @param {any} Test - The test data.
   */
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
  /**
   * Finds a test by its ID.
   * @param {number} id - The test ID.
   */
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
  /**
   * Finds all tests.
   */
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
  /**
   * Updates a test by its ID.
   * @param {number} id - The test ID.
   * @param {any} Test - The updated test data.
   */
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
  /**
   * Deletes a test by its ID.
   * @param {number} id - The test ID.
   */
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

Which you can then use in your `handler` to perform database queries:

```typescript
import { IncomingMessage, ServerResponse } from "node:http";
import { Pigeon, IPigeonHandler } from "pigeon-core";
// Import the repository
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

Middleware functions intercept the current HTTP request to perfome some actions before the actual request gets sent a response, you can create them by running `plop` or you can create them manually.

This is an example of a `middleware` that comes by default in Pigeon: 

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

Which you can then use globally in your `handler` or on specific `handler routes`, respectively:

```typescript
import { Pigeon, IPigeonHandler } from "pigeon-core";
// Import the middleware
import { testMiddleware } from "../middleware/testMiddleware"
// Add the middleware to the handler middleware array
const testHandler: IPigeonHandler = Pigeon.createHandler("/tests", [testMiddleware]);

...
```

```typescript
...
// Add the middleware to the handler route middleware array
testHandler.GET("/", async (request: IncomingMessage, response: ServerResponse) => {
  // ...
  response.end()
}, [testMiddleware]);

...
```

At some point of the execution of a `middleware` function, it must terminate and pass control to the next `middleware` function in the `middleware cycle`, which is done by calling `next()` function, if you do not call `next()` the request will be left hanging because the rest of the `middlewares` will not be executed (keep in mind the actual callback of a `handler route` is also treated as a `middleware`).

All functions that get executed when an HTTP request hits the server are treated as `middlewares` (including the actual callback of a `handler route`), the order of middleware execution goes like: `general middleware`, `handler middleware`, `route middleware` and `callback functions`.

### General middleware

These are the global middleware functions that get added your API, for example, when you set any type of `authentication method` in your API, be it either `basic` or `jwt`, the respective middleware to authenticate requests based on that method is added for all `handlers` in your API (in case of `JWT`, `JWTAuthentication` middleware only gets added if `pigeon.auth.jwt.global` variable is equal to `true`).

### Handler middleware

These are the `middleware` that get executed before any `handler route` of a specific `handler`.

### Route middleware

These are the `middleware` that get executed before a specific `handler route` of a specific `handler`.

### Callback functions

These are the actual `callback functions` that were provided for any specific `handler route` in a `handler`.

## Authentication

Pigeon currently support two different methods of authentication which are `HTTP Basic Authentication` and `JWT Authentication`, you can also decide not to use any of them (by default all authentication methods are disabled and your API is public).

### HTTP Basic Authentication

[HTTP Basic Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) type works by storing a username and password in the server which then the user will have to send in the `Authorization` HTTP header and be compared against the credentials you specified.

To use `HTTP Basic Authentication` you need to provide a user and password in your `.env` file like this:

```typescript
pigeon.auth.basic.user=username
pigeon.auth.basic.password=password
```

And then set the `authentication method` to `basic` like this:

```typescript
import { Pigeon, HTTPBasicSettings } from "pigeon-core";

Pigeon.auth("basic", <HTTPBasicSettings>{
  user: <string>process.env["pigeon.auth.basic.user"],
  password: <string>process.env["pigeon.auth.basic.password"],
})
```


### JWT Authentication

[JWT Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) type works by storing a secret key which will be used to sign and verify [JWT Tokens](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) that clients will send in the request.

In Pigeon you can also specify to use `JWT Authentication routes` which are routes where the client can: log-in and receive a `JWT Token` or sign-up with `email` and `password`, respectively.

Here's an example of how you can set up `JWT Authentication` in Pigeon, you need to provide a `global`, `secret` and an optional `routes` variables in your `.env` file like this:

```typescript
pigeon.auth.jwt.global=true
pigeon.auth.jwt.privatekey=secret
pigeon.auth.jwt.routes.enabled=true
pigeon.auth.jwt.routes.login=/login
pigeon.auth.jwt.routes.signup=/signup
pigeon.auth.jwt.routes.logout=/logout
```

Please pay attention to the `pigeon.auth.jwt.global` environment variable, as setting it to true will secure every `handler` there is in the API, else it will not secure any `handler` by default and you will have to set `JWTAuthentication middleware` wherever you want to use `JWT Authentication`! 

And then set the `authentication method` to `jwt` like this:

```typescript
import { Pigeon, JWTSettings } from "pigeon-core";

Pigeon.auth("jwt", <JWTSettings>{
  global: <string>process.env["pigeon.auth.jwt.global"],
  privateKey: <string>process.env["pigeon.auth.jwt.privatekey"],
  routes: {
    enabled: <string>process.env["pigeon.auth.jwt.routes.enabled"],
    login: <string>process.env["pigeon.auth.jwt.routes.login"],
    signup: <string>process.env["pigeon.auth.jwt.routes.signup"],
    logout: <string>process.env["pigeon.auth.jwt.routes.logout"],
  },
});
```

You might also choose to not enable `JWT Authentication routes` and just secure the API by verifying the client's `JWT Token`, here is how you can do it: 

```typescript
import { Pigeon, JWTSettings } from "pigeon-core";

Pigeon.auth("jwt", <JWTSettings>{
  privateKey: <string>process.env["pigeon.auth.jwt.privatekey"],
});
```

## Database

Pigeon uses [Prisma ORM](https://www.prisma.io/) to perform database queries, creating schemas and migrations. 

You can configure which `database` and `models` you want to use in your API by modifying the `schema.prisma` file:

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

// These models are needed for JWT Authentication
// Do NOT remove them!
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  roles     UserRole[]
}

model UserRole {
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
  role      String

  @@id([userId, role])
}

// Create your models here
model Test {
  id   Int    @id @default(autoincrement())
  name String
}
```

The example above specifies that the database to use is `mysql` and the credentials for setting the connection are stored in `pigeon.db.mysql.url` environment variable.

In the case of `mysql`, `url` is a string of type `mysql://user:password@host:port/database` (please make sure your database is running correctly so prisma can create a connection), and `Test` is a model, read [Prisma documentation](https://www.prisma.io/) for more understanding.

When you create a repository for an `Object` you must ensure you create its respective model in `schema.prisma` (and run the migrations after, this is important) so that the repository can fetch the data correctly. For example, in the repository shown earlier: 

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

  /**
   * Creates a new test.
   * @param {any} Test - The test data.
   */
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

This `findAll` method queries all `Test` (`prisma.test.findMany()`) and then returns the result of the query, if the `Test` model does not exist (you did not create the model or did not perform the migrations) then `prisma.test.findMany()` will not work, so make sure you create its model:

```prisma
// schema.prisma

model Test {
  id      Int      @id @default(autoincrement())
  name    String
}
```

For more information please read [Prisma documentation](https://www.prisma.io/).

## How to run

1. Clone this repository `git clone https://github.com/luisbazdev/pigeon-framework.git`
2. Run `npm install`
3. Add API settings in your .env file
4. Create your API
5. Run `npm run migrate` (very important, make sure your database is running and you added database settings in your `.env` file, see [Database](#database))
6. Start your API by running `npm start`

## API

## Pigeon

### Methods

| Method | Description |
|--------|-------------|
| `createHandler(path: string, [middleware]: IMiddlewareFunction): IPigeonHandler` | Creates a new Pigeon Handler. |
| `auth(type: AuthType, [settings]: JWTSettings | HTTPBasicSettings): void` | Sets the type of authentication to use in the API. |
| `port(port: string | number): void` | Sets the port number on which the HTTP server will listen. |
| `start(): void` | Starts the API. |

#### `createHandler(path: string, [middleware]: IMiddlewareFunction): RequestHandler`

Creates a new Pigeon `handler`.

- `path`: The handler path.

- `middleware` (optional): Optional array of handler middleware.

#### `auth(type: AuthType, [settings]: JWTSettings | HTTPBasicSettings): void`

Sets the type of authentication to use in the API.

- `type`: The type of authentication to use.

- `settings` (optional): Optional authentication settings object.

#### `port(port: string | number): void`

Sets the port number on which the HTTP server will listen.

- `port`: The port number to be set.

#### `start(): void`

Starts the API.

## Request

### Properties

| Property | Description |
|----------|-------------|
| `body` | The request body. |
| `cookies` | Cookies sent in the request. |
| `query` | Query parameters from the URL. |
| `params` | Dynamic parameters from the URL. |
| `user` | The currently logged in user. |

## Response

### Methods

| Method | Description |
|--------|-------------|
| `download(filePath: string): void` | Sends a file for the client to download, `filePath` is relative to `/src/static` directory. |
| `redirect(to: string): void` | Redirects the request to `to`. |
| `set(header: string, value: string): this` | Sets the value of `header` to `value`. |
| `send(value: any): void` | Sends a text response to the client, if `value` is an `object`, it will act as using `json()` method. |
| `sendFile(filePath: string): void` | Sends a file to the client. `filePath` is relative to `/src/static` directory. |
| `json(value: any): void` | Sends a JSON response to the client. |
| `status(code: number): this` | Sets the status code of the response to `code`. |
| `cookie(name: string, value: string, options: object): this` | Sets cookie `name` to `value` using `options`. |