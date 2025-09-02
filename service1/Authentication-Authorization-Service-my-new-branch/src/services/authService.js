import createError from 'http-errors';
import User from '../models/User.js';
import { hashPassword, verifyPassword } from '../utils/crypto.js';
import { verifyJwt } from '../utils/jwt.js';
import { buildAccessToken, buildRefreshToken } from './tokenService.js';

export const register = async ({ email, password, name }) => {
  const exists = await User.findOne({ email });
  if (exists) throw createError(409, 'Email already in use');
  const passwordHash = await hashPassword(password);
  const user = await User.create({ email, passwordHash, name, provider: 'local' });
  return sanitize(user);
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !user.passwordHash) throw createError(401, 'Invalid credentials');
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) throw createError(401, 'Invalid credentials');
  return issueTokens(user);
};

export const issueTokens = async (user) => {
  const access = buildAccessToken(user);
  const refresh = buildRefreshToken(user);
  await User.updateOne(
    { _id: user._id },
    { $push: { refreshTokens: { token: refresh.token, jti: refresh.jti, expiresAt: refresh.expiresAt } } }
  );
  return { user: sanitize(user), accessToken: access.token, accessTokenExpiresIn: access.expiresIn, refreshToken: refresh.token };
};

export const refresh = async ({ refreshToken }) => {
  let decoded;
  try {
    decoded = verifyJwt(refreshToken);
  } catch (e) {
    throw createError(401, 'Invalid refresh token');
  }
  if (decoded.type !== 'refresh') throw createError(401, 'Invalid refresh token');
  const user = await User.findById(decoded.sub);
  if (!user) throw createError(401, 'Invalid refresh token');
  const record = user.refreshTokens.find((rt) => rt.token === refreshToken && !rt.revokedAt && rt.expiresAt > new Date());
  if (!record) throw createError(401, 'Refresh token revoked or expired');

  // Rotate: revoke old, add new
  const access = buildAccessToken(user);
  const next = buildRefreshToken(user);
  record.revokedAt = new Date();
  user.refreshTokens.push({ token: next.token, jti: next.jti, expiresAt: next.expiresAt });
  await user.save();

  return { accessToken: access.token, accessTokenExpiresIn: access.expiresIn, refreshToken: next.token };
};

export const logout = async ({ userId, refreshToken }) => {
  const user = await User.findById(userId);
  if (!user) return;
  const rec = user.refreshTokens.find((rt) => rt.token === refreshToken && !rt.revokedAt);
  if (rec) {
    rec.revokedAt = new Date();
    await user.save();
  }
};

export const sanitize = (user) => ({
  id: String(user._id),
  email: user.email,
  name: user.name,
  roles: user.roles,
  provider: user.provider
});
