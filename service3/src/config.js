import 'dotenv/config';
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '8080', 10),
  asb: {
    connectionString: process.env.ASB_CONNECTION_STRING,
    queueName: process.env.ASB_QUEUE_NAME
  },
  paths: {
    receiptsDir: path.join(__dirname, "../receipts"),
    templatesDir: path.join(__dirname, "../templates")
  },
  puppeteerExecutablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null
};
