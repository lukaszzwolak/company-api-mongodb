const mongoose = require("mongoose");

// Department Schema
const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

// Employee Schema
const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: { type: String, required: true },
});

// Export models
module.exports = {
  Department: mongoose.model("Department", departmentSchema),
  Employee: mongoose.model("Employee", employeeSchema),
};
