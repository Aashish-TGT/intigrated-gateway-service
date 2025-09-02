import createError from 'http-errors';
import config from '../config/index.js';
import { verifyJwt } from '../utils/jwt.js';
import { verifyAzureToken } from '../services/azureB2CValidator.js';

export const authenticate = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw createError(401, 'Missing Authorization header');

    let claims;
    if (config.azureB2C.enabled) {
      claims = await verifyAzureToken(token);
      // normalize to our shape
      req.user = { id: claims.sub, email: claims.emails?.[0] || claims.email, roles: claims.roles || [] };
    } else {
      claims = verifyJwt(token);
      req.user = { id: claims.sub, email: claims.email, roles: claims.roles || [] };
    }

    return next();
  } catch (err) {
    return next(err);
  }
};
