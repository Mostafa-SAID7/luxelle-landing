# Luxelle API Documentation

## Overview

The Luxelle API is a RESTful service for managing beauty and wellness services, user accounts, and bookings. The API is built with .NET 8 and uses Entity Framework Core with Turso (LibSQL) database.

**Base URL**: `https://your-vercel-backend-url.vercel.app`

**API Version**: v1

**Documentation**: Available at `/swagger` endpoint

---

## Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible.

**Future Enhancement**: JWT authentication will be added for production.

---

## Response Format

All responses are in JSON format.

### Success Response (200 OK)
```json
{
  "id": 1,
  "name": "Luxury Facial",
  "description": "Deep cleansing facial with premium serums",
  "category": "Skincare",
  "price": 120.00,
  "durationMinutes": 60,
  "isAvailable": true
}
```

### Error Response (4xx/5xx)
```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "Bad Request",
  "status": 400,
  "detail": "Invalid input provided"
}
```

---

## Endpoints

### Users API

#### Get All Users
```
GET /api/users
```

**Response**: `200 OK`
```json
[
  {
    "id": 1,
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  }
]
```

---

#### Get User by ID
```
GET /api/users/{id}
```

**Parameters**:
- `id` (path, required): User ID

**Response**: `200 OK` or `404 Not Found`

---

#### Create User
```
POST /api/users
Content-Type: application/json
```

**Request Body**:
```json
{
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890"
}
```

**Response**: `201 Created`
```json
{
  "id": 2,
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890"
}
```

---

#### Update User
```
PUT /api/users/{id}
Content-Type: application/json
```

**Parameters**:
- `id` (path, required): User ID

**Request Body**:
```json
{
  "fullName": "Jane Smith Updated",
  "email": "jane.updated@example.com",
  "phone": "+9876543210"
}
```

**Response**: `200 OK` or `404 Not Found`

---

#### Delete User
```
DELETE /api/users/{id}
```

**Parameters**:
- `id` (path, required): User ID

**Response**: `204 No Content` or `404 Not Found`

---

### Services API

#### Get All Services
```
GET /api/services
```

**Response**: `200 OK`
```json
[
  {
    "id": 1,
    "name": "Luxury Facial",
    "description": "Deep cleansing facial with premium serums",
    "category": "Skincare",
    "price": 120.00,
    "durationMinutes": 60,
    "isAvailable": true
  },
  {
    "id": 2,
    "name": "Swedish Massage",
    "description": "Full body relaxation massage",
    "category": "Massage",
    "price": 90.00,
    "durationMinutes": 60,
    "isAvailable": true
  }
]
```

---

#### Get Available Services
```
GET /api/services/available
```

**Response**: `200 OK` - Returns only services with `isAvailable: true`

---

#### Get Services by Category
```
GET /api/services/category/{category}
```

**Parameters**:
- `category` (path, required): Service category (e.g., "Skincare", "Massage", "Nails", "Hair")

**Response**: `200 OK`

---

#### Get Service by ID
```
GET /api/services/{id}
```

**Parameters**:
- `id` (path, required): Service ID

**Response**: `200 OK` or `404 Not Found`

---

#### Create Service
```
POST /api/services
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "Premium Spa Package",
  "description": "Complete relaxation package",
  "category": "Spa",
  "price": 250.00,
  "durationMinutes": 120,
  "isAvailable": true
}
```

**Response**: `201 Created`

---

#### Update Service
```
PUT /api/services/{id}
Content-Type: application/json
```

**Parameters**:
- `id` (path, required): Service ID

**Request Body**: Same as Create Service

**Response**: `200 OK` or `404 Not Found`

---

#### Delete Service
```
DELETE /api/services/{id}
```

**Parameters**:
- `id` (path, required): Service ID

**Response**: `204 No Content` or `404 Not Found`

---

### Bookings API

#### Get All Bookings
```
GET /api/bookings
```

**Response**: `200 OK`
```json
[
  {
    "id": 1,
    "userId": 1,
    "serviceId": 1,
    "bookingDate": "2026-06-15T10:00:00Z",
    "status": "Confirmed"
  }
]
```

---

#### Get Booking by ID
```
GET /api/bookings/{id}
```

**Parameters**:
- `id` (path, required): Booking ID

**Response**: `200 OK` or `404 Not Found`

---

#### Get User's Bookings
```
GET /api/bookings/user/{userId}
```

**Parameters**:
- `userId` (path, required): User ID

**Response**: `200 OK` - Returns all bookings for the user

---

#### Get Bookings by Date Range
```
GET /api/bookings/range?from=2026-06-01&to=2026-06-30
```

**Query Parameters**:
- `from` (required): Start date (ISO 8601 format)
- `to` (required): End date (ISO 8601 format)

**Response**: `200 OK` - Returns bookings within the date range

---

#### Create Booking
```
POST /api/bookings
Content-Type: application/json
```

**Request Body**:
```json
{
  "userId": 1,
  "serviceId": 1,
  "bookingDate": "2026-06-15T10:00:00Z",
  "status": "Pending"
}
```

**Response**: `201 Created`

---

#### Update Booking
```
PUT /api/bookings/{id}
Content-Type: application/json
```

**Parameters**:
- `id` (path, required): Booking ID

**Request Body**:
```json
{
  "userId": 1,
  "serviceId": 1,
  "bookingDate": "2026-06-15T14:00:00Z",
  "status": "Confirmed"
}
```

**Response**: `200 OK` or `404 Not Found`

---

#### Delete Booking
```
DELETE /api/bookings/{id}
```

**Parameters**:
- `id` (path, required): Booking ID

**Response**: `204 No Content` or `404 Not Found`

---

## Health Check

#### Health Status
```
GET /health
```

**Response**: `200 OK`
```json
{
  "status": "healthy",
  "timestamp": "2026-05-31T12:00:00Z"
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 204 | No Content - Request successful, no content to return |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## Rate Limiting

Currently, no rate limiting is implemented. This will be added in future versions.

---

## CORS

The API allows requests from all origins. CORS headers are configured as follows:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## Database Schema

### Users Table
| Column | Type | Constraints |
|--------|------|-------------|
| Id | int | Primary Key |
| FullName | string(100) | Required |
| Email | string(150) | Required, Unique |
| Phone | string(20) | Optional |

### Services Table
| Column | Type | Constraints |
|--------|------|-------------|
| Id | int | Primary Key |
| Name | string(100) | Required |
| Description | string | Optional |
| Category | string(50) | Required |
| Price | decimal(10,2) | Required |
| DurationMinutes | int | Required |
| IsAvailable | bool | Required |

### Bookings Table
| Column | Type | Constraints |
|--------|------|-------------|
| Id | int | Primary Key |
| UserId | int | Foreign Key (Users) |
| ServiceId | int | Foreign Key (Services) |
| BookingDate | datetime | Required |
| Status | string | Required |

---

## Sample Data

The database is pre-populated with 4 sample services:

1. **Luxury Facial** - $120, 60 min, Skincare
2. **Swedish Massage** - $90, 60 min, Massage
3. **Manicure & Pedicure** - $75, 90 min, Nails
4. **Hair Treatment** - $85, 75 min, Hair

---

## Testing

### Using Swagger UI
1. Navigate to `/swagger`
2. Expand any endpoint
3. Click "Try it out"
4. Enter parameters and click "Execute"

### Using cURL

**Get all services**:
```bash
curl -X GET "https://your-backend-url/api/services" \
  -H "Content-Type: application/json"
```

**Create a user**:
```bash
curl -X POST "https://your-backend-url/api/users" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  }'
```

**Create a booking**:
```bash
curl -X POST "https://your-backend-url/api/bookings" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "serviceId": 1,
    "bookingDate": "2026-06-15T10:00:00Z",
    "status": "Pending"
  }'
```

---

## Support

For issues or questions:
- Check the Swagger documentation at `/swagger`
- Review the GitHub repository: https://github.com/Mostafa-SAID7/luxelle-landing
- Contact support at support@luxelle.com

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | May 31, 2026 | Initial release |

---

## License

MIT License - See LICENSE file for details
