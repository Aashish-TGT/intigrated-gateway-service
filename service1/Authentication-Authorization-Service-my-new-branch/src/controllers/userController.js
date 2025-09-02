import User from '../models/User.js';
import createError from 'http-errors';
import { ROLES } from '../config/roles.js';

export const list = async (_req, res) => {
  const users = await User.find({}, { email: 1, name: 1, roles: 1, provider: 1 });
  res.json({ users });
};

export const updateRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { roles } = req.body;
    if (!Array.isArray(roles) || roles.some((r) => !Object.values(ROLES).includes(r))) {
      throw createError(400, 'Invalid roles array');
    }
    const user = await User.findByIdAndUpdate(id, { roles }, { new: true });
    if (!user) throw createError(404, 'User not found');
    res.json({ id: user.id, roles: user.roles });
  } catch (err) {
    next(err);
  }
};
