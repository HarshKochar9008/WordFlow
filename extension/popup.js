// popup.js

// --- Tab Switching ---
const tabBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');

function activateTab(tabId) {
  tabBtns.forEach(b => b.classList.remove('active'));
  tabContents.forEach(tc => tc.style.display = 'none');
  const btn = Array.from(tabBtns).find(b => b.dataset.tab === tabId);
  const tab = document.getElementById(tabId);
  if (btn) btn.classList.add('active');
  if (tab) tab.style.display = 'block';
}

// Set first tab as active on load
if (tabBtns.length && tabContents.length) {
  const firstTabId = tabBtns[0].dataset.tab;
  activateTab(firstTabId);
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    activateTab(btn.dataset.tab);
  });
});


// --- AI Writer ---
const promptInput = document.getElementById('promptInput');
const wordCountInput = document.getElementById('wordCountInput');
const toneSelect = document.getElementById('toneSelect');
const generateBtn = document.getElementById('generateBtn');
const aiOutput = document.getElementById('aiOutput');
const copyAiBtn = document.getElementById('copyAiBtn');
const replaceMainBtn = document.getElementById('replaceMainBtn');
const appendBtn = document.getElementById('appendBtn');
const aiStatus = document.getElementById('aiStatus');

// Gemini API Key management (localStorage)
function getGeminiApiKey() {
  return localStorage.getItem('geminiApiKey') || '';
}
function setGeminiApiKey(key) {
  localStorage.setItem('geminiApiKey', key);
}

// Add API key input to AI Writer tab (now in HTML)
const apiKeyInput = document.getElementById('apiKeyInput');
const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
const getGeminiKeyBtn = document.getElementById('getGeminiKeyBtn');
if (apiKeyInput) apiKeyInput.value = getGeminiApiKey();
if (saveApiKeyBtn) {
  saveApiKeyBtn.onclick = () => {
    setGeminiApiKey(apiKeyInput.value.trim());
    alert('API key saved!');
  };
}
if (getGeminiKeyBtn) {
  getGeminiKeyBtn.onclick = () => {
    chrome.tabs.create({ url: 'https://aistudio.google.com/app/apikey' });
  };
}

async function callGeminiAI(prompt, wordCount, tone) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) throw new Error('Please set your Gemini API key.');
  const enhancedPrompt = `${prompt}\n\nPlease write approximately ${wordCount} words in a ${tone} tone. Make sure the content is well-structured, engaging, and appropriate for the requested format.`;
  const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: enhancedPrompt }] }],
      generationConfig: { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 2048 }
    })
  });
  if (!response.ok) {
    const errorData = await response.json();
    let errorMessage = 'Failed to generate content';
    if (errorData.error?.message) {
      if (errorData.error.message.includes('API key')) errorMessage = 'Invalid API key.';
      else if (errorData.error.message.includes('quota')) errorMessage = 'API quota exceeded.';
      else errorMessage = errorData.error.message;
    }
    throw new Error(errorMessage);
  }
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

if (generateBtn) {
  generateBtn.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();
    const wordCount = parseInt(wordCountInput.value) || 300;
    const tone = toneSelect.value;
    if (!prompt) return alert('Please enter a prompt.');
    if (!getGeminiApiKey()) return alert('Please set your Gemini API key.');
    aiStatus.style.display = 'block';
    aiStatus.className = 'ai-status loading';
    aiStatus.textContent = 'Generating content...';
    generateBtn.disabled = true;
    try {
      const generatedContent = await callGeminiAI(prompt, wordCount, tone);
      aiOutput.value = generatedContent;
      aiStatus.className = 'ai-status success';
      aiStatus.textContent = 'Content generated!';
      setTimeout(() => { aiStatus.style.display = 'none'; }, 3000);
    } catch (error) {
      aiStatus.className = 'ai-status error';
      aiStatus.textContent = `Error: ${error.message}`;
    } finally {
      generateBtn.disabled = false;
    }
  });
}

if (copyAiBtn) {
  copyAiBtn.addEventListener('click', () => {
    if (aiOutput.value.trim()) {
      aiOutput.select();
      document.execCommand('copy');
      alert('AI content copied!');
    } else {
      alert('No content to copy.');
    }
  });
}

// For Replace/Append, sync with Word Count tab
window.mainText = '';
const textInput = document.getElementById('textInput');
if (replaceMainBtn) {
  replaceMainBtn.addEventListener('click', () => {
    if (aiOutput.value.trim()) {
      window.mainText = aiOutput.value;
      if (textInput) textInput.value = window.mainText;
      updateWordCount();
      alert('Main text replaced!');
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
      if (textInput) textInput.value = window.mainText;
      updateWordCount();
      alert('AI content appended!');
    } else {
      alert('No AI content to append.');
    }
  });
}

// --- Word Count ---
const countBtn = document.getElementById('countBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const resultLabel = document.getElementById('resultLabel');
function updateWordCount() {
  const text = textInput.value.trim();
  let wordCount = 0;
  if (text) wordCount = text.split(/\s+/).length;
  resultLabel.textContent = 'Word Count: ' + wordCount;
}
if (countBtn) {
  countBtn.addEventListener('click', updateWordCount);
}
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    if (textInput) {
      textInput.value = '';
      updateWordCount();
    }
  });
}
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    if (textInput && textInput.value.trim()) {
      textInput.select();
      document.execCommand('copy');
      alert('Copied!');
    } else {
      alert('Nothing to copy.');
    }
  });
}
if (textInput) {
  textInput.addEventListener('input', updateWordCount);
}

// --- Auth (Stub Implementation) ---
const authStatus = document.getElementById('authStatus');
const authForms = document.getElementById('authForms');
const logoutGroup = document.getElementById('logoutGroup');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const googleBtn = document.getElementById('googleBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Simulated auth state
let isLoggedIn = false;
let currentUser = null;
function updateAuthUI() {
  if (isLoggedIn) {
    authStatus.textContent = `Logged in as: ${currentUser?.email || 'user@example.com'}`;
    authForms.style.display = 'none';
    logoutGroup.style.display = 'block';
  } else {
    authStatus.textContent = '';
    authForms.style.display = 'block';
    logoutGroup.style.display = 'none';
  }
}
if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    if (!email || !password) return alert('Enter email and password.');
    // Simulate login
    isLoggedIn = true;
    currentUser = { email };
    updateAuthUI();
    alert('Logged in! (Stub)');
  });
}
if (signupBtn) {
  signupBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    if (!email || !password) return alert('Enter email and password.');
    // Simulate signup
    isLoggedIn = true;
    currentUser = { email };
    updateAuthUI();
    alert('Signed up! (Stub)');
  });
}
if (googleBtn) {
  googleBtn.addEventListener('click', () => {
    // Simulate Google login
    isLoggedIn = true;
    currentUser = { email: 'googleuser@example.com' };
    updateAuthUI();
    alert('Google login! (Stub)');
  });
}
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    isLoggedIn = false;
    currentUser = null;
    updateAuthUI();
    alert('Logged out! (Stub)');
  });
}
updateAuthUI();  
