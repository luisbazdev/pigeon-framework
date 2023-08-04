import { IRepository } from "pigeon-core";
import { MySQL } from "pigeon-core";
/**
 * This is a generated repository for a user object,
 * you can define all your logic in the repository below.
 * 
 * You can create more handlers by running "plop" or "plop repository".
 */
export const userRepository: IRepository = {
  create: async function(user) {
    const [result] = await MySQL.query("INSERT INTO users SET ?", user);
    return result.insertId;
  },
  findById: async function(id) {
    const [rows, fields] = await MySQL.query("SELECT * FROM users WHERE id=?", [id]);
    return rows[0];
  },
  findAll: async function () {
    const [rows, fields] = await MySQL.query("SELECT * FROM users");
    return rows;
  },
  update: async function(id, user) {
    const [result] = await MySQL.query("UPDATE users SET ? WHERE id=?", [user, id]);
    return result.affectedRows > 0;
  },
  delete: async function(id) {
    const [result] = await MySQL.query("DELETE FROM users WHERE id=?", [id]);
    return result.affectedRows > 0;
  },
};
