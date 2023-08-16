require("dotenv").config();
const mysql = require("mysql2/promise");

const mysqlState = process.env["pigeon.db.mysql.enabled"];

async function createMySQLConnection(useDatabase) {
  const settings = {
    host: process.env["pigeon.db.mysql.host"],
    user: process.env["pigeon.db.mysql.user"],
    password: process.env["pigeon.db.mysql.password"],
    port: process.env["pigeon.db.mysql.port"] ?? 3306,
  };
  if (useDatabase) settings.database = process.env["pigeon.db.mysql.database"];
  return await mysql.createConnection(settings);
}

exports.up = async function () {
  if (mysqlState !== "true") return;
  try {
    const db = await createMySQLConnection(false);

    await db.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env["pigeon.db.mysql.database"]}`
    );
    await db.query(`USE ${process.env["pigeon.db.mysql.database"]}`);
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);
    await db.query(`
      CREATE TABLE IF NOT EXISTS user_roles (
        user_id INT,
        role VARCHAR(255),
        PRIMARY KEY (user_id, role)
      );
    `);
  } catch (error) {
    throw error;
  }
};

exports.down = async function () {
  if (mysqlState !== "true") return;
  try {
    const db = await createMySQLConnection(true);

    await db.query("DROP TABLE IF EXISTS users;");
    await db.query("DROP TABLE IF EXISTS user_roles;");
    await db.query(
      `DROP DATABASE IF EXISTS ${process.env["pigeon.db.mysql.database"]}`
    );
  } catch (error) {
    throw error;
  }
};
