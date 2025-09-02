import mongoose from 'mongoose';
import config from '../config/index.js';

export const connectDB = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(config.mongoUri);
  return mongoose.connection;
};
