# API Endpoints Reference - MongoDB Integration

## Base URL
```
http://localhost:5000/api
```

---

## 🔧 Service Requests API

### 1. Create Service Request (Public)
**POST** `/service-requests`

Submit a new service order (PCB, 3D Printing, Web Dev, etc.)

**Request Body:**
```json
{
  "serviceType": "PCB_FABRICATION",
  "customerName": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "company": "TechCorp",
  "projectName": "IoT Gateway PCB",
  "description": "4-layer PCB for IoT gateway device",
  "specifications": {
    "layers": 4,
    "material": "FR4",
    "thickness": "1.6mm",
    "quantity": 50,
    "dimensions": "100mm x 80mm"
  }
}
```

**Service Types:**
- `PCB_FABRICATION`
- `PCB_ASSEMBLY`
- `PCB_DESIGN`
- `3D_PRINTING`
- `WEB_DEVELOPMENT`
- `EMBEDDED_SOFTWARE`
- `LAB_SETUP`
- `PRODUCT_DEVELOPMENT`

**Response:**
```json
{
  "success": true,
  "message": "Service request submitted successfully",
  "data": { /* created service request */ }
}
```

---

### 2. Get Service Requests by Email (Public)
**GET** `/service-requests/email/:email`

Get all service requests for a specific customer email.

**Example:**
```
GET /service-requests/email/john@example.com
```

**Response:**
```json
{
  "success": true,
  "data": [ /* array of service requests */ ],
  "count": 3
}
```

---

### 3. Get All Service Requests (Admin Only)
**GET** `/service-requests`

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Query Parameters:**
- `serviceType` - Filter by service type
- `status` - Filter by status (pending, in_progress, completed, etc.)
- `paymentStatus` - Filter by payment status
- `priority` - Filter by priority (low, medium, high, urgent)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - asc or desc (default: desc)

**Example:**
```
GET /service-requests?status=pending&priority=high&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [ /* array of service requests */ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

---

### 4. Get Service Request by ID (Admin Only)
**GET** `/service-requests/:id`

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": { /* service request details */ }
}
```

---

### 5. Update Service Request Status (Admin Only)
**PATCH** `/service-requests/:id/status`

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:**
```json
{
  "status": "in_progress",
  "note": "Started working on the order",
  "addedBy": "admin"
}
```

**Status Values:**
- `pending`
- `under_review`
- `quote_sent`
- `payment_pending`
- `in_progress`
- `quality_check`
- `completed`
- `delivered`
- `cancelled`

---

### 6. Update Pricing (Admin Only)
**PATCH** `/service-requests/:id/pricing`

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:**
```json
{
  "estimatedCost": 5000,
  "quotedPrice": 8500,
  "finalPrice": 8000
}
```

---

### 7. Add Note (Admin Only)
**POST** `/service-requests/:id/notes`

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:**
```json
{
  "note": "Customer requested express delivery",
  "addedBy": "admin"
}
```

---

### 8. Delete Service Request (Admin Only)
**DELETE** `/service-requests/:id`

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

---

## 🎓 Internship Applications API

### 1. Submit Internship Application (Public)
**POST** `/internships/apply`

**Request Body:**
```json
{
  "firstName": "Ankit",
  "lastName": "Verma",
  "email": "ankit@example.com",
  "phone": "+91 98765 43210",
  "currentLocation": "Bangalore, Karnataka",
  "institution": "IIT Delhi",
  "degree": "B.Tech",
  "fieldOfStudy": "Computer Science",
  "graduationYear": 2025,
  "currentYear": "3rd Year",
  "cgpa": 8.5,
  "position": "WEB_DEVELOPMENT",
  "preferredStartDate": "2025-06-01",
  "duration": "3 months",
  "internshipType": "onsite",
  "skills": ["React", "Node.js", "MongoDB"],
  "programmingLanguages": ["JavaScript", "Python", "Java"],
  "tools": ["Git", "VS Code", "Docker"],
  "resume": {
    "fileName": "ankit_resume.pdf",
    "fileUrl": "/uploads/resumes/ankit_resume.pdf"
  },
  "portfolio": {
    "fileUrl": "https://github.com/ankit",
    "type": "link"
  },
  "projects": [
    {
      "projectName": "E-Learning Platform",
      "description": "Full-stack e-learning platform",
      "technologies": ["React", "Node.js", "PostgreSQL"],
      "githubUrl": "https://github.com/ankit/elearning"
    }
  ],
  "githubUrl": "https://github.com/ankit",
  "linkedinUrl": "https://linkedin.com/in/ankit",
  "whyJoinUs": "Passionate about learning embedded systems..."
}
```

**Position Types:**
- `WEB_DEVELOPMENT`
- `EMBEDDED_SYSTEMS`
- `PCB_DESIGN`
- `PRODUCT_DESIGN`
- `3D_DESIGN`
- `IOT_DEVELOPMENT`
- `ROBOTICS`
- `FULL_STACK`
- `FRONTEND`
- `BACKEND`
- `MECHANICAL_DESIGN`
- `ELECTRONICS`

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": { /* created application */ }
}
```

---

### 2. Get All Applications (Admin Only)
**GET** `/internships/applications`

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Query Parameters:**
- `position` - Filter by position
- `status` - Filter by status
- `graduationYear` - Filter by graduation year
- `page` - Page number
- `limit` - Items per page
- `sortBy` - Sort field
- `sortOrder` - asc or desc

**Example:**
```
GET /internships/applications?position=WEB_DEVELOPMENT&status=shortlisted
```

---

### 3. Get Application by ID (Admin Only)
**GET** `/internships/applications/:id`

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

---

### 4. Update Application Status (Admin Only)
**PATCH** `/internships/applications/:id/status`

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:**
```json
{
  "status": "shortlisted",
  "note": "Excellent portfolio and projects",
  "addedBy": "admin"
}
```

**Status Values:**
- `applied`
- `screening`
- `shortlisted`
- `interview_scheduled`
- `interviewed`
- `accepted`
- `rejected`
- `withdrawn`

---

### 5. Get Statistics (Admin Only)
**GET** `/internships/statistics`

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalApplications": 156,
    "byStatus": [
      { "_id": "applied", "count": 45 },
      { "_id": "shortlisted", "count": 23 },
      { "_id": "accepted", "count": 12 }
    ],
    "byPosition": [
      { "_id": "WEB_DEVELOPMENT", "count": 67 },
      { "_id": "EMBEDDED_SYSTEMS", "count": 45 }
    ],
    "recentApplications": [ /* last 10 applications */ ]
  }
}
```

---

## 🔐 Authentication

### Login (to get JWT token)
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "admin@olatus.com",
  "password": "Admin@Olatus2024!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "email": "admin@olatus.com",
      "name": "Admin User",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

Use this token in `Authorization: Bearer <token>` header for admin routes.

---

## 📝 Usage Examples

### Example 1: Submit PCB Order
```javascript
const submitPCBOrder = async () => {
  const response = await fetch('http://localhost:5000/api/service-requests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      serviceType: 'PCB_FABRICATION',
      customerName: 'Raj Kumar',
      email: 'raj@example.com',
      phone: '+91 98765 43210',
      projectName: 'Smart Home PCB',
      description: '2-layer PCB for smart home controller',
      specifications: {
        layers: 2,
        material: 'FR4',
        quantity: 100,
        dimensions: '50mm x 50mm'
      }
    })
  });
  
  return await response.json();
};
```

### Example 2: Submit 3D Printing Order
```javascript
const submit3DPrint = async () => {
  const response = await fetch('http://localhost:5000/api/service-requests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      serviceType: '3D_PRINTING',
      customerName: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 87654 32109',
      projectName: 'Drone Frame',
      description: '3D printed drone frame parts',
      specifications: {
        material: 'PLA',
        color: 'Black',
        quantity: 4,
        infill: '20%'
      }
    })
  });
  
  return await response.json();
};
```

### Example 3: Get Customer Orders
```javascript
const getMyOrders = async (email) => {
  const response = await fetch(
    `http://localhost:5000/api/service-requests/email/${email}`
  );
  return await response.json();
};
```

### Example 4: Submit Internship Application
```javascript
const applyInternship = async (formData) => {
  const response = await fetch('http://localhost:5000/api/internships/apply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      institution: formData.institution,
      degree: formData.degree,
      position: formData.position,
      skills: formData.skills,
      resume: {
        fileName: formData.resume.name,
        fileUrl: formData.resume.url
      }
      // ... other fields
    })
  });
  
  return await response.json();
};
```

---

## 🚀 PowerShell Testing Commands

### Test Service Request Creation:
```powershell
$body = @{
    serviceType = "PCB_FABRICATION"
    customerName = "Test User"
    email = "test@example.com"
    phone = "+91 98765 43210"
    projectName = "Test PCB"
    description = "Test description"
    specifications = @{
        layers = 2
        material = "FR4"
        quantity = 10
    }
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/service-requests" -Method POST -Body $body -ContentType "application/json"
```

### Get Orders by Email:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/service-requests/email/test@example.com"
```

### Test Health Endpoint:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health"
```

---

## ✅ Success!

Your MongoDB database is fully integrated with complete API endpoints for:
- ✅ Service requests (all services)
- ✅ Internship applications
- ✅ Order tracking
- ✅ Payment management
- ✅ Admin controls

**All endpoints are ready to use!** 🎉
