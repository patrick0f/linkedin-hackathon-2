# LinkedIn Spark 

AI-powered networking features and smart coffee-chat scheduling!

## Features

- Points-based exploratory rewards system
- 🤖 AI-powered networking suggestions
- 📅 Smart coffee chat scheduling
- 🎯 Personalized conversation starters
- 📊 Availability matching system

## Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Supabase Account](https://supabase.com/) (for database)
- [OpenAI API Key](https://platform.openai.com/) (for AI features)

## Project Structure

```
linkedin-hackathon-2/
├── frontend/                  # React Native Expo app
│   ├── components/           # React Native components
│   │   ├── BottomNavigation.tsx    # Bottom navigation bar
│   │   ├── ChatDetail.tsx          # Direct messaging interface
│   │   ├── CoffeeChats.tsx         # Coffee chat matching system
│   │   ├── CoffeeChatScheduler.tsx # Scheduling interface
│   │   ├── Feed.tsx                # Main feed component
│   │   ├── Header.tsx              # App header
│   │   ├── Messages.tsx            # Messages list view
│   │   ├── PointsPopup.tsx         # Points notification
│   │   ├── Post.tsx                # Individual post component
│   │   ├── ProfileOverlay.tsx      # User profile view
│   │   └── ...                     # Other UI components
│   │
│   ├── services/             # API and service integrations
│   │   └── api.ts                  # Backend API integration
│   │
│   ├── lib/                 # Utility functions and helpers
│   │   ├── storage.ts             # Local storage management
│   │   ├── supabase.ts           # Supabase configuration
│   │   └── timeUtils.ts          # Time handling utilities
│   │
│   ├── styles/              # Component styles
│   ├── contexts/            # React contexts
│   ├── assets/              # Images and static assets
│   └── App.tsx              # Main application entry
│
└── backend/                  # Express.js server
    ├── src/
    │   ├── routes/          # API endpoints
    │   │   ├── chatgpt.ts         # AI integration routes
    │   │   ├── posts.ts           # Post management
    │   │   └── users.ts           # User management
    │   │
    │   ├── types/           # TypeScript type definitions
    │   ├── config/          # Server configuration
    │   └── index.ts         # Server entry point
    │
    └── dist/                # Compiled TypeScript output
```

### Key Components

- **CoffeeChats**: Manages the coffee chat matching system and availability
- **ChatDetail**: Handles direct messaging and video call features
- **CoffeeChatScheduler**: Coordinates scheduling and calendar integration
- **Feed**: Displays the main content feed with posts and updates
- **Points System**: Manages the rewards and points tracking

### Backend Services

- **ChatGPT Integration**: AI-powered conversation starters and matching
- **User Management**: Profile handling and authentication
- **Post Management**: Content creation and interaction
- **Scheduling API**: Calendar coordination and availability matching

### Data Management

- **Supabase**: Database and real-time features
- **Local Storage**: Caching and offline capabilities
- **Time Management**: Scheduling and availability tracking

## Environment Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   PORT=3000
   OPENAI_API_KEY=your_openai_api_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Start the Backend Server

1. In the backend directory:
   ```bash
   # For development
   npm run dev

   # For production
   npm run build
   npm start
   ```

The server will start on `http://localhost:3000`

### Start the Frontend Application

1. In the frontend directory:
   ```bash
   # Start Expo development server
   npm start
   ```

2. Choose your platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser
   - Scan QR code with Expo Go app for physical device

## Testing

### Backend Tests

Currently, the backend testing infrastructure is set up but needs implementation. To run tests (once implemented):

```bash
cd backend
npm test
```

### Frontend Tests

The frontend uses Expo's testing utilities. To run tests (once implemented):

```bash
cd frontend
npm test
```

## Deployment

### Backend Deployment

1. Build the TypeScript code:
   ```bash
   cd backend
   npm run build
   ```

2. Deploy the `dist` folder to your preferred hosting service (e.g., Heroku, AWS, or Google Cloud Platform).

### Frontend Deployment

1. Build the Expo app:
   ```bash
   cd frontend
   expo build:android  # For Android
   # or
   expo build:ios      # For iOS
   ```

2. Follow the Expo build process and download the built application.

3. Submit to respective app stores:
   - [Google Play Console](https://play.google.com/console) for Android
   - [App Store Connect](https://appstoreconnect.apple.com) for iOS

## Development Guidelines

- Follow the TypeScript type definitions
- Use ESLint for code linting
- Follow the component structure in frontend
- Keep API routes organized in backend
- Document new features and API endpoints

## Troubleshooting

Common issues and solutions:

1. **Backend Connection Issues**
   - Verify `.env` file configuration
   - Check if the backend server is running
   - Confirm port availability

2. **Frontend Build Issues**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall
   - Update Expo CLI

3. **Database Connection**
   - Verify Supabase credentials
   - Check database access permissions
   - Confirm network connectivity

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request