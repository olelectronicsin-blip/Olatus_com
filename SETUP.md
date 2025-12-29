# 🚀 Quick Setup Checklist

## ✅ Completed Steps

1. ✅ Server dependencies installed
2. ✅ Admin panel dependencies installed
3. ✅ Client dependencies updated
4. ✅ Environment files created

## 🔧 Configuration Required

### 1. Setup Supabase Database

**Option A: Use Supabase (Recommended)**
1. Go to https://supabase.com
2. Create a new project (or use existing)
3. Once created, go to Settings > API
4. Copy these values to `Server/.env`:
   - `SUPABASE_URL` - Your project URL
   - `SUPABASE_ANON_KEY` - Your anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY` - Your service role key (keep secret!)

5. Go to SQL Editor and run the SQL from `Server/database-schema.sql`
   - This creates all tables (users, projects, contacts, analytics)

### 2. Configure Server Environment

Edit `Server/.env`:

```env
# Generate a secure JWT secret (use a random string)
JWT_SECRET=your_super_secret_jwt_key_min_32_chars

# Set admin credentials
ADMIN_EMAIL=admin@olatus.com
ADMIN_PASSWORD=YourSecurePassword123!

# Optional: Email setup (for contact form notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

**Gmail App Password Setup:**
1. Enable 2FA on Gmail
2. Go to: https://myaccount.google.com/apppasswords
3. Generate new app password
4. Use that in EMAIL_PASSWORD

### 3. Run Database Seed (Create Admin User)

```powershell
cd Server
npm run seed
```

This creates:
- Admin user with your credentials
- Sample projects

## 🎯 Start Everything

### Terminal 1 - Server:
```powershell
cd Server
npm run dev
```
Server runs at: http://localhost:5000

### Terminal 2 - Admin Panel:
```powershell
cd Admin
npm run dev
```
Admin panel runs at: http://localhost:5174

### Terminal 3 - Client:
```powershell
cd Client
npm run dev
```
Client runs at: http://localhost:5173

## 🔐 Login to Admin Panel

1. Open: http://localhost:5174
2. Login with:
   - Email: admin@olatus.com (or your ADMIN_EMAIL)
   - Password: (your ADMIN_PASSWORD from .env)

## ✨ What You Can Do Now

### Admin Panel Features:
- **Dashboard** - View stats and metrics
- **Projects** - Add/edit/delete projects
- **Contacts** - View contact form submissions
- **Users** - Manage users and roles
- **Analytics** - Track website visits

### API Endpoints Available:
- POST /api/auth/login - Login
- POST /api/auth/register - Register
- GET /api/projects - Get projects
- POST /api/contact - Submit contact form
- GET /api/admin/dashboard - Get dashboard stats
- And many more...

## 🆘 Troubleshooting

### "Cannot connect to database"
- Check Supabase credentials in Server/.env
- Ensure database tables are created

### "Invalid credentials"
- Make sure you ran `npm run seed`
- Check ADMIN_EMAIL and ADMIN_PASSWORD in .env

### "Port already in use"
- Change PORT in Server/.env
- Or kill the process using that port

### "Module not found"
- Run `npm install` in the respective folder

## 📝 Next Steps After Setup

1. ✅ Test the API: http://localhost:5000/health
2. ✅ Login to admin panel
3. ✅ Add your real projects
4. ✅ Customize the client website
5. ✅ Deploy to production

## 🌐 Production Deployment

When ready:
- **Server**: Railway, Render, or Heroku
- **Client/Admin**: Vercel or Netlify
- **Database**: Already on Supabase!

Update environment variables for production URLs.
