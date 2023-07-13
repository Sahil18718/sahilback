const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const employyerouter = express.Router();


const { employeemodel } = require("../model/employye.model")




// Add Employee
employyerouter.post('/employees', async (req, res) => {
    try {
      const { firstName, lastName, email, department, salary } = req.body;
  
      // Create a new employee
      const newEmployee = new employeemodel({ firstName, lastName, email, department, salary });
      await newEmployee.save();
  
      res.status(200).json({ message: 'Employee added successfully' });
    } catch (error) {
      console.error('Failed to add employee', error);
      res.status(500).json({ error: 'Failed to add employee' });
    }
  });
  
  // Get All Employees
employyerouter.get('/employees', async (req, res) => {
try {
    const employees = await employeemodel.find();
    res.status(200).json(employees);
} catch (error) {
    console.error('Failed to fetch employees', error);
    res.status(500).json({ error: 'Failed to fetch employees' });
}
});
  
  // Update Employee
employyerouter.put('/employees/:id', async (req, res) => {
try {
    const { id } = req.params;
    const { firstName, lastName, email, department, salary } = req.body;

    const updatedEmployee = await employeemodel.findByIdAndUpdate(
    id,
    { firstName, lastName, email, department, salary },
    { new: true }
    );

    res.status(200).json(updatedEmployee);
} catch (error) {
    console.error('Failed to update employee', error);
    res.status(500).json({ error: 'Failed to update employee' });
}
});
  
  // Delete Employee
employyerouter.delete('/employees/:id', async (req, res) => {
try {
    const { id } = req.params;

    await employeemodel.findByIdAndDelete(id);

    res.status(200).json({ message: 'Employee deleted successfully' });
} catch (error) {
    console.error('Failed to delete employee', error);
    res.status(500).json({ error: 'Failed to delete employee' });
}
});

  module.exports={
    employyerouter
  }