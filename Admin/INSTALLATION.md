# Admin Panel Installation Guide

## Step 1: Install Dependencies

```powershell
npm install
```

## Step 2: Configure Environment

Copy the example environment file:

```powershell
copy .env.example .env
```

Edit `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

For production, update with your API URL.

## Step 3: Start Development Server

```powershell
npm run dev
```

Admin panel will be available at: http://localhost:5174

## Step 4: Login

Use the admin credentials you configured in the Server:
- Email: admin@olatus.com (or your ADMIN_EMAIL)
- Password: Your ADMIN_PASSWORD

## Features

### Dashboard
- View key metrics and statistics
- See recent contacts
- Monitor page views and visitors

### Projects Management
- Create new projects
- Edit existing projects
- Delete projects
- Filter by category and status

### Contacts Management
- View all contact form submissions
- Update contact status (new, in-progress, resolved)
- Filter by status
- View contact details and messages

### Users Management
- View all users
- Change user roles (user/admin)
- Delete users

### Analytics
- View page views and unique visitors
- See top visited pages
- Track engagement metrics

## Production Build

```powershell
npm run build
```

Built files will be in the `dist` directory.

## Deployment

### Vercel
```powershell
npm install -g vercel
vercel
```

### Netlify
```powershell
npm install -g netlify-cli
npm run build
netlify deploy
```

## Troubleshooting

### Cannot connect to API
- Ensure Server is running
- Check `VITE_API_URL` in `.env`
- Verify CORS settings in Server

### Authentication errors
- Check admin credentials
- Verify JWT_SECRET matches Server
- Clear browser local storage

### Module not found errors
Run `npm install` again

## Development Tips

- Use browser DevTools to inspect API calls
- Check Network tab for failed requests
- View Console for errors
- Local storage contains auth token

## Security Notes

For production:
1. Use HTTPS for all connections
2. Update VITE_API_URL to production API
3. Enable rate limiting
4. Use strong admin passwords
5. Keep dependencies updated
