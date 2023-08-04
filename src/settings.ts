import { ISettings } from "pigeon-core";

import dotenv from "dotenv";
dotenv.config();

/**
 *  This is a configuration file for Pigeon, in this file you might modify
 *  different functionalities like: Authentication,  Database, and some other
 * general settings too.
 */
export const settings: ISettings = {
  /**
   * Setting an authentication method will set it for the whole API, if your
   * intention is to set it for a sole handler or a route, you can do it
   * adding the middleware in the respective handler or route.
   */
  AUTHENTICATION_USE: process.env.AUTHENTICATION_USE,

  AUTHENTICATION_BASIC_USER: process.env.AUTHENTICATION_BASIC_USER,
  AUTHENTICATION_BASIC_PASSWORD: process.env.AUTHENTICATION_BASIC_PASSWORD,

  AUTHENTICATION_JWT_PRIVATEKEY: process.env.AUTHENTICATION_JWT_PRIVATEKEY,
  // Automatically create authentication routes
  AUTHENTICATION_JWT_ROUTES_ENABLED: process.env.AUTHENTICATION_JWT_ROUTES_ENABLED,
  AUTHENTICATION_JWT_ROUTES_PATH: process.env.AUTHENTICATION_JWT_ROUTES_PATH,
  AUTHENTICATION_JWT_ROUTES_LOGIN: process.env.AUTHENTICATION_JWT_ROUTES_LOGIN,
  AUTHENTICATION_JWT_ROUTES_REGISTER: process.env.AUTHENTICATION_JWT_ROUTES_REGISTER,
  AUTHENTICATION_JWT_ROUTES_LOGOUT: process.env.AUTHENTICATION_JWT_ROUTES_LOGOUT,

  AUTHENTICATION_DATABASE_MYSQL_ENABLED: process.env.AUTHENTICATION_DATABASE_MYSQL_ENABLED,
  AUTHENTICATION_DATABASE_MYSQL_HOST: process.env.AUTHENTICATION_DATABASE_MYSQL_HOST,
  AUTHENTICATION_DATABASE_MYSQL_USER: process.env.AUTHENTICATION_DATABASE_MYSQL_USER,
  AUTHENTICATION_DATABASE_MYSQL_PASSWORD: process.env.AUTHENTICATION_DATABASE_MYSQL_PASSWORD,
  AUTHENTICATION_DATABASE_MYSQL_DATABASE: process.env.AUTHENTICATION_DATABASE_MYSQL_DATABASE,

  AUTHENTICATION_DATABASE_MONGODB_ENABLED: process.env.AUTHENTICATION_DATABASE_MONGODB_ENABLED,
  AUTHENTICATION_DATABASE_MONGODB_URL: process.env.AUTHENTICATION_DATABASE_MONGODB_URL,
  AUTHENTICATION_DATABASE_MONGODB_DB: process.env.AUTHENTICATION_DATABASE_MONGODB_DB,
  AUTHENTICATION_DATABASE_MONGODB_COLLECTION: process.env.AUTHENTICATION_DATABASE_MONGODB_COLLECTION,
  // Default port is 2020
  PORT: process.env.PORT,
};
