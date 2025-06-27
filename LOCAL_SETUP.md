# Local Development Setup for WordFlow

## Quick Fix for "auth/unauthorized-domain" Error

### Option 1: Use Local Server (Recommended)

1. **Start the local server:**
   ```bash
   node server.js
   ```

2. **Open your browser and go to:**
   ```
   http://localhost:3000
   ```

3. **Authentication should now work!** ✅

### Option 2: Add Domain to Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **wordflow-c8def**
3. Go to **Authentication** > **Settings**
4. Add these domains to **Authorized domains**:
   - `localhost`
   - `127.0.0.1`
   - Your actual domain (if hosted online)

## Why This Happens

Firebase Authentication requires the domain to be authorized for security reasons. When you open HTML files directly (`file://` protocol), Firebase blocks authentication.

## Server Features

- ✅ Serves all files from your project directory
- ✅ Handles CORS properly
- ✅ Supports all file types (HTML, JS, CSS, images, etc.)
- ✅ Automatic MIME type detection
- ✅ Error handling and logging

## Quick Commands

```bash
# Start server
npm start

# Or directly with Node
node server.js

# Stop server
Ctrl + C
```

## Testing Authentication

1. Start the server: `node server.js`
2. Open: `http://localhost:3000`
3. Try creating an account or signing in
4. Check browser console for detailed logs

## Troubleshooting

- **Port 3000 in use?** Change `PORT = 3000` in `server.js`
- **Node.js not installed?** Download from [nodejs.org](https://nodejs.org/)
- **Still getting errors?** Check browser console for specific error codes

## Next Steps

Once authentication works locally, you can:
1. Deploy to a hosting service (Netlify, Vercel, etc.)
2. Add your production domain to Firebase authorized domains
3. Configure additional authentication providers 