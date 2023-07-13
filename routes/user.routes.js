const express =require("express")
const {userModel, UserModel} = require("../model/user.model")
const userRouter = express.Router()

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

// Signup Route
userRouter.post('/signup', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new UserModel({ email, password: hashedPassword });
      await newUser.save();
  
      res.status(200).json({ message: 'Signup successful' });
    } catch (error) {
      console.error('Signup failed', error);
      res.status(500).json({ error: 'Signup failed' });
    }
  });
  
  // Login Route
  userRouter.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, 'secret_key');
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Login failed', error);
      res.status(500).json({ error: 'Login failed' });
    }
  });

  module.exports = {
    userRouter
  }
  
  