import createError from 'http-errors';

export const requireAnyRole = (...allowed) => (req, _res, next) => {
  const roles = req.user?.roles || [];
  const ok = roles.some((r) => allowed.includes(r));
  if (!ok) return next(createError(403, 'Forbidden: insufficient role'));
  return next();
};
