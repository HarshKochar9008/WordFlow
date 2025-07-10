// gemini.js - Fixed version
// Gemini API key loader
// This file loads the Gemini API key from environment variables or manual configuration

// Option 1: Set your API key directly here (for local development)
// Replace 'YOUR_ACTUAL_API_KEY_HERE' with your real Gemini API key
let GEMINI_API_KEY = 'AIzaSyDfouauAmiWubHg2QY3w2t5cozbpWISlG4';

// Option 2: Load from environment variable (if using Node.js)
if (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) {
  GEMINI_API_KEY = process.env.GEMINI_API_KEY;
}

// Option 3: Load from window global (for browser)
if (typeof window !== 'undefined' && window.GEMINI_API_KEY) {
  GEMINI_API_KEY = window.GEMINI_API_KEY;
}

export function getGeminiApiKey() {
  // Remove the specific check for the placeholder key
  if (!GEMINI_API_KEY || GEMINI_API_KEY.trim() === '') {
    console.warn('Please set your Gemini API key in firebase/gemini.js');
    return null;
  }
  return GEMINI_API_KEY;
}

// Function to set API key dynamically (useful for user input)
export function setGeminiApiKey(apiKey) {
  GEMINI_API_KEY = apiKey;
}