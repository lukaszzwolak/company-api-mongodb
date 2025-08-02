const Employee = require("../employee.model");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Employee Model", () => {
  it('should throw an error if no "firstName", "lastName", "department"', () => {
    const emp = new Employee({});

    const err = emp.validateSync();
    expect(err.errors.firstName).to.exist;
    expect(err.errors.lastName).to.exist;
    expect(err.errors.department).to.exist;
  });

  it('should throw an error if "firstName", "lastName", or "department" is not a string', () => {
    const cases = [{}, []];

    for (let value of cases) {
      const emp = new Employee({
        firstName: value,
        lastName: value,
        department: value,
      });

      const err = emp.validateSync();
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    }
  });

  it("should not thorw an error if all required fields are provided correctly", () => {
    const emp = new Employee({
      firstName: "John",
      lastName: "Doe",
      department: "HR",
    });

    const err = emp.validateSync();
    expect(err).to.not.exist;
  });

  after(() => {
    mongoose.models = {};
  });
});
