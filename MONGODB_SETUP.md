# MongoDB Setup Complete! 🎉

Your server has been configured to use **MongoDB** at `mongodb://localhost:27017/olatus`

## ✅ What's Been Done

1. **MongoDB (Mongoose) installed**
2. **Database models created:**
   - User
   - Project
   - Contact
   - Analytics
3. **All controllers updated** to use MongoDB
4. **Environment configured** with MongoDB URI

## 🚀 Next Steps

### 1. Install & Start MongoDB

**Option A: MongoDB Community Server (Local)**
```powershell
# Download from: https://www.mongodb.com/try/download/community
# After installation, MongoDB should start automatically
```

**Option B: Use Docker**
```powershell
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option C: MongoDB Atlas (Cloud - Free)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in Server/.env

### 2. Configure Server/.env

Edit `Server/.env`:
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/olatus

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long

# Admin Credentials
ADMIN_EMAIL=admin@olatus.com
ADMIN_PASSWORD=YourSecurePassword123!
```

### 3. Seed Database (Create Admin User)

```powershell
cd "e:\Olatus Official\olatus_com\Server"
npm run seed
```

This will:
- Create admin user
- Add 3 sample projects

### 4. Start Server

```powershell
cd "e:\Olatus Official\olatus_com\Server"
npm run dev
```

Server will run at: **http://localhost:5000**

### 5. Start Admin Panel

```powershell
cd "e:\Olatus Official\olatus_com\Admin"
npm run dev
```

Admin panel: **http://localhost:5174**

### 6. Start Client

```powershell
cd "e:\Olatus Official\olatus_com\Client"
npm run dev
```

Client: **http://localhost:5173**

## 🔐 Login to Admin Panel

After seeding:
- Email: admin@olatus.com
- Password: (your ADMIN_PASSWORD)

## 📊 Check MongoDB Connection

```powershell
# If MongoDB is running, this should work:
mongosh
# Then: use olatus
# Then: show collections
```

## 🆘 Troubleshooting

**"MongooseServerSelectionError: connect ECONNREFUSED"**
- MongoDB is not running
- Start MongoDB service or use Docker

**"JWT must be provided"**
- Set JWT_SECRET in .env (min 32 characters)

**"Admin user creation failed"**
- Check MongoDB is running
- Verify MONGODB_URI is correct

## 🎯 You're Ready!

Once MongoDB is running:
1. ✅ Run `npm run seed` in Server folder
2. ✅ Start all three services
3. ✅ Login to admin panel
4. ✅ Start building!
