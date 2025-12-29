# 🚀 Quick Start - MongoDB Integration

## Step-by-Step Setup (5 Minutes)

### ✅ Step 1: Install MongoDB Compass
1. Download: https://www.mongodb.com/try/download/compass
2. Install MongoDB Compass (FREE)
3. Open MongoDB Compass
4. Click "New Connection"
5. Connection String: `mongodb://localhost:27017`
6. Click "Connect"

**Alternative:** Install MongoDB Community Server from https://www.mongodb.com/try/download/community

---

### ✅ Step 2: Start Server & Seed Database

Open PowerShell and run:

```powershell
# Navigate to Server folder
cd "E:\Olatus Official\olatus_com\Server"

# Install dependencies (if not already done)
npm install

# Seed the database with sample data
npm run seed

# Start the server
npm run dev
```

**Expected Output:**
```
MongoDB Connected: localhost
Admin user created: admin@olatus.com
Project created: IoT Smart Home System
Service request created: 4-Layer PCB for IoT Gateway
Internship application created: Ankit Verma
Database seed completed!
Server running on port 5000 in development mode
```

---

### ✅ Step 3: Verify in MongoDB Compass

1. In MongoDB Compass, you should see:
   - Database: **`olatus`**
   
2. Click on `olatus` database to see collections:
   - ✅ `users` - 1 admin user
   - ✅ `projects` - 3 sample projects
   - ✅ `servicerequests` - 3 sample orders
   - ✅ `internshipapplications` - 2 sample applications
   - ✅ `contacts` - (empty, ready for contact forms)
   - ✅ `analytics` - (empty, ready for analytics)

3. Click any collection to view data!

---

### ✅ Step 4: Test API Endpoints

#### Test 1: Health Check
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health"
```

**Expected:** `{ status: 'ok', timestamp: '...' }`

#### Test 2: Submit PCB Order
```powershell
$order = @{
    serviceType = "PCB_FABRICATION"
    customerName = "Test Customer"
    email = "test@example.com"
    phone = "+91 98765 43210"
    projectName = "My Test PCB"
    description = "Testing the MongoDB integration"
    specifications = @{
        layers = 2
        material = "FR4"
        quantity = 10
    }
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/service-requests" -Method POST -Body $order -ContentType "application/json"
```

**Expected:** Success message with created order data

#### Test 3: Get Orders by Email
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/service-requests/email/test@example.com"
```

**Expected:** List of orders for that email

---

### ✅ Step 5: Login as Admin

```powershell
$login = @{
    email = "admin@olatus.com"
    password = "Admin@Olatus2024!"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $login -ContentType "application/json"

# Save the token
$token = $response.data.token
Write-Host "Your admin token: $token"
```

Now you can use this token for admin endpoints!

---

## 🎯 What's Working Now?

### ✅ Service Orders:
- PCB Fabrication
- PCB Assembly  
- PCB Design
- 3D Printing
- Web Development
- Embedded Software
- Lab Setup
- Product Development

### ✅ Internship Applications:
- Submit applications
- Track status
- View applicant profiles
- Schedule interviews
- Rate candidates

### ✅ Admin Features:
- View all orders
- Update order status
- Manage pricing
- Track payments
- View applications
- Update application status

---

## 📊 View Data in MongoDB Compass

### Filter Examples:

**See only PCB orders:**
```json
{ "serviceType": "PCB_FABRICATION" }
```

**See pending orders:**
```json
{ "status": "pending" }
```

**See high priority orders:**
```json
{ "priority": "high" }
```

**See accepted internship applications:**
```json
{ "status": "accepted" }
```

---

## 🔗 Important URLs

- **Server:** http://localhost:5000
- **Health Check:** http://localhost:5000/health
- **API Base:** http://localhost:5000/api

---

## 📚 Full Documentation

- **`DATABASE_INTEGRATION_SUMMARY.md`** - Overview & features
- **`MONGODB_INTEGRATION_COMPLETE.md`** - Complete setup guide
- **`API_ENDPOINTS.md`** - Full API reference

---

## 🐛 Troubleshooting

### MongoDB not connecting?
```powershell
# Check if MongoDB is running
Test-NetConnection -ComputerName localhost -Port 27017

# Start MongoDB service (if installed as service)
net start MongoDB
```

### Server won't start?
```powershell
# Check .env file exists
Get-Content "E:\Olatus Official\olatus_com\Server\.env"

# Reinstall dependencies
npm install

# Try starting again
npm run dev
```

### Seed script fails?
```powershell
# Make sure MongoDB is running first
# Then clear existing data and re-seed
npm run seed
```

---

## ✅ Success Checklist

- [ ] MongoDB Compass connected to `localhost:27017`
- [ ] Server running on port 5000
- [ ] Database `olatus` visible in Compass
- [ ] 6 collections visible (users, projects, servicerequests, etc.)
- [ ] Sample data visible in collections
- [ ] Health endpoint returns OK
- [ ] Can submit test order
- [ ] Can login as admin

**If all checked ✅ - You're all set!** 🎉

---

## 🎓 Next Steps

1. ✅ Update client forms to submit to API
2. ✅ Create admin dashboard to view orders
3. ✅ Test from your client application
4. ✅ Add file upload functionality
5. ✅ Integrate payment processing

---

## 🎉 You're Ready!

Your MongoDB database is **fully integrated** and ready to handle:
- Service requests from customers
- Internship applications from students
- Order management for admins
- Complete tracking & analytics

**Start building! 🚀**
