// firebase/auth.js - Firebase Authentication Module
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from './firebaseConfig.js';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Authentication functions
export async function login(email, password) {
  try {
    console.log('Attempting login with email:', email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Login successful:', userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error('Login error:', error.code, error.message);
    throw new Error(getAuthErrorMessage(error.code));
  }
}

export async function signup(email, password) {
  try {
    console.log('Attempting signup with email:', email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('Signup successful:', userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error('Signup error:', error.code, error.message);
    throw new Error(getAuthErrorMessage(error.code));
  }
}

export async function loginWithGoogle() {
  try {
    console.log('Attempting Google sign-in...');
    const result = await signInWithPopup(auth, googleProvider);
    console.log('Google sign-in successful:', result.user.email);
    return result.user;
  } catch (error) {
    console.error('Google sign-in error:', error.code, error.message);
    throw new Error(getAuthErrorMessage(error.code));
  }
}

export async function logout() {
  try {
    console.log('Attempting logout...');
    await signOut(auth);
    console.log('Logout successful');
  } catch (error) {
    console.error('Logout error:', error.code, error.message);
    throw new Error(getAuthErrorMessage(error.code));
  }
}

// Auth state observer
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

// Get current user
export function getCurrentUser() {
  return auth.currentUser;
}

// Error message helper
function getAuthErrorMessage(errorCode) {
  console.log('Error code received:', errorCode);
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/popup-closed-by-user':
      return 'Login popup was closed. Please try again.';
    case 'auth/popup-blocked':
      return 'Login popup was blocked. Please allow popups for this site.';
    case 'auth/cancelled-popup-request':
      return 'Login was cancelled.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/operation-not-allowed':
      return 'This authentication method is not enabled. Please contact support.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/invalid-credential':
      return 'Invalid email or password.';
    default:
      console.log('Unknown error code:', errorCode);
      return `Authentication failed: ${errorCode}. Please try again.`;
  }
} 