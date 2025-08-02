const Department = require("../department.model");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Department Model", () => {
  it('should throw an error if no "name" arg', () => {
    const dep = new Department({});
    const err = dep.validateSync();

    expect(err.errors.name).to.exist;
  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];

    for (let name of cases) {
      const dep = new Department({ name });
      const err = dep.validateSync();
      expect(err.errors.name).to.exist;
    }
  });

  after(() => {
    mongoose.models = {};
  });
});
