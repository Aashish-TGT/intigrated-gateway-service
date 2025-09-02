const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models");
const {
  generateAccessToken,
  generateRefreshToken
} = require("../utils/generateTokens");

// 🔐 LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("📩 Incoming Email:", email);
    console.log("🔑 Incoming Password:", password);

    const admin = await Admin.findOne({ where: { email } });
    console.log("🧑‍💻 Admin from DB:", admin);

    if (!admin) {
      console.log("❌ Admin not found.");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("🔐 Password match:", isMatch);

    if (!isMatch) {
      console.log("❌ Incorrect password.");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(admin);
    const refreshToken = generateRefreshToken(admin);

    admin.refreshToken = refreshToken;
    await admin.save();

    console.log("✅ Login success for:", admin.email);
    res.json({
      message: "Login successful",
      accessToken,
      refreshToken
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

// 🔁 REFRESH TOKEN
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken)
      return res.status(403).json({ message: "Refresh token missing" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const admin = await Admin.findByPk(decoded.id);

    if (!admin || admin.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(admin);
    const newRefreshToken = generateRefreshToken(admin);

    admin.refreshToken = newRefreshToken;
    await admin.save();

    res.json({
      message: "Token refreshed",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch (err) {
    console.error("❌ Refresh error:", err);
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

// 🔓 LOGOUT
exports.logout = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.admin.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.refreshToken = null;
    await admin.save();

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("❌ Logout error:", err);
    res.status(500).json({ message: "Logout failed" });
  }
};
