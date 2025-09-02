import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: process.env.PORT || 8086,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || 'devsecret',
  jwtExpires: process.env.JWT_EXPIRES || '7d',
  azure: {
    key: process.env.AZURE_SPEECH_KEY,
    region: process.env.AZURE_SPEECH_REGION
  },
  whisper: {
    key: process.env.WHISPER_API_KEY
  },
  uploadsDir: new URL('../uploads/', import.meta.url).pathname
};
