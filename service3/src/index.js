import express from 'express';
import morgan from 'morgan';
import { router } from './routes.js';
import { config } from './config.js';
import { initRegistry } from './services/templateRegistry.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Mount routes
app.use('/', router);

// Initialize templates once at startup
initRegistry().catch(err => console.error('template registry init failed', err));

app.listen(config.port, () => {
  console.log(`[receipt-service] listening on :${config.port}`);
});
