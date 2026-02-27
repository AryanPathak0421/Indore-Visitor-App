# Visit Indore Hub Backend

This backend server provides API endpoints for the Visit Indore Hub application.

## Features

- **Authentication**: User signup and login with JWT tokens
- **Hotels**: Hotel listings and management
- **Bookings**: Tourist attraction bookings with QR code generation
- **Chat**: AI-powered travel assistant (currently using mock responses)

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Hotels
- `GET /api/hotels` - Get all hotels
- `POST /api/hotels` - Add new hotel (admin)

### Bookings
- `POST /api/booking/create` - Create new booking
- `GET /api/booking/user/:userId` - Get user bookings

### Chat
- `POST /api/chat/ask` - Ask travel assistant questions

## Environment Variables

Create a `.env` file with:

```env
MONGO_CONN=mongodb+srv://your-connection-string
MONGO_LOCAL=mongodb://localhost:27017/visit-indore
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
GEMINI_API_KEY=your-gemini-api-key
FRONTEND_URL=https://indore-visitors-app.netlify.app
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`

3. Start the server:
```bash
npm start
```

For development:
```bash
npm run dev
```

## Deployment

### Deploy to Render

1. Push this code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Set environment variables in Render dashboard
5. Deploy

The server will be available at: `https://your-app-name.onrender.com`

## Chat API Configuration

The chat endpoint currently uses mock responses about Indore. To enable real AI responses:

1. Get a Gemini API key from Google AI Studio
2. Enable the Gemini API in your Google Cloud Console
3. Add the API key to your environment variables
4. The system will automatically use real AI responses when the API key is valid

## Security

- API keys are stored securely in environment variables
- CORS is configured to only allow your frontend domain
- JWT tokens are used for authentication
- File uploads are validated and stored securely
