# Backend API Endpoints for Chat System

## Chat API

### POST /api/chat/save

Saves chat messages to database.

#### Request Headers
```
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

#### Request Body
```json
{
  "userMessage": "What are the best places to visit in Indore?",
  "botResponse": "Indore has many amazing places like Rajwada Palace, Lal Bagh Palace, Khajrana Temple...",
  "timestamp": "2024-01-22T10:30:00.000Z"
}
```

#### Response (Success - 200)
```json
{
  "success": true,
  "message": "Chat saved successfully",
  "chatId": "chat_123456"
}
```

#### Response (Error - 400)
```json
{
  "success": false,
  "message": "Validation error: User message is required"
}
```

#### Response (Error - 401)
```json
{
  "success": false,
  "message": "Unauthorized: Invalid token"
}
```

### GET /api/chat/history

Retrieves chat history for logged-in user.

#### Request Headers
```
Authorization: Bearer <jwt_token>
```

#### Response (Success - 200)
```json
{
  "success": true,
  "chats": [
    {
      "_id": "64b1234567890abcdef123456",
      "userId": "64a1234567890abcdef123456",
      "userMessage": "What are the best places to visit?",
      "botResponse": "Indore has many amazing places...",
      "timestamp": "2024-01-22T10:30:00.000Z",
      "createdAt": "2024-01-22T10:30:00.000Z",
      "updatedAt": "2024-01-22T10:30:00.000Z"
    }
  ]
}
```

## Database Schema

### Chats Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // User ID from users collection
  userMessage: String, // User's message
  botResponse: String, // Bot's response
  timestamp: Date, // Chat timestamp
  sessionId: String, // Chat session identifier
  createdAt: Date,
  updatedAt: Date
}
```

## Frontend Implementation Notes

### Chat Features
- **Real-time Chat**: Instant responses from Gemini AI
- **Message History**: Previous chats saved and retrievable
- **Context Awareness**: Bot knows about Indore specifically
- **Persistent Storage**: All chats saved to database

### Data Flow
1. User sends message via chat interface
2. Frontend sends request to Gemini API
3. Bot response displayed in chat interface
4. Chat saved to backend database
5. History retrievable for future sessions

### Security Considerations
- JWT token validation for all requests
- Input sanitization for messages
- Rate limiting for API calls
- User-specific chat history isolation
- HTTPS for API communication

### Gemini API Integration
- **API Key**: Stored in environment variables
- **Model**: gemini-pro for best responses
- **Context**: Indore-specific travel information
- **Error Handling**: Fallback messages for API failures
