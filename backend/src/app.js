import express from 'express';
import cors from 'cors';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import scenarioRoutes from './routes/scenarioRoutes.js';

const app = express();

// Configure CORS
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    // Allow configured origin
    if (origin === allowedOrigin || allowedOrigin === '*') {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Body parsing with size limit
app.use(express.json({ limit: '1mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running'
  });
});

// API Routes
app.use('/api/scenarios', scenarioRoutes);

// Centralized 404 handler for unknown routes
app.use(notFoundHandler);

// Centralized error handler
app.use(errorHandler);

export default app;
