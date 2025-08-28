const jwt = require("jsonwebtoken");

const generateAccessToken = (admin) => {
  return jwt.sign(
    { id: admin.id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const generateRefreshToken = (admin) => {
  return jwt.sign(
    { id: admin.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken
};
