# WordFlow - AI-Powered Content Writing Tool

WordFlow is a comprehensive web application designed to empower students, content creators, and professional writers with advanced text analysis and AI-powered content generation capabilities.

## Features

### 📊 Text Analysis Tools
- **Word Count Tool**: Real-time word and character counting with drag-and-drop file support
- **Search & Replace**: Advanced text search with highlighting and bulk replacement
- **Text Statistics**: Detailed analysis including sentences, paragraphs, and reading time
- **Case Converter**: Multiple text case transformations (UPPERCASE, lowercase, Title Case, Sentence case)
- **Download**: Export text as .txt files

### 🤖 AI-Powered Content Writer (NEW!)
- **Gemini AI Integration**: Powered by Google's free Gemini Pro model
- **Manual API Key Setup**: Secure local configuration
- **Content Generation**: Create essays, blog posts, stories, emails, and more
- **Smart Prompts**: Pre-built templates for different content types
- **Customizable Output**: Control word count (50-2000 words) and tone
- **Seamless Integration**: Replace or append AI-generated content to main text

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Free Gemini API key (for AI features)

### Setup
1. Open `index.html` in your web browser
2. For AI features, obtain a free Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
3. Edit `firebase/gemini.js` and replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key

## AI Content Generation

### Getting Your Free API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key" to generate a new key
4. Copy the API key (starts with "AIza...")

### Setting Up Your API Key
1. Open `firebase/gemini.js` in a text editor
2. Find the line: `let GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';`
3. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key
4. Save the file

### Supported Content Types
- **Essay Writer**: Academic and formal essays
- **Blog Post**: Engaging blog content
- **Story Writer**: Creative narratives and fiction
- **Email Writer**: Professional email composition
- **Text Summarizer**: Concise text summaries
- **Content Rewriter**: Improved text clarity and flow

### Tone Options
- Professional
- Casual
- Academic
- Creative
- Persuasive

### How to Use AI Writer
1. Navigate to the "AI Writer" tab
2. Choose a content template or write your own prompt
3. Set desired word count and tone
4. Click "Generate Content"
5. Use the generated content with copy, replace, or append options

## File Support
- Drag and drop `.txt` files directly into the word count tool
- All generated content can be downloaded as `.txt` files

## Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Security
- API keys are stored locally in the source code
- No data is sent to external servers except for AI content generation
- All text processing happens client-side
- API keys are never shared or transmitted to third parties

## Responsive Design
- Optimized for desktop, tablet, and mobile devices
- Collapsible sidebar navigation on mobile
- Touch-friendly interface elements

## Technical Details
- Pure HTML, CSS, and JavaScript
- No external dependencies
- Local configuration for API key
- Real-time text analysis and synchronization across tools

## License
This project is open source and available under the MIT License.

## Support
For issues or feature requests, please create an issue in the project repository.

---

**Note**: The AI features require a valid Gemini API key from Google AI Studio. The API key is stored locally and used only for content generation requests. The free tier includes generous usage limits for most users. 