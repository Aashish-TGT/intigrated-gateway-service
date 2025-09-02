import express from 'express';
import { bindIdentity, getConsent } from '../controllers/identity.controller.js';
import { validateIdentity } from '../services/mockIdentity.service.js';

const router = express.Router();

/**
 * Middleware to validate identity input
 */
const validateIdentityMiddleware = async (req, res, next) => {
  const { type, value } = req.body;

  if (!type || !value) {
    return res.status(400).json({ error: 'Identity type and value are required' });
  }

  try {
    const isValid = await validateIdentity(type, value);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid identity format' });
    }
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Utility wrapper for async route handlers
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @route POST /bind/identity
 * @desc Bind an identity to a receipt
 */
router.post('/bind/identity', validateIdentityMiddleware, asyncHandler(bindIdentity));

/**
 * @route GET /consent/:receiptId
 * @desc Get consent details for a specific receipt
 */
router.get('/consent/:receiptId', asyncHandler(getConsent));

export default router;
