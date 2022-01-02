// "use strict";

const request = require("supertest");
const app = require("../app");
const {commonBeforeAll, 
       commonBeforeEach, 
       commonAfterEach,
       u1Token, 
       commonAfterAll} = require("./_testCommon");
  
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


/**************************************************** Get user /:username */
describe("GET /users", function () {
  test("works for users", async function () {
    const resp = await request(app)
        .get("/users/u1")
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
        user: {
          email: "user1@user.com",
          firstName: "U1F",
          lastName: "U1L",
          username: "u1",
      },
    });
  });

  test("unauth without token", async function () {
    const resp = await request(app)
        .get(`/users/u1`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if user not found", async function () {
    const resp = await request(app)
        .get(`/users/nope`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});


/************************************** Delete user /:username */

describe("Delete /:username", function () {
    test("Delete user", async function () {
      const resp = await request(app)
            .delete("/users/u1")
            .set("authorization", `Bearer ${u1Token}`);
      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual({ deleted: "u1" });
    });

    test("unauth for anon", async function () {
      const resp = await request(app)
          .delete(`/users/u1`);
      expect(resp.statusCode).toEqual(401);
    });
  
    test("not found if user missing", async function () {
      const resp = await request(app)
          .delete(`/users/nope`)
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.statusCode).toEqual(404);
    });
});



/***********************************************************Patch user info */

describe("PATCH /users/:username", () => {
  test("works for users", async function () {
    const resp = await request(app)
        .patch(`/users/u1`)
        .send({firstName: "Paul"})
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "Paul",
        lastName: "U1L",
        email: "user1@user.com",
      },
    });
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .patch(`/users/u1`)
        .send({firstName: "New"});
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if no such user", async function () {
    const resp = await request(app)
        .patch(`/users/nope`)
        .send({firstName: "Nope"})
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });

  test("bad request if invalid data", async function () {
    const resp = await request(app)
        .patch(`/users/u1`)
        .send({firstName: 42})
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});