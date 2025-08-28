// routes/mobile.js
const express      = require('express');
const jwt          = require('jsonwebtoken');
const redisClient  = require('../redisClient');
const authenticate = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';


/**
 * POST /mobile/login
 *  - Validates dummy credentials
 *  - Generates a JWT (1‑hour expiry)
 *  - Captures the push‑notification token
 */
router.post('/login', async (req, res) => {
  const { username, password, pushToken } = req.body;

  // 🔒 Replace this block with real user validation
  if (username === 'test' && password === '1234') {
    // Create JWT
    const token = jwt.sign({ user: username }, JWT_SECRET, { expiresIn: '30d' });

    // Optional: store push tokens in Redis SET for de‑duplication
    if (pushToken) {
      await redisClient.sAdd(`pushTokens:${username}`, pushToken);
      console.log(`✅ Push token saved for ${username}: ${pushToken}`);
    }

    return res.json({ token });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
});

/**
 * GET /mobile/receipt/:id
 *  - Requires Bearer JWT token (authenticate middleware)
 *  - Checks Redis first; if miss, simulates a DB/service fetch
 *  - Returns lightweight, mobile‑friendly JSON
 */
router.get('/receipt/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const cacheKey = `receipt:${id}`;

  try {
    // 1️⃣  Try Redis cache
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached)); // 🔥 cache hit
    }

    // 2️⃣  Simulate receipt fetch (replace with real DB/API call)
    const receipt = {
      id,
      amt: 199.99,                                // amount
      dt: new Date().toISOString().slice(0, 10),  // YYYY‑MM‑DD
      itm: ['pen', 'notebook']                    // items
    };

    // 3️⃣  Cache in Redis for 5 minutes
    await redisClient.set(cacheKey, JSON.stringify(receipt), { EX: 300 });

    return res.json(receipt); // fresh data
  } catch (err) {
    console.error('❌ Receipt fetch error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
