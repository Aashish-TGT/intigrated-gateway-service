import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

export function security(app) {
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(rateLimit({
    windowMs: 60_000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false
  }));
}
