# Firebase Authentication Setup for WordFlow

## Overview
WordFlow now includes Firebase Authentication to secure access to the application. Users must sign in before they can use any of the text processing tools.

## Features
- **Email/Password Authentication**: Traditional login and signup
- **Google Sign-In**: One-click authentication with Google accounts
- **Automatic Session Management**: Users stay logged in across browser sessions
- **Secure Access Control**: All tools are blocked until authentication

## Setup Instructions

### 1. Firebase Project Configuration
The Firebase configuration is already set up in `firebase/firebaseConfig.js` with the following project:
- **Project ID**: wordflow-c8def
- **Auth Domain**: wordflow-c8def.firebaseapp.com

### 2. Enable Authentication Methods
In your Firebase Console:
1. Go to Authentication > Sign-in method
2. Enable **Email/Password** authentication
3. Enable **Google** authentication
4. Configure authorized domains if needed

### 3. Google Sign-In Setup
For Google authentication to work:
1. In Firebase Console, go to Authentication > Sign-in method > Google
2. Enable Google sign-in
3. Add your domain to authorized domains (for production)

## File Structure
```
firebase/
├── firebaseConfig.js    # Firebase initialization and config
├── auth.js             # Authentication functions
└── ai-writer.js        # AI writing functionality
```

## Authentication Flow
1. **Page Load**: Authentication modal appears, tools are blocked
2. **User Signs In**: Modal closes, tools become available, user info displayed
3. **Session Persistence**: User stays logged in across browser sessions
4. **Logout**: User signs out, modal reappears, tools blocked again

## User Interface
- **Authentication Modal**: Clean, modern login/signup interface
- **Sidebar User Info**: Shows logged-in user's email
- **Logout Button**: Red logout button in sidebar
- **Responsive Design**: Works on desktop and mobile

## Security Features
- **Input Validation**: Email and password validation
- **Error Handling**: User-friendly error messages
- **Session Management**: Automatic token refresh
- **Access Control**: Tools blocked until authentication

## Customization
To customize the authentication:
1. **Styling**: Modify CSS variables in `index.html`
2. **Error Messages**: Update `getAuthErrorMessage()` in `auth.js`
3. **Additional Providers**: Add more auth providers in `auth.js`

## Troubleshooting
- **CORS Issues**: Ensure Firebase domain is configured correctly
- **Popup Blocked**: Allow popups for Google sign-in
- **Network Errors**: Check internet connection and Firebase status

## Next Steps
Consider adding:
- Password reset functionality
- Email verification
- Additional social login providers
- User profile management
- Data persistence per user 