const { BadRequestError } = require("../helpers/expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

describe("testing sqlPartialUpdate", function(){
  test("testing by setting dataToUpdate and jsToSql", function () {
    const dataToUpdate = {"username": "tuser", "firstName": "tuse", "lastName": "use", "email": "use@gmail.com"};
    const jsToSql = {firstName: "first_name", lastName: "last_name", email: "email"};
    const data = sqlForPartialUpdate(dataToUpdate, jsToSql);
        expect(data).toEqual({
            setCols: '"username"=$1, "first_name"=$2, "last_name"=$3, "email"=$4',
            values: ["tuser","tuse","use", "use@gmail.com"]
        });
    });

    test("works: returns error if no data provided", function () {
        const data = {};
        const jsToSql = {firstName: "first_name", lastName: "last_name"};
        expect(() => sqlForPartialUpdate(data, jsToSql).toThrow(BadRequestError));
    });
});