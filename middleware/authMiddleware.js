const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  try {
    // Step 1: Header se token nikalo
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const error = new Error("No token provided, access denied");
      error.statusCode = 401;
      throw error;
    }

    // Step 2: "Bearer" hatके sirf token nikalo
    const token = authHeader.split(' ')[1]; // "Bearer TOKEN" ko split karke [1] index liya

    if (!token) {
      const error = new Error("No token provided, access denied");
      error.statusCode = 401;
      throw error;
    }

    // Step 3: Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Step 4: Decoded data (userId, email) ko req mein daal do, aage use karne ke liye
    req.user = decoded;

    next(); // sab sahi hai, aage badho
  } catch (error) {
    error.statusCode = 401;
    error.message = "Invalid or expired token";
    next(error);
  }
}

module.exports = verifyToken;