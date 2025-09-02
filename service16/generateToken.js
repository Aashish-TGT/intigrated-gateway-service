const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { userId: "1234", role: "user" },
  "feedback_api_secret_786",      // Same as in your .env
  { expiresIn: "1h" }
);

console.log("Generated JWT Token:");
console.log(token);