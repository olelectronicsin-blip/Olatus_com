import mongoose from 'mongoose';
import { logger } from './logger.js';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected');
});

export default mongoose;
