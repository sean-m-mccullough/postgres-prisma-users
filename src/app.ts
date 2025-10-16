import express from 'express';
import cors from 'cors';

import userRoutes from './api/users/users.routes';
import healthCheckRoutes from './api/health-check/health-check.routes';
import errorHandler from './middleware/errorHandler';


const app = express();

// health check route
app.use('/health', healthCheckRoutes)

// general middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/users', userRoutes);

// error handling middleware
app.use(errorHandler);

export default app;