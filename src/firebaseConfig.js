// firebase/firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// --- Firebase Config (replace with your own config from Firebase Console) ---
const firebaseConfig = {
    apiKey: "AIzaSyDrtYupy_VioRO_TT1JaB70hs8aokaGjwE",
    authDomain: "wordflow-c8def.firebaseapp.com",
    projectId: "wordflow-c8def",
    storageBucket: "wordflow-c8def.appspot.com",
    messagingSenderId: "809263593669",
    appId: "1:809263593669:web:239babbed156da292e98ac",
    measurementId: "G-MTN4VSFQJP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
console.log('Firebase app initialized successfully');

// Initialize Firebase Auth
export const auth = getAuth(app);
console.log('Firebase Auth initialized successfully');

// For backward compatibility
export default firebaseConfig;

// For browser global usage (if not using modules)
window.firebaseConfig = firebaseConfig; 