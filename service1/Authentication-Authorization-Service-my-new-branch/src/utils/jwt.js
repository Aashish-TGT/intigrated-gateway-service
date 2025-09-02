import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export const signJwt = (payload, { subject, expiresInSec }) =>
  jwt.sign(payload, config.jwt.secret, {
    algorithm: config.jwt.algorithm,
    issuer: config.jwt.issuer,
    audience: config.jwt.audience,
    subject,
    expiresIn: expiresInSec
  });

export const verifyJwt = (token) =>
  jwt.verify(token, config.jwt.secret, {
    algorithms: [config.jwt.algorithm],
    issuer: config.jwt.issuer,
    audience: config.jwt.audience
  });
