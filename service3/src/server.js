import express from 'express';
import morgan from 'morgan';
import { security } from './middleware/security.js';
import { router } from './routes.js';
 const app = express();

export async function createServer() {
 

  app.use(express.json());
  app.use(morgan('dev'));

  app.use(express.json({ limit: '1mb' }));
  app.use(morgan('tiny'));
  security(app);
  app.use('/api', router);

  // health
  app.get('/health', (_req, res) => res.json({ ok: true }));

  // 404
  app.use((_req, res) => res.status(404).json({ error: 'Not Found' }));

  // error
  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

//   app.use("/", routes);

  return app;
}
