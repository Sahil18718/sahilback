const mongoose = require("mongoose")

// Employee Model
const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    department: String,
    salary: Number,
  });
  
const Employee = mongoose.model('Employee', employeeSchema);

module.exports={
    Employee
}