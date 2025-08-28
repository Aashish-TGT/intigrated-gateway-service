const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const admin = await Admin.create({ name, email, password: hash });
  res.json(admin);
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ where: { email } });
  if (!admin || !(await bcrypt.compare(password, admin.password)))
    return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
