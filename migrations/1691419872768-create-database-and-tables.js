require("dotenv").config();
const mysql = require("mysql2/promise");
async function createMySQLConnection(useDatabase) {
  const settings = {
    host: process.env["pigeon.db.mysql.host"],
    user: process.env["pigeon.db.mysql.user"],
    password: process.env["pigeon.db.mysql.password"],
  };
  if (useDatabase) settings.database = process.env["pigeon.db.mysql.database"];
  return await mysql.createConnection(settings);
}
exports.up = async function () {
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
};

exports.down = async function () {
  const db = await createMySQLConnection(true);

  await db.query("DROP TABLE IF EXISTS users;");
  await db.query("DROP TABLE IF EXISTS user_roles;");
  await db.query(
    `DROP DATABASE IF EXISTS ${process.env["pigeon.db.mysql.database"]}`
  );
};
