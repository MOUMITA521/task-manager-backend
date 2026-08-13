const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function signup(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }

    // Password ko hash karo
    const hashedPassword = await bcrypt.hash(password, 10);

    // Naya user banao (hashed password ke saath)
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully", userId: newUser._id });
  } catch (error) {
    next(error);
  }
}


async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }

    // Step 1: User ko email se dhoondo
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    // Step 2: Password compare karo (hashed)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    // Step 3: JWT Token banao
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // token 7 din baad expire ho jayega
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
}

module.exports = { signup, login };

