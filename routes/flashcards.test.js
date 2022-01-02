"use strict";

const request = require("supertest");
const app = require("../app");
const {commonBeforeAll, 
       commonBeforeEach, 
       commonAfterEach, 
       commonAfterAll} = require("./_testCommon2");
  
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST Create Flashcards /create*/

describe("POST /create", function () {
    test("create flashcards", async function () {
      const resp = await request(app)
          .post("/flashcards/create")
          .send({
                title: "testing", 
                question: "What is testing", 
                answer: "Its testing", 
                username: "u4", 
                tag: "test"
          });
      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual({ 
            flashcards:  {
                title: "testing", 
                question: "What is testing", 
                answer: "Its testing", 
                user_name: "u4", 
                tag: "test"
            }
      })
    });
});



/************************************** FIND ALL Flashcards /user/:usercards */

describe("GET /user/:usercards", function () {
    test("Get user flashcards", async function () {
      const resp = await request(app).get("/flashcards/user/u4");
      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual({  
        usercards: [
            {
                answer: "A skill used to develop software",
                question: "What is coding",
                tag: "code",
                title: "Coding",
                user_name: "u4",
            },
            {
                answer: "A skill used to develop software", 
                question: "What is coding", 
                tag: "code1",
                title: "Coding1",  
                user_name: "u4",
            },
        ],
      });
    });
});


/************************************** FIND ALL Flashcards by tag /:tag */

describe("GET /:tag", function () {
    test("Get user flashcards by tags", async function () {
      const resp = await request(app).get("/flashcards/code1");
      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual({  
        tag: [
            {
                answer: "A skill used to develop software",
                question: "What is coding",
                tag: "code1",
                title: "Coding1",
                user_name: "u4",
            },
        ],
      });
    });
});


/************************************** Delete flashcard /delete/:tag */

describe("Delete /delete/:tag", function () {
    test("Delete flashcard by tag", async function () {
      const resp = await request(app).delete("/flashcards/delete/code1");
      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual({ deleted: "code1" });
    });
});