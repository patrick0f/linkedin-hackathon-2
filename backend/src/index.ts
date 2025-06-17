import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/users';
import postRoutes from './routes/posts';
import chatgptRoutes from './routes/chatgpt';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

// Enable CORS for the frontend
app.use(cors({
  origin: ['http://localhost:8081', 'http://localhost:8082'], // Allow both ports
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Parse JSON bodies
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
      chatgpt: '/api/chatgpt/process-matches',
    },
    documentation: {
      users: {
        get: 'GET /api/users - Get all users',
        getById: 'GET /api/users/:id - Get user by ID',
        update: 'PUT /api/users/:id - Update user by ID'
      },
      chatgpt: {
        processMatches: 'POST /api/chatgpt/process-matches - Process matching users with ChatGPT',
        generateConversationStarter: 'POST /api/chatgpt/generate-conversation-starter - Generate conversation starter for coffee chats',
        generateDMStarter: 'POST /api/chatgpt/generate-dm-starter - Generate DM conversation starter'
      }
    }
  });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/chatgpt', chatgptRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 