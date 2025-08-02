const Department = require("../../models/department");
const expect = require("chai").expect;

describe("Department Model", () => {
  it('should throw an error if no "name" arg', async () => {
    const dep = new Department({});

    dep.validateSync((err) => {
      expect(err.errors.name).to.exist;
    });
  });
});
