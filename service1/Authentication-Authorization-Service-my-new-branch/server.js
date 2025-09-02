import { createServer } from 'http';
import app from './src/app.js';
import config from './src/config/index.js';
import { connectDB } from './src/db/connection.js';

const server = createServer(app);

const start = async () => {
  try {
    await connectDB();

    server.listen(config.port, () => {
      /* eslint-disable no-console */
      console.log(`Auth service listening on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
};

start();
