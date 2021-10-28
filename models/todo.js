"use strict";

const db = require("../db"); 
const {NotFoundError} = require("../helpers/expressError");

class Todo {
    static async findAll(username) {
      const result = await db.query(`SELECT note FROM todo where user_name = $1`, [username]);
      return result.rows;
    }

    static async createTodo({note, username}) {
        const result = await db.query(
                       `INSERT INTO todo (note, user_name)
                        VALUES ($1, $2) 
                        RETURNING "note", "user_name" `, 
                        [note, username],);
        return result.rows[0];
    }
  
    static async remove(note) {
      let result = await db.query(`DELETE FROM todo WHERE note = $1 RETURNING note`,
          [note],
      );
      const notes = result.rows[0];
  
      if (!notes) throw new NotFoundError(`No note: ${notes}`);
    }
  
  }
  
  
  module.exports = Todo;