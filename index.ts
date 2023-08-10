import dotenv from "dotenv";
dotenv.config();

import { AuthType, HTTPBasicSettings, JWTSettings, Pigeon } from "pigeon-core";

const auth: AuthType | string | undefined = process.env["pigeon.auth.type"];

switch (auth) {
  case "Basic": {
    const basicAuthSettings: HTTPBasicSettings = {
      user: <string>process.env["pigeon.auth.basic.user"],
      password: <string>process.env["pigeon.auth.basic.password"],
    };
    Pigeon.auth(auth, basicAuthSettings);
    break;
  }
  case "JWT": {
    const jwtAuthSettings: JWTSettings = {
      privateKey: <string>process.env["pigeon.auth.jwt.privatekey"],
      routes: {
        enabled: <string>process.env["pigeon.auth.jwt.routes.enabled"],
        login: <string>process.env["pigeon.auth.jwt.routes.login"],
        signup: <string>process.env["pigeon.auth.jwt.routes.signup"],
        logout: <string>process.env["pigeon.auth.jwt.routes.logout"],
      },
    };
    Pigeon.auth(auth, jwtAuthSettings);
    break;
  }
  default:
    break;
}

const mysqlEnabled: string | undefined = process.env["pigeon.db.mysql.enabled"];
if (mysqlEnabled === "true")
  Pigeon.database("MySQL", {
    host: <string>process.env["pigeon.db.mysql.host"],
    user: <string>process.env["pigeon.db.mysql.user"],
    password: <string>process.env["pigeon.db.mysql.password"],
    database: <string>process.env["pigeon.db.mysql.database"],
    port: <string>process.env["pigeon.db.mysql.port"],
  });

const mongodbEnabled: string | undefined =
  process.env["pigeon.db.mongodb.enabled"];
if (mongodbEnabled === "true")
  Pigeon.database("MongoDB", {
    url: <string>process.env["pigeon.db.mongodb.url"],
    db: <string>process.env["pigeon.db.mongodb.db"],
    collection: <string>process.env["pigeon.db.mongodb.collection"],
  });

const port: string | undefined = process.env["pigeon.port"];
if (port) Pigeon.port(port);

// read handlers, middleware and repositories here...
Pigeon.start();
