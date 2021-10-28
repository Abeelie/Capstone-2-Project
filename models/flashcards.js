"use strict";

const db = require("../db"); 
const {NotFoundError} = require("../helpers/expressError");

class Flashcards {
    static async findAll(tag) {
      const result = await db.query(
          `SELECT * FROM flashcards where tag = $1`, [tag]);
      return result.rows;
    }

    static async findUserFlashcards(username) {
      const result = await db.query(
          `SELECT * FROM flashcards where user_name = $1`, [username]);
      return result.rows;
    }

    static async createFlashcard({title, question, answer, username, tag}) {
        const result = await db.query(
            `INSERT INTO flashcards (title, question, answer, user_name, tag)
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING "title", "question", "answer", "user_name", tag `, 
             [title, question, answer, username, tag],);
        return result.rows[0];
    }
  
    static async remove(tag) {
      let result = await db.query(
          `DELETE FROM flashcards WHERE tag = $1 RETURNING tag`,
          [tag],
      );
      const tags = result.rows[0];
  
      if (!tags) throw new NotFoundError(`No flashcard: ${tags}`);
    }
  
  }
  
  
  module.exports = Flashcards;