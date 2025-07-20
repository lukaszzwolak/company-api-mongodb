const express = require("express");
const cors = require("cors");
const mongoClient = require("mongodb").MongoClient;

const employeesRoutes = require("./routes/employees.routes");
const departmentsRoutes = require("./routes/departments.routes");
const productsRoutes = require("./routes/products.routes");

mongoClient.connect(
  "mongodb://0.0.0.0:27017",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully connected to the database");
      const db = client.db("companyDB");

      db.collection("employees")
        .find({ department: "IT" })
        .toArray()
        .then((data) => {
          console.log("Employees from IT department (find)", data);
        })
        .catch((err) => {
          console.log(err);
        });

      db.collection("employees")
        .findOne({ department: "IT" })
        .then((item) => {
          console.log("Employee from IT department (findOne):", item);
        })
        .catch((err) => {
          console.log(err);
        });

      const app = express();
      app.use(cors());
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));

      app.use("/api", employeesRoutes(db));
      app.use("/api", departmentsRoutes(db));
      app.use("/api", productsRoutes(db));

      app.use((req, res) => {
        res.status(404).send({ message: "Not found..." });
      });

      app.listen(8000, () => {
        console.log("Server is running on port: 8000");
      });
    }
  }
);
