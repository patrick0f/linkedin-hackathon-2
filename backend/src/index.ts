import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/users';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'LinkedIn Hackathon API is running',
    version: '1.0.0',
    endpoints: {
      root: '/',
      users: '/api/users',
      userById: '/api/users/:id',
    },
    documentation: {
      users: {
        get: 'GET /api/users - Get all users',
        getById: 'GET /api/users/:id - Get user by ID',
        update: 'PUT /api/users/:id - Update user by ID'
      }
    }
  });
});

// Routes
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 