"use strict";

const request = require("supertest");
const app = require("../app");
const {commonBeforeAll, 
       commonBeforeEach, 
       commonAfterEach, 
       commonAfterAll} = require("./_testCommon");
  
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /sign-up */

describe("POST /sign-up", function () {
    test("works for anon", async function () {
      const resp = await request(app)
          .post("/auth/sign-up")
          .send({
            username: "new",
            firstName: "first",
            lastName: "last",
            password: "password",
            email: "new@email.com"
          });
      expect(resp.statusCode).toEqual(201);
      expect(resp.body).toEqual({  
        token: expect.any(String),
          user: {
                email: "new@email.com",
                firstName: "first",
                lastName: "last",
                username: "new",
          }
      });
    });
  
    test("bad request with missing fields", async function () {
      const resp = await request(app)
          .post("/auth/sign-up")
          .send({
            username: "new",
          });
      expect(resp.statusCode).toEqual(400);
    });
  
    test("bad request with invalid data", async function () {
      const resp = await request(app)
          .post("/auth/sign-up")
          .send({
            username: "new",
            firstName: "first",
            lastName: "last",
            password: "password",
            email: "not-an-email",
          });
      expect(resp.statusCode).toEqual(400);
    });
  });



/************************************** POST /auth/login */

describe("POST /auth/login", function () {
  test("works", async function () {
    const resp = await request(app)
        .post("/auth/login")
        .send({
          username: "u1",
          password: "password1",
        });
    expect(resp.body).toEqual({
      "token": expect.any(String),
    });
  });

  test("unauth with non-existent user", async function () {
    const resp = await request(app)
        .post("/auth/login")
        .send({
          username: "no-such-user",
          password: "password1",
        });
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth with wrong password", async function () {
    const resp = await request(app)
        .post("/auth/login")
        .send({
          username: "u1",
          password: "nope",
        });
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post("/auth/login")
        .send({
          username: "u1",
        });
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post("/auth/login")
        .send({
          username: 42,
          password: "above-is-a-number",
        });
    expect(resp.statusCode).toEqual(400);
  });
});




