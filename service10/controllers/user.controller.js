// controllers/user.controller.js

const User = require('../models/user.model');        // User model import
const bcrypt = require('bcryptjs');                  // For password hashing
const jwt = require('jsonwebtoken');                 // For generating JWT token

/**
 * @desc    Register a new user under a specific tenant
 * @route   POST /api/users/register
 * @access  Public
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, tenantId } = req.body;

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password and tenant ID
    const user = new User({ name, email, password: hashedPassword, tenantId });
    await user.save(); // Save user to DB

    // Respond with success
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    // Validation or DB errors
    res.status(400).json({ error: err.message });
  }
};

/**
 * @desc    Login user and return JWT token
 * @route   POST /api/users/login
 * @access  Public
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  // If user not found or password doesn't match
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  // Generate JWT with user id and tenantId
  const token = jwt.sign(
    { id: user._id, tenantId: user.tenantId },
    process.env.JWT_SECRET,
    { expiresIn: '1d' } // Token valid for 1 day
  );

  // Send token to client
  res.json({ token });
};

/**
 * @desc    Get all users from the same tenant (protected)
 * @route   GET /api/users
 * @access  Private (requires JWT token)
 */
exports.getUsersByTenant = async (req, res) => {
  // Find users where tenantId matches user's token info
  const users = await User.find({ tenantId: req.tenantId }).select('-password');

  // Send list of users (without passwords)
  res.json(users);
};