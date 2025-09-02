import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import config from '../config/index.js';

let client;

export const getClient = () => {
  if (client) return client;
  const jwksUri =
    config.azureB2C.jwksUri ||
    `https://${config.azureB2C.tenant}/discovery/v2.0/keys?p=${config.azureB2C.policy}`;
  client = jwksClient({ jwksUri, cache: true, cacheMaxEntries: 5, cacheMaxAge: 10 * 60 * 1000 });
  return client;
};

export const getSigningKey = async (kid) => {
  const c = getClient();
  const key = await c.getSigningKey(kid);
  return key.getPublicKey();
};

export const verifyAzureToken = async (token) => {
  const decoded = jwt.decode(token, { complete: true });
  if (!decoded || !decoded.header) throw createError(401, 'Invalid token');
  const pubKey = await getSigningKey(decoded.header.kid);
  const verified = jwt.verify(token, pubKey, {
    algorithms: ['RS256'],
    audience: config.azureB2C.clientId
  });
  return verified; // includes claims
};
