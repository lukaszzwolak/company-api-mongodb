const mongoose = require("mongoose");
const Department = require("../department.model");
const expect = require("chai").expect;

describe("Department", () => {
  before(async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/companyDBtest", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });

  describe("Reading data", () => {
    before(async () => {
      const testDepOne = new Department({ name: "Department #1" });
      await testDepOne.save();

      const testDepTwo = new Department({ name: "Department #2" });
      await testDepTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const departments = await Department.find();
      const expectedLength = 2;
      expect(departments.length).to.equal(expectedLength);
    });

    it('should return the first department with "findOne" method', async () => {
      const department = await Department.findOne({ name: "Department #1" });
      expect(department.name).to.equal("Department #1");
    });
  });

  after(() => {
    mongoose.models = {};
  });
});
