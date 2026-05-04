# 🤖 AI Assistant Setup Guide

## Overview
Your portfolio now includes an intelligent AI assistant that represents you (Oussama Oubaha) and helps visitors learn about your work, skills, and schedule meetings.

## Features
- 🌍 **Multilingual**: Auto-detects French, Arabic, English, Darija
- 💬 **Smart Chat**: Knows everything about your portfolio
- 📅 **Meeting Scheduling**: Helps visitors contact you for meetings
- ⚡ **Fast Response**: Uses Groq API with Llama3-70B model
- 🎨 **Modern UI**: Beautiful floating chat interface

## 🚀 Quick Setup

### 1. Get Groq API Key
1. Go to [https://console.groq.com](https://console.groq.com)
2. Sign up/login (free)
3. Navigate to **API Keys**
4. Click **Create Key**
5. Copy your API key

### 2. Configure Environment Variables
Create a `.env.local` file in your `frontend` folder:

```bash
# frontend/.env.local
REACT_APP_GROQ_API_KEY=your_actual_groq_api_key_here
```

**Important**: Replace `your_actual_groq_api_key_here` with your real API key.

### 3. Restart Development Server
```bash
cd frontend
npm run dev
```

## 📱 How It Works

### Assistant Capabilities
Your AI assistant knows:
- ✅ Your identity and education (EST d'Oujda, DUT CDL)
- ✅ All your skills (React, Laravel, Node.js, etc.)
- ✅ All 6 projects (Machro3y.com, Detection Somnolence, etc.)
- ✅ Your 4 work experiences (SupMti, AquaManager, MediaTower, Maktoub-Tech)
- ✅ Contact information and social links
- ✅ Meeting scheduling via email/WhatsApp

### Language Support
- **French** → Responds in French
- **Arabic** → Responds in Arabic  
- **English** → Responds in English
- **Darija** → Responds in Darija

### Quick Questions
Visitors can click these quick buttons:
- 🛠️ Tes compétences ?
- 📁 Tes projets ?
- 📅 Planifier un RDV
- 📧 Te contacter ?

## 🎨 UI Features

### Chat Window
- **Position**: Bottom right corner
- **Size**: 360px × 500px
- **Design**: Glass morphism with blur effect
- **Colors**: Matches your portfolio theme

### Floating Button
- **Position**: Bottom right (20px from edges)
- **Size**: 56px × 56px
- **Animation**: Scale effect on hover
- **Icon**: 🤖 when closed, ✕ when open

### Message Styling
- **User messages**: Blue gradient, right-aligned
- **Assistant messages**: Dark theme, left-aligned
- **Typing indicator**: Animated dots (···)
- **Auto-scroll**: Smooth scroll to latest message

## 🔧 Technical Details

### API Configuration
```javascript
// Model: llama3-70b-8192
// Max tokens: 500
// Temperature: 0.7
// Context: Last 10 messages
```

### System Prompt
The assistant uses a comprehensive system prompt with:
- Your complete portfolio information
- Response style guidelines
- Language detection rules
- Contact and meeting instructions

### Error Handling
- Network errors: Shows friendly error message
- API limits: Graceful fallback
- Empty responses: Retry mechanism

## 📊 Usage Analytics

### What Visitors Can Ask
- "Quelles sont tes compétences ?"
- "Montre-moi tes projets"
- "Comment te contacter pour un projet ?"
- "Quelle est ton expérience ?"
- "Peux-tu développer une application pour moi ?"

### Meeting Scheduling
When visitors want to schedule meetings:
- Assistant asks for project type, deadline, budget
- Provides your email: oussama.oubaha24@ump.ac.ma
- Provides your WhatsApp: +212628841979

## 🛡️ Security & Privacy

### API Key Security
- ✅ API key stored in environment variables
- ✅ Never exposed to client-side code
- ✅ Secure API calls to Groq

### Data Privacy
- ✅ No personal data stored
- ✅ Messages not logged
- ✅ Context limited to last 10 messages

## 🚀 Deployment Notes

### Environment Variables
Make sure to set `REACT_APP_GROQ_API_KEY` in your production environment:

#### Vercel
```bash
vercel env add REACT_APP_GROQ_API_KEY
```

#### Netlify
```bash
netlify env:set REACT_APP_GROQ_API_KEY "your_key"
```

#### Traditional Hosting
Add to your hosting provider's environment variables section.

### Build Process
The assistant is included in the production build and works immediately when deployed.

## 🎯 Best Practices

### For You (Oussama)
1. **Keep API key secure** - Never commit to git
2. **Monitor usage** - Check Groq dashboard for API usage
3. **Update info** - Keep system prompt current with new projects/skills

### For Visitors
1. **Multilingual support** - Type in any supported language
2. **Quick questions** - Use the preset buttons for common queries
3. **Meeting requests** - Be specific about project needs

## 🔍 Troubleshooting

### Common Issues

#### Assistant not responding
- Check API key is correctly set
- Verify internet connection
- Check Groq API status

#### Messages not sending
- Check console for errors
- Verify API key format
- Ensure environment variables are loaded

#### Styling issues
- Check z-index conflicts
- Verify CSS imports
- Test on different screen sizes

### Debug Mode
Add this to your `.env.local` for debugging:
```bash
REACT_APP_DEBUG_AI=true
```

## 📞 Support

If you need help:
1. Check the console for error messages
2. Verify your Groq API key is valid
3. Ensure environment variables are properly set
4. Test the API directly: https://groq.com

---

**🎉 Your AI assistant is now ready! Visitors can chat with your AI representative 24/7!**
