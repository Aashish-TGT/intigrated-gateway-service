import Joi from 'joi';
import createError from 'http-errors';
import config from '../config/index.js';
import * as Auth from '../services/authService.js';

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().min(2).max(80).optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const register = async (req, res, next) => {
  try {
    if (config.azureB2C.enabled) throw createError(400, 'Registration is handled by Azure AD B2C');
    const { value, error } = registerSchema.validate(req.body);
    if (error) throw createError(400, error.message);
    const user = await Auth.register(value);
    const tokens = await Auth.issueTokens({ _id: user.id, ...user });
    return res.status(201).json({ user, ...tokens });
  } catch (err) {
    return next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    if (config.azureB2C.enabled) throw createError(400, 'Login is handled by Azure AD B2C');
    const { value, error } = loginSchema.validate(req.body);
    if (error) throw createError(400, error.message);
    const tokens = await Auth.login(value);
    return res.json(tokens);
  } catch (err) {
    return next(err);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body || {};
    if (!refreshToken) throw createError(400, 'refreshToken is required');
    const tokens = await Auth.refresh({ refreshToken });
    return res.json(tokens);
  } catch (err) {
    return next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body || {};
    if (!refreshToken) throw createError(400, 'refreshToken is required');
    await Auth.logout({ userId: req.user.id, refreshToken });
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};

export const me = async (req, res) => res.json({ user: req.user });
