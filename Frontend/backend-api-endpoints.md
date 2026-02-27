# Backend API Endpoints for Event Registration

## Event Registration API

### POST /api/events/register

Registers a user for an event.

#### Request Headers
```
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

#### Request Body
```json
{
  "eventId": 1,
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "age": "25",
  "address": "123 Main St, Indore",
  "emergencyContact": "+91 98765 43211",
  "specialRequirements": "Wheelchair access needed"
}
```

#### Response (Success - 200)
```json
{
  "success": true,
  "message": "Registration successful",
  "registrationId": "reg_123456",
  "eventId": 1,
  "eventName": "Rangoli Utsav"
}
```

#### Response (Error - 400)
```json
{
  "success": false,
  "message": "Validation error: Email is required"
}
```

#### Response (Error - 401)
```json
{
  "success": false,
  "message": "Unauthorized: Invalid token"
}
```

#### Response (Error - 500)
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Database Schema

### Event Registrations Collection
```javascript
{
  _id: ObjectId,
  registrationId: String, // Unique registration ID
  eventId: Number, // Event ID
  userId: ObjectId, // User ID from users collection
  eventName: String, // Event name for reference
  fullName: String, // Registrant's full name
  email: String, // Registrant's email
  phone: String, // Registrant's phone
  age: String, // Registrant's age
  address: String, // Registrant's address
  emergencyContact: String, // Emergency contact
  specialRequirements: String, // Special requirements
  registrationDate: Date, // Registration timestamp
  status: String, // "confirmed", "pending", "cancelled"
  createdAt: Date,
  updatedAt: Date
}
```

## Frontend Implementation Notes

### Authentication
- JWT token stored in localStorage as 'token'
- Token sent in Authorization header for all API calls

### Error Handling
- Form validation before API call
- Toast notifications for user feedback
- Fallback to localStorage for demo purposes

### Data Flow
1. User fills registration form
2. Frontend validates form data
3. API call to backend with authentication
4. Backend validates and saves to database
5. Success response with confirmation
6. Frontend shows confirmation page

## Security Considerations
- JWT token validation
- Input sanitization
- Rate limiting for registration attempts
- HTTPS for API communication
