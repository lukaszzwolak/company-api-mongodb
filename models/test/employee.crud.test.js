const mongose = require("mongoose");
const Employee = require("../employee.model");
const Department = require("../department.model");
const expect = require("chai").expect;

describe("Employee", () => {
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
      await Department.deleteMany();
      await Employee.deleteMany();

      const dept = await new Department({ name: "HR" }).save();
      await new Employee({
        firstName: "John",
        lastName: "Doe",
        department: dept._id,
      }).save();
      await new Employee({
        firstName: "Jane",
        lastName: "Smith",
        department: dept._id,
      }).save();
    });

    it("should return all the data with find method", async () => {
      const employees = await Employee.find();
      expect(employees.length).to.equal(2);
    });

    it("should return proper document by various params with findOne method", async () => {
      const employee = await Employee.findOne({
        firstName: "John",
        lastName: "Doe",
      });
      expect(employee).to.not.be.null;
      expect(employee.firstName).to.equal("John");
    });

    after(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();
    });
  });

  describe("Creating data", () => {
    before(async () => {
      await Department.deleteMany();
      await Employee.deleteMany();
    });

    it("should insert new document with insertOne method", async () => {
      const dept = await new Department({ name: "IT" }).save();
      const employee = new Employee({
        firstName: "Alice",
        lastName: "Johnson",
        department: dept._id,
      });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();
    });
  });

  describe("Updating data", () => {
    let dept;

    beforeEach(async () => {
      await Department.deleteMany();
      await Employee.deleteMany();

      dept = await new Department({ name: "Sales" }).save();
      await new Employee({
        firstName: "Mark",
        lastName: "Brown",
        department: dept._id,
      }).save();
      await new Employee({
        firstName: "Lucy",
        lastName: "White",
        department: dept._id,
      }).save();
    });

    it("should properly update one document with updateOne method", async () => {
      await Employee.updateOne(
        { firstName: "Mark" },
        { $set: { firstName: "Marcus" } }
      );
      const updated = await Employee.findOne({ firstName: "Marcus" });
      expect(updated).to.not.be.null;
    });

    it("should properly update one document with save method", async () => {
      const emp = await Employee.findOne({ firstName: "Mark" });
      emp.firstName = "Marcus";
      await emp.save();

      const updated = await Employee.findOne({ firstName: "Marcus" });
      expect(updated).to.not.be.null;
    });

    it("should properly update multiple documents with updateMany method", async () => {
      await Employee.updateMany({}, { $set: { lastName: "Updated" } });
      const updated = await Employee.find({ lastName: "Updated" });
      expect(updated.length).to.equal(2);
    });

    afterEach(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();
    });
  });

  describe("Removing data", () => {
    beforeEach(async () => {
      await Department.deleteMany();
      await Employee.deleteMany();

      const dept = await new Department({ name: "Finance" }).save();
      await new Employee({
        firstName: "Amy",
        lastName: "Lee",
        department: dept._id,
      }).save();
      await new Employee({
        firstName: "Rob",
        lastName: "Miles",
        department: dept._id,
      }).save();
    });

    it("should properly remove one document with deleteOne method", async () => {
      await Employee.deleteOne({ firstName: "Amy" });
      const removed = await Employee.findOne({ firstName: "Amy" });
      expect(removed).to.be.null;
    });

    it("should properly remove multiple documents with deleteMany method", async () => {
      await Employee.deleteMany();
      const remaining = await Employee.find();
      expect(remaining.length).to.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();
    });
  });

  describe("Populating data", () => {
    before(async () => {
      await Department.deleteMany();
      await Employee.deleteMany();

      const dept = await new Department({ name: "Engineering" }).save();
      await new Employee({
        firstName: "Tom",
        lastName: "Cruise",
        department: dept._id,
      }).save();
    });

    it('should return document with populated "department" field', async () => {
      const employee = await Employee.findOne({ firstName: "Tom" }).populate(
        "department"
      );
      expect(employee.department).to.be.an("object");
      expect(employee.department.name).to.equal("Engineering");
    });

    after(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
