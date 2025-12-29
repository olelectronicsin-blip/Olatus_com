# MongoDB Compass Integration - Complete Setup Guide 🚀

## ✅ What Has Been Integrated

Your **Olatus.com** project now has a **fully integrated MongoDB database** with comprehensive models for all your services!

### 📦 New Database Models Created:

#### 1. **ServiceRequest Model** (`service-request.model.ts`)
Handles all service orders:
- **PCB Fabrication** (layers, material, finish, quantity)
- **PCB Assembly** 
- **PCB Design**
- **3D Printing** (material, color, infill, dimensions)
- **Web Development** (features, pages, timeline)
- **Embedded Software**
- **Lab Setup**
- **Product Development**

**Features:**
- Customer information (name, email, phone, company)
- Project details & specifications (flexible JSON structure)
- File management (Gerber files, STL files, designs)
- Order status tracking (pending → delivered)
- Payment tracking (unpaid, partial, paid, refunded)
- Pricing (estimated, quoted, final)
- Order notes & comments
- Priority levels (low, medium, high, urgent)

#### 2. **InternshipApplication Model** (`InternshipApplication.ts`)
Complete internship application system:
- Personal & educational details
- Position types (Web Dev, Embedded, PCB Design, etc.)
- Skills, programming languages, tools
- Resume & portfolio uploads
- Project showcase
- Application status (applied → accepted/rejected)
- Interview scheduling & scoring
- Technical assignments
- References

### 🎯 API Endpoints Created:

#### Service Requests:
```
POST   /api/service-requests              - Submit new service request
GET    /api/service-requests              - Get all requests (Admin)
GET    /api/service-requests/:id          - Get request by ID (Admin)
GET    /api/service-requests/email/:email - Get requests by customer email
PATCH  /api/service-requests/:id/status   - Update status (Admin)
PATCH  /api/service-requests/:id/pricing  - Update pricing (Admin)
POST   /api/service-requests/:id/notes    - Add note (Admin)
DELETE /api/service-requests/:id          - Delete request (Admin)
```

#### Internship Applications:
```
POST   /api/internships/apply                      - Submit application
GET    /api/internships/applications               - Get all applications (Admin)
GET    /api/internships/applications/:id           - Get application by ID (Admin)
PATCH  /api/internships/applications/:id/status    - Update status (Admin)
GET    /api/internships/statistics                 - Get statistics (Admin)
```

### 📊 Existing Models (Already in project):
- **User** - Authentication & user management
- **Project** - Portfolio projects
- **Contact** - Contact form submissions
- **Analytics** - Website analytics tracking

---

## 🛠️ Setup Instructions

### Step 1: Install MongoDB Compass

**Download MongoDB Compass** (FREE):
- Visit: https://www.mongodb.com/try/download/compass
- Download for Windows
- Install and open MongoDB Compass

**OR use MongoDB Community Server:**
- Visit: https://www.mongodb.com/try/download/community
- Install MongoDB Server (runs in background)

### Step 2: Start MongoDB

#### Option A: Using MongoDB Compass
1. Open MongoDB Compass
2. Click "New Connection"
3. Use connection string: `mongodb://localhost:27017`
4. Click "Connect"

#### Option B: Using MongoDB Service (Windows)
```powershell
# Start MongoDB service
net start MongoDB
```

### Step 3: Connect to Database

In MongoDB Compass:
1. After connecting to `localhost:27017`
2. You'll see `olatus` database created automatically when server starts
3. Collections will appear after running seed script

### Step 4: Seed the Database

Run this command to populate database with sample data:

```powershell
cd "E:\Olatus Official\olatus_com\Server"
npm run seed
```

This will create:
- ✅ Admin user
- ✅ 3 Sample projects
- ✅ 3 Sample service requests (PCB, 3D Printing, Web Dev)
- ✅ 2 Sample internship applications

### Step 5: Start the Server

```powershell
cd "E:\Olatus Official\olatus_com\Server"
npm run dev
```

Server will run at: **http://localhost:5000**

---

## 📱 MongoDB Compass Usage

### View Collections:
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Click on `olatus` database
4. You'll see these collections:
   - `users` - User accounts
   - `projects` - Portfolio projects
   - `contacts` - Contact submissions
   - `servicerequests` - All service orders
   - `internshipapplications` - Internship applications
   - `analytics` - Website analytics

### Query Examples:

**Find all PCB orders:**
```json
{ "serviceType": "PCB_FABRICATION" }
```

**Find pending service requests:**
```json
{ "status": "pending" }
```

**Find accepted internship applications:**
```json
{ "status": "accepted" }
```

**Find high priority orders:**
```json
{ "priority": "high" }
```

### Add New Service Request (Test):

Use MongoDB Compass "Insert Document":
```json
{
  "serviceType": "PCB_FABRICATION",
  "status": "pending",
  "customerName": "Test Customer",
  "email": "test@example.com",
  "phone": "+91 98765 43210",
  "projectName": "Test PCB Project",
  "description": "Test PCB description",
  "specifications": {
    "layers": 2,
    "material": "FR4",
    "quantity": 10
  },
  "paymentStatus": "unpaid",
  "priority": "medium",
  "files": [],
  "orderNotes": []
}
```

---

## 🔐 Admin Login Credentials

After seeding, login to admin panel:
- **Email:** `admin@olatus.com`
- **Password:** `Admin@Olatus2024!`

---

## 📊 Database Schema Overview

### ServiceRequest Schema
```typescript
{
  serviceType: 'PCB_FABRICATION' | '3D_PRINTING' | 'WEB_DEVELOPMENT' | etc.,
  status: 'pending' | 'under_review' | 'in_progress' | 'completed' | etc.,
  customerName: String,
  email: String,
  phone: String,
  company: String (optional),
  projectName: String,
  description: String,
  specifications: Object (flexible structure),
  files: Array<{ fileName, fileUrl, fileType, uploadedAt }>,
  quotedPrice: Number,
  finalPrice: Number,
  paymentStatus: 'unpaid' | 'paid' | 'partial' | 'refunded',
  priority: 'low' | 'medium' | 'high' | 'urgent',
  orderNotes: Array<{ note, addedBy, addedAt }>,
  estimatedDeliveryDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### InternshipApplication Schema
```typescript
{
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  institution: String,
  degree: String,
  fieldOfStudy: String,
  graduationYear: Number,
  cgpa: Number,
  position: 'WEB_DEVELOPMENT' | 'EMBEDDED_SYSTEMS' | etc.,
  internshipType: 'remote' | 'onsite' | 'hybrid',
  skills: Array<String>,
  programmingLanguages: Array<String>,
  resume: { fileName, fileUrl, uploadedAt },
  portfolio: { fileUrl, type },
  projects: Array<{ projectName, description, technologies }>,
  status: 'applied' | 'shortlisted' | 'accepted' | 'rejected',
  appliedAt: Date,
  interviewDate: Date,
  notes: Array<{ note, addedBy, addedAt }>
}
```

---

## 🎨 Client-Side Integration Example

To submit a service request from your client:

```typescript
// Example: Submit PCB Order
const submitPCBOrder = async (formData) => {
  const response = await fetch('http://localhost:5000/api/service-requests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      serviceType: 'PCB_FABRICATION',
      customerName: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectName: formData.projectName,
      description: formData.description,
      specifications: {
        layers: formData.layers,
        material: formData.material,
        quantity: formData.quantity,
        dimensions: formData.dimensions
      }
    })
  });
  
  const result = await response.json();
  return result;
};
```

---

## 🔍 Testing the Integration

### Test Service Request Creation:
```powershell
# Using PowerShell
$body = @{
    serviceType = "3D_PRINTING"
    customerName = "John Doe"
    email = "john@example.com"
    phone = "+91 98765 43210"
    projectName = "Robot Part"
    description = "3D print robot chassis"
    specifications = @{
        material = "PLA"
        color = "Black"
        quantity = 1
    }
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/service-requests" -Method POST -Body $body -ContentType "application/json"
```

### Check Server Health:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health"
```

---

## 📈 Next Steps

1. ✅ **MongoDB Running** - Check MongoDB Compass shows connection
2. ✅ **Server Started** - Visit http://localhost:5000/health
3. ✅ **Database Seeded** - Run `npm run seed` in Server directory
4. ✅ **Verify Data** - Check collections in MongoDB Compass
5. 🔄 **Client Integration** - Update client forms to use new API endpoints
6. 🔄 **Admin Panel** - Update admin dashboard to show service requests

---

## 🆘 Troubleshooting

### MongoDB Connection Failed:
```powershell
# Start MongoDB service
net start MongoDB

# Or install MongoDB if not installed
# Download from: https://www.mongodb.com/try/download/community
```

### Server Won't Start:
```powershell
# Check .env file exists
Get-Content "E:\Olatus Official\olatus_com\Server\.env"

# Install dependencies
npm install

# Check MongoDB is running
Test-NetConnection -ComputerName localhost -Port 27017
```

### Seed Script Fails:
```powershell
# Make sure MongoDB is running first
# Then run seed with verbose output
npm run seed
```

---

## 📝 Important Notes

- ⚠️ **NO existing code was modified** - All additions are new files
- ✅ **All existing routes work** as before
- ✅ **New routes added** for service requests & internships
- ✅ **Database models** are production-ready with indexes
- ✅ **Flexible specifications** field allows any service-specific data
- ✅ **File upload support** built-in (URLs stored in database)
- ✅ **Admin authentication** required for sensitive operations

---

## 🎉 You're All Set!

Your MongoDB database is now perfectly integrated with:
- ✅ Flexible service request system
- ✅ Complete internship application tracking
- ✅ Order management & status tracking
- ✅ Payment tracking
- ✅ File management
- ✅ Admin controls

**No code was removed or changed - only additions!**
