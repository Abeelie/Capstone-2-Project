"use strict";

const request = require("supertest");
const app = require("../app");
const {commonBeforeAll, 
       commonBeforeEach, 
       commonAfterEach, 
       commonAfterAll} = require("../helpers/_testCommon");
  
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST Create todo /create*/

describe("POST /create", function () {
    test("create todo", async function () {
      const resp = await request(app)
          .post("/todo/create")
          .send({note: "testing", username: "u0"});
      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual({todo: {note: "testing", user_name: "u0"}})
    });
});



/************************************** FIND ALL users todo /:username */

describe("GET /:username", function () {
    test("Get user todo", async function () {
      const resp = await request(app).get("/todo/u3");
      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual({todo: [{note: "test"}] });
    });
});


/************************************** Delete Todo /delete/:note */

describe("Delete /delete/:note", function () {
    test("Delete todo by note", async function () {
      const resp = await request(app).delete("/todo/delete/test");
      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual({ deleted: "test" });
    });
});