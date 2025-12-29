# OLatus_com

# Olatus Platform - Full Stack Application

Complete platform with Client, Server (Backend API), and Admin Panel.

## 📁 Project Structure

```
olatus_com/
├── Client/          # React frontend for public website
├── Server/          # Node.js/Express backend API
└── Admin/           # React admin dashboard
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account (for database)

### 1. Setup Server

```powershell
cd Server
npm install

# Copy and configure environment variables
copy .env.example .env
# Edit .env with your configuration

# Run database seed (create admin user and sample data)
npm run seed

# Start server
npm run dev
```

Server will run on: **http://localhost:5000**

### 2. Setup Client

```powershell
cd Client
npm install

# Start client
npm run dev
```

Client will run on: **http://localhost:5173**

### 3. Setup Admin Panel

```powershell
cd Admin
npm install

# Copy and configure environment variables
copy .env.example .env

# Start admin panel
npm run dev
```

Admin Panel will run on: **http://localhost:5174**

## 🗄️ Database Setup

### Supabase Tables

Create the following tables in your Supabase project:

#### 1. Users Table
```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 2. Projects Table
```sql
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  technologies TEXT[],
  client TEXT,
  duration TEXT,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('completed', 'in-progress', 'upcoming')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3. Contacts Table
```sql
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in-progress', 'resolved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 4. Analytics Table
```sql
CREATE TABLE analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  page TEXT,
  visitor_id TEXT,
  user_agent TEXT,
  referrer TEXT,
  ip_address TEXT,
  event_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 📝 Environment Variables

### Server (.env)
```env
PORT=5000
NODE_ENV=development

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Admin
ADMIN_EMAIL=admin@olatus.com
ADMIN_PASSWORD=your_admin_password

# CORS
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

### Admin (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🔐 Default Admin Credentials

After running `npm run seed` in the Server directory:
- **Email**: admin@olatus.com (or your ADMIN_EMAIL from .env)
- **Password**: Your ADMIN_PASSWORD from .env

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout user

### Projects (Public)
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID

### Projects (Admin Only)
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Contacts
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (Admin)
- `PATCH /api/contact/:id` - Update contact status (Admin)

### Analytics
- `GET /api/analytics` - Get analytics data (Admin)
- `POST /api/analytics/pageview` - Log page view
- `POST /api/analytics/event` - Log custom event

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `PATCH /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user

## 🎨 Admin Panel Features

- **Dashboard** - Overview of key metrics
- **Projects Management** - CRUD operations for projects
- **Contacts Management** - View and manage customer inquiries
- **User Management** - Manage users and roles
- **Analytics** - Track website performance

## 🛠️ Tech Stack

### Client & Admin
- React 18
- TypeScript
- React Router v7
- TailwindCSS
- Vite
- Framer Motion (Client)
- Zustand (Admin state management)
- React Query (Admin data fetching)
- Axios
- Lucide Icons

### Server
- Node.js
- Express
- TypeScript
- Supabase (PostgreSQL)
- JWT Authentication
- Bcrypt
- Winston (Logging)
- Nodemailer
- Zod (Validation)
- Helmet (Security)
- CORS

## 📦 Build for Production

### Server
```powershell
cd Server
npm run build
npm start
```

### Client
```powershell
cd Client
npm run build
```

### Admin
```powershell
cd Admin
npm run build
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS configuration
- Helmet for HTTP security headers
- Rate limiting
- Input validation with Zod
- Environment variable protection

## 📧 Email Configuration

For Gmail, you'll need to:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in EMAIL_PASSWORD

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🆘 Support

For issues or questions:
- Check the documentation
- Review existing issues
- Create a new issue with detailed information

## 🚀 Deployment

### Recommended Services:
- **Server**: Railway, Render, Heroku
- **Client/Admin**: Vercel, Netlify
- **Database**: Supabase (already configured)

Remember to update environment variables for production!
