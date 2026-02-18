# API Documentation

## Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-backend-url.render.com/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format

### Success Response
```json
{
  "data": {},
  "message": "Success message"
}
```

### Error Response
```json
{
  "message": "Error message",
  "errors": []
}
```

## Endpoints

### Authentication

#### POST /auth/signup
Register a new user

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

**Validation:**
- `name`: Required, not empty
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters

---

#### POST /auth/login
Login existing user

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

**Errors:**
- 400: Invalid credentials
- 400: Validation errors

---

#### GET /auth/profile
Get current user profile (Protected)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "student",
  "progress": {
    "year1": { "completed": 2, "total": 4 },
    "year2": { "completed": 0, "total": 4 },
    "year3": { "completed": 0, "total": 4 }
  },
  "completedTopics": [],
  "certificates": [],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

### Progress

#### GET /progress
Get user progress (Protected)

**Response (200):**
```json
{
  "progress": {
    "year1": { "completed": 2, "total": 4 },
    "year2": { "completed": 0, "total": 4 },
    "year3": { "completed": 0, "total": 4 }
  },
  "completedTopics": [
    {
      "topicId": "python",
      "completedAt": "2024-01-15T00:00:00.000Z"
    }
  ],
  "weeklyPlanner": [
    {
      "week": "Week 1",
      "tasks": [
        { "name": "Learn", "completed": true },
        { "name": "Practice", "completed": false }
      ]
    }
  ]
}
```

---

#### POST /progress/update
Mark topic as complete (Protected)

**Request Body:**
```json
{
  "topicId": "python",
  "year": 1
}
```

**Response (200):**
```json
{
  "message": "Progress updated successfully",
  "progress": {
    "year1": { "completed": 3, "total": 4 },
    "year2": { "completed": 0, "total": 4 },
    "year3": { "completed": 0, "total": 4 }
  },
  "completedTopics": [
    {
      "topicId": "python",
      "completedAt": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

---

#### POST /progress/weekly-planner
Update weekly planner (Protected)

**Request Body:**
```json
{
  "week": "Week 1",
  "tasks": [
    { "name": "Learn", "completed": true },
    { "name": "Practice", "completed": false },
    { "name": "Project", "completed": false },
    { "name": "Revision", "completed": false },
    { "name": "Weekly Test", "completed": false }
  ]
}
```

**Response (200):**
```json
{
  "message": "Weekly planner updated successfully",
  "weeklyPlanner": [...]
}
```

---

#### POST /progress/certificate
Generate certificate (Protected)

**Request Body:**
```json
{
  "year": 1
}
```

**Response (200):**
```json
{
  "message": "Certificate generated successfully",
  "certificate": {
    "certificateId": "QV-1-439011-1704067200000",
    "name": "John Doe",
    "year": 1,
    "generatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Roadmap

#### GET /roadmap
Get all roadmaps (Public)

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "year": 1,
    "title": "Year 1 — Foundations",
    "description": "Build strong foundations in Python, Mathematics, and Quantum Physics",
    "topics": [
      {
        "id": "python",
        "title": "Python Programming",
        "duration": "Months 1-2",
        "description": "Master Python fundamentals including NumPy, Pandas, and Matplotlib",
        "resources": [
          {
            "title": "Python Official Documentation",
            "url": "https://www.python.org/doc/",
            "type": "documentation"
          }
        ],
        "projects": ["Data Analysis Project"],
        "order": 1
      }
    ]
  }
]
```

---

#### GET /roadmap/:year
Get roadmap by year (Public)

**Parameters:**
- `year`: 1, 2, or 3

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "year": 1,
  "title": "Year 1 — Foundations",
  "description": "Build strong foundations...",
  "topics": [...]
}
```

**Errors:**
- 404: Roadmap not found

---

#### POST /roadmap
Create new roadmap (Admin only)

**Request Body:**
```json
{
  "year": 1,
  "title": "Year 1 — Foundations",
  "description": "Build strong foundations...",
  "topics": [...]
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "year": 1,
  "title": "Year 1 — Foundations",
  ...
}
```

---

#### PUT /roadmap/:id
Update roadmap (Admin only)

**Parameters:**
- `id`: Roadmap ID

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  ...
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "year": 1,
  "title": "Updated Title",
  ...
}
```

---

#### DELETE /roadmap/:id
Delete roadmap (Admin only)

**Parameters:**
- `id`: Roadmap ID

**Response (200):**
```json
{
  "message": "Roadmap deleted successfully"
}
```

---

## Error Codes

- **400**: Bad Request - Invalid input data
- **401**: Unauthorized - Missing or invalid token
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Resource not found
- **500**: Internal Server Error - Server error

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting for production use.

## CORS

CORS is enabled for all origins in development. Configure appropriately for production.

## Testing

Use tools like Postman or curl to test the API:

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get Profile (with token)
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
