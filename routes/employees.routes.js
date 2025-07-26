const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/employee.controller");

router.get("/employee", EmployeeController.getAll);
router.get("/employee/random", EmployeeController.getRandom);
router.get("/employee/:id", EmployeeController.getById);
router.post("/employee", EmployeeController.create);
router.put("/employee/:id", EmployeeController.update);
router.delete("/employee/:id", EmployeeController.delete);

module.exports = router;
