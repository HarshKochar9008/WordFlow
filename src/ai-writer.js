// ai-writer.js - Fixed version with API key management
import { getGeminiApiKey, setGeminiApiKey } from './gemini.js';

// --- AI Writer Tool ---
const promptInput = document.getElementById('promptInput');
const wordCountInput = document.getElementById('wordCountInput');
const toneSelect = document.getElementById('toneSelect');
const generateBtn = document.getElementById('generateBtn');
const aiOutput = document.getElementById('aiOutput');
const copyAiBtn = document.getElementById('copyAiBtn');
const replaceMainBtn = document.getElementById('replaceMainBtn');
const appendBtn = document.getElementById('appendBtn'); 
const aiStatus = document.getElementById('aiStatus');
const promptBtns = document.querySelectorAll('.prompt-btn');

// Prompt templates
const promptTemplates = {
  essay: "Write a well-structured essay about: ",
  blog: "Write an engaging blog post about: ",
  story: "Write a creative story about: ",
  email: "Write a professional email about: ",
  summary: "Summarize the following text in a concise manner: ",
  rewrite: "Rewrite the following text to improve clarity and flow: "
};

// Prompt template buttons
promptBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    promptBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const template = promptTemplates[btn.dataset.prompt];
    if (template) {
      promptInput.value = template;
      promptInput.focus();
    }
  });
});

// Gemini AI API call
async function callGeminiAI(prompt, wordCount, tone) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error('Please set your Gemini API key using the API Key input above.');
  }
  
  const enhancedPrompt = `${prompt}\n\nPlease write approximately ${wordCount} words in a ${tone} tone. Make sure the content is well-structured, engaging, and appropriate for the requested format.`;
  
  const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: enhancedPrompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    let errorMessage = 'Failed to generate content';
    
    if (errorData.error?.message) {
      if (errorData.error.message.includes('API key')) {
        errorMessage = 'Invalid API key. Please check your Gemini API key.';
      } else if (errorData.error.message.includes('quota')) {
        errorMessage = 'API quota exceeded. Please try again later or upgrade your plan.';
      } else {
        errorMessage = errorData.error.message;
      }
    }
    
    throw new Error(errorMessage);
  }
  
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

// Generate content
if (generateBtn) {
  generateBtn.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();
    const wordCount = parseInt(wordCountInput.value) || 300;
    const tone = toneSelect.value;
    
    if (!prompt) {
      alert('Please enter a prompt.');
      return;
    }
    
    // Check if API key is available
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      alert('Please set your Gemini API key using the API Key input above. Get a free key from Google AI Studio.');
      return;
    }
    
    aiStatus.style.display = 'block';
    aiStatus.className = 'ai-status loading';
    aiStatus.textContent = 'Generating content with Gemini AI...';
    generateBtn.disabled = true;
    
    try {
      const generatedContent = await callGeminiAI(prompt, wordCount, tone);
      aiOutput.value = generatedContent;
      aiStatus.className = 'ai-status success';
      aiStatus.textContent = 'Content generated successfully!';
      setTimeout(() => {
        aiStatus.style.display = 'none';
      }, 3000);
    } catch (error) {
      aiStatus.className = 'ai-status error';
      aiStatus.textContent = `Error: ${error.message}`;
      console.error('AI Generation Error:', error);
    } finally {
      generateBtn.disabled = false;
    }
  });
}

// AI Output actions
if (copyAiBtn) {
  copyAiBtn.addEventListener('click', () => {
    if (aiOutput.value.trim()) {
      aiOutput.select();
      document.execCommand('copy');
      alert('AI content copied to clipboard!');
    } else {
      alert('No content to copy.');
    }
  });
}

if (replaceMainBtn) {
  replaceMainBtn.addEventListener('click', () => {
    if (aiOutput.value.trim()) {
      window.mainText = aiOutput.value;
      document.getElementById('textInput').value = window.mainText;
      if (window.updateCounts) window.updateCounts();
      if (window.syncAllTools) window.syncAllTools();
      alert('Main text replaced with AI content!');
    } else {
      alert('No AI content to replace with.');
    }
  });
}

if (appendBtn) {
  appendBtn.addEventListener('click', () => {
    if (aiOutput.value.trim()) {
      const separator = window.mainText && window.mainText.trim() ? '\n\n' : '';
      window.mainText = (window.mainText || '') + separator + aiOutput.value;
      document.getElementById('textInput').value = window.mainText;
      if (window.updateCounts) window.updateCounts();
      if (window.syncAllTools) window.syncAllTools();
      alert('AI content appended to main text!');
    } else {
      alert('No AI content to append.');
    }
  });
}