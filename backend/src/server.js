import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB, closeDB } from './config/database.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
    } else {
      console.warn('⚠️ Warning: MONGODB_URI is not configured in .env. MongoDB connection skipped for initial launch.');
    }

    const server = app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });

    const shutdown = async (signal) => {
      console.log(`${signal} signal received: closing HTTP server`);
      server.close(async () => {
        await closeDB();
        console.log('HTTP server and database connections closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();

