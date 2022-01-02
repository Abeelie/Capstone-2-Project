// "use strict";

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

/************************************** Delete user /:username */

describe("Delete /:username", function () {
    test("Delete user", async function () {
      const resp = await request(app).delete("/users/u0");
      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual({ deleted: "u0" });
    });
});