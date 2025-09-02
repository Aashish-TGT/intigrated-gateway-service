import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import createError from 'http-errors';
import config from './config/index.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (config.env === 'development') app.use(morgan('dev'));
app.use(apiRateLimiter);

app.get('/health', (req, res) => res.json({ status: 'ok', ts: Date.now() }));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => next(createError(404, 'Not Found')));
app.use(errorHandler);

export default app;
