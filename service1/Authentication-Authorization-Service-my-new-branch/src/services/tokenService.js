import { v4 as uuidv4 } from 'uuid';
import { signJwt } from '../utils/jwt.js';
import config from '../config/index.js';

export const buildAccessToken = (user) => {
  const claims = {
    sub: String(user._id),
    email: user.email,
    roles: user.roles
  };
  const token = signJwt(claims, { subject: String(user._id), expiresInSec: config.jwt.accessTtlSec });
  const expiresIn = config.jwt.accessTtlSec;
  return { token, expiresIn };
};

export const buildRefreshToken = (user) => {
  const jti = uuidv4();
  const expiresIn = config.jwt.refreshTtlSec;
  const token = signJwt({ type: 'refresh', jti }, { subject: String(user._id), expiresInSec: expiresIn });
  const expiresAt = new Date(Date.now() + expiresIn * 1000);
  return { token, jti, expiresAt };
};
