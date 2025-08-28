// controllers/identity.controller.js
import { validateIdentity } from '../utils/validateIdentity.js';
import { IdentityService } from '../services/identity.service.js';
import logger from '../utils/logger.js';

/**
 * Bind a digital identity to a receipt
 * @route POST /bind/identity
 */
export const bindIdentity = async (req, res) => {
  try {
    const { receiptId, type, value } = req.body;

    if (!receiptId || !type || !value) {
      return res.status(400).json({
        success: false,
        message: 'receiptId, type, and value are required.'
      });
    }

    // ✅ If validateIdentity is async, use await
    const isValid = await validateIdentity(type, value);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: `Invalid ${type} format.`
      });
    }

    const result = await IdentityService.bind(receiptId, type, value);

    logger.info(`✅ Identity bound: receiptId=${receiptId}, type=${type}`);
    return res.status(201).json({
      success: true,
      message: 'Identity bound successfully.',
      data: result
    });

  } catch (error) {
    logger.error(`❌ Error binding identity [${req.body?.receiptId}]: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

/**
 * Get consent details for a receipt
 * @route GET /consent/:receiptId
 */
export const getConsent = async (req, res) => {
  try {
    const { receiptId } = req.params;

    if (!receiptId) {
      return res.status(400).json({
        success: false,
        message: 'receiptId is required.'
      });
    }

    const consentData = await IdentityService.getConsent(receiptId);

    if (!consentData) {
      return res.status(404).json({
        success: false,
        message: 'Consent not found for the given receiptId.'
      });
    }

    return res.status(200).json({
      success: true,
      data: consentData
    });

  } catch (error) {
    logger.error(`❌ Error fetching consent [${req.params?.receiptId}]: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};
