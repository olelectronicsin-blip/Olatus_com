# Server Installation Guide

## Step 1: Install Dependencies

```powershell
npm install
```

## Step 2: Configure Environment

Copy the example environment file and update with your values:

```powershell
copy .env.example .env
```

Edit `.env` file with your actual values:
- Supabase credentials
- JWT secret
- Email settings
- Admin credentials

## Step 3: Database Setup

1. Go to your Supabase project
2. Open SQL Editor
3. Copy and paste the contents of `database-schema.sql`
4. Run the SQL commands to create all tables

## Step 4: Seed Database

Run the seed script to create admin user and sample data:

```powershell
npm run seed
```

This will:
- Create an admin user with credentials from `.env`
- Add sample projects

## Step 5: Start Development Server

```powershell
npm run dev
```

Server will be available at: http://localhost:5000

## API Testing

Test the server is running:
```powershell
curl http://localhost:5000/health
```

## Production Build

```powershell
npm run build
npm start
```

## Troubleshooting

### Module not found errors
Make sure you've run `npm install`

### Database connection errors
- Check Supabase credentials in `.env`
- Ensure database tables are created
- Verify network connectivity

### Port already in use
Change the PORT in `.env` file

## Email Setup (Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security > 2-Step Verification > App passwords
   - Generate new app password
3. Use the generated password in `EMAIL_PASSWORD`

## Next Steps

After server is running:
1. Setup and run Client application
2. Setup and run Admin panel
3. Test API endpoints
4. Create additional admin users if needed
