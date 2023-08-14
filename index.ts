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

// Pigeon.database("mysql", {
//   host: <string>process.env["pigeon.db.mysql.host"],
//   user: <string>process.env["pigeon.db.mysql.user"],
//   password: <string>process.env["pigeon.db.mysql.password"],
//   database: <string>process.env["pigeon.db.mysql.database"],
//   port: <string>process.env["pigeon.db.mysql.port"],
// });

// Pigeon.database("mongodb", {
//   url: <string>process.env["pigeon.db.mongodb.url"],
//   db: <string>process.env["pigeon.db.mongodb.db"],
//   collection: <string>process.env["pigeon.db.mongodb.collection"],
// });

Pigeon.port(process.env["pigeon.port"] || "2020");

Pigeon.start();