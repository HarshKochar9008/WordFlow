# Gemini AI Setup Guide

This guide will help you set up the free Gemini AI integration for WordFlow.

## Step 1: Get Your Free API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key" to generate a new key
4. Copy the API key (it will start with "AIza...")

## Step 2: Configure Your API Key

1. Open the file `firebase/gemini.js` in any text editor
2. Find this line:
   ```javascript
   let GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
   ```
3. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key
4. Save the file

Example:
```javascript
let GEMINI_API_KEY = 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
```

## Step 3: Test the Integration

1. Open `index.html` in your web browser
2. Navigate to the "AI Writer" tab
3. Enter a prompt like "Write a short story about a robot"
4. Click "Generate Content"
5. If everything is set up correctly, you should see AI-generated content

## Troubleshooting

### "Please set your Gemini API key" Error
- Make sure you've replaced `YOUR_GEMINI_API_KEY_HERE` with your actual API key
- Check that the API key starts with "AIza"
- Ensure you've saved the file after making changes

### "Invalid API key" Error
- Verify your API key is correct
- Make sure you copied the entire key from Google AI Studio
- Check that there are no extra spaces or characters

### "API quota exceeded" Error
- The free tier has usage limits
- Wait a while and try again
- Consider upgrading to a paid plan if you need more usage

## Security Notes

- Your API key is stored locally in the source code
- Never share your API key publicly
- The key is only used for AI content generation requests
- No data is sent to external servers except for AI requests

## Free Tier Limits

The free Gemini API tier includes:
- 15 requests per minute
- 1500 requests per day
- Sufficient for most personal and educational use

For higher usage, consider upgrading to a paid plan at Google AI Studio. 