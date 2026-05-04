'use client';
import { useState, useRef, useEffect } from 'react';

const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;

const SYSTEM_PROMPT = `
You are an intelligent AI assistant representing Oussama Oubaha, 
a Full Stack Developer student at EST d'Oujda (DUT CDL 2024-2026).

IMPORTANT RULES:
- Always respond in the SAME language the user writes in
  (French → French, Arabic → Arabic, English → English, Darija → Darija)
- Be friendly, professional, and concise
- You represent Oussama — speak as his assistant
- Never make up information not provided below

=== INFORMATION ABOUT OUSSAMA OUBAHA ===

IDENTITY:
- Full name: Oussama Oubaha
- Role: Full Stack Developer (étudiant)
- Education: DUT en Conception et Développement des Logiciels
- School: EST d'Oujda (École Supérieure de Technologie), 2024–2026
- Location: Oujda, Maroc
- Email: oussama.oubaha24@ump.ac.ma
- Available for: Stage de fin d'études (2 mois), Full-stack / Web

SKILLS:
- Frontend: React.js, TailwindCSS, HTML/CSS, JavaScript
- Backend: Laravel (PHP), Node.js, Express.js
- Database: MySQL, MongoDB, NoSQL
- Languages: C/C++, Java, Python, PHP
- Systems: Linux Ubuntu, Réseaux, Sécurité
- Tools: Git, GitHub, Figma, Vite
- Other: Big Data basics, Machine Learning, Computer Vision, OpenCV, TensorFlow

PROJECTS:
1. Système de Détection de Somnolence (AI)
   - Programme intelligent basé sur Python et OpenCV qui surveille l'état des yeux en temps réel pour prévenir les accidents de la route
   - Tech: Python, OpenCV, TensorFlow, Machine Learning

2. Plateforme de Gestion RH & Pointage
   - Système complet d'automatisation des processus RH (Pointage, Congés, Paie) avec analytics temps réel
   - Tech: React.js, Node.js, MongoDB, Express.js

3. AI Gesture Controller (Virtual Mouse)
   - Interface homme-machine (HMI) sans contact permettant de contrôler l'ordinateur par des gestes de la main en temps réel
   - Tech: Python, OpenCV, MediaPipe, Computer Vision

4. MAKTOUB-TECH (PFA 2025)
   - Conception et développement d'une interface web réactive et intuitive pour la gestion des candidats et des commissions
   - Tech: React.js, Laravel, MySQL, Tailwind CSS

5. Personal Portfolio & Admin Dashboard
   - Plateforme dynamique avec un espace d'administration pour gérer mes projets, compétences et messages en temps réel
   - Tech: React.js, Node.js, MongoDB, Express.js, AI

6. Machro3y.com
   - Plateforme de services professionnels avec système de réservation en ligne, gestion des rendez-vous et interface client moderne
   - Tech: React.js, Node.js, MongoDB, Express.js

EXPERIENCE:
- Développeur Web Fullstack at SupMti (2026 - Avril à Aujourd'hui)
  - Création d'une application de Gestion Scolaire performante
  - Backend Laravel + MySQL, Frontend React.js + Tailwind CSS

- Développeur Web Front-end at AquaManager PFE (2026 - Février à Avril)
  - Application web AquaManager pour la gestion intelligente
  - API REST Laravel, SPA React.js, MySQL, Tailwind CSS

- Développeur Web Fullstack at MediaTower.tech (2025-2026 - Décembre à Avril)
  - Conception et développement intégral de la plateforme machro3y.com
  - Backend Laravel + MySQL, Interfaces Laravel Blade + Tailwind CSS

- Développeur Web Front-end at Maktoub-Tech (2025)
  - Développement d'une plateforme E-commerce complète et performante
  - React.js + Tailwind CSS

SOCIAL & CONTACT:
- LinkedIn: https://www.linkedin.com/in/oussama-oubaha-75951436a/
- GitHub: https://github.com/oussama-oubaha
- WhatsApp: https://wa.me/+212628841979
- Email: oussama.oubaha24@ump.ac.ma

MEETING / RENDEZ-VOUS:
- If someone wants to schedule a meeting or discuss a project,
  tell them to contact via email: oussama.oubaha24@ump.ac.ma
  or WhatsApp: +212628841979
- For project discussions, ask: type of project, deadline, budget range

=== RESPONSE STYLE ===
- Short and clear answers (2-4 sentences max unless asked for details)
- Use emojis sparingly but naturally
- If asked something you don't know → say honestly you'll forward the question to Oussama
- End responses with a helpful follow-up question when relevant
`;

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '👋 Bonjour ! Je suis l\'assistant IA d\'Oussama. Comment puis-je vous aider ? \n\nأهلاً! أنا المساعد الذكي لأسامة. كيف يمكنني مساعدتك؟\n\nHello! I\'m Oussama\'s AI assistant. How can I help you?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Debug logs
    console.log('🔍 Debug - GROQ_API_KEY:', GROQ_API_KEY ? 'Configured' : 'Not configured');
    console.log('🔍 Debug - GROQ_API_KEY value:', GROQ_API_KEY);

    // Check if API key is configured
    if (!GROQ_API_KEY || GROQ_API_KEY === 'your_groq_api_key_here' || GROQ_API_KEY === 'undefined') {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '🔑 Clé API Groq non configurée. Veuillez configurer REACT_APP_GROQ_API_KEY dans votre fichier .env.local\n\nGet your free API key from: https://console.groq.com/keys'
      }]);
      return;
    }

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      console.log('🚀 Sending request to Groq API...');
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...newMessages.slice(-10) // keep last 10 messages for context
          ],
          max_tokens: 500,
          temperature: 0.7,
          stream: false,
        }),
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', response.headers);

      const data = await response.json();
      console.log('📊 Response data:', data);
      
      // Better error handling
      if (!response.ok) {
        console.error('❌ API Error:', data);
        let errorMessage = '❌ Erreur API. ';
        
        if (response.status === 401) {
          errorMessage += 'Clé API invalide. Vérifiez votre configuration.';
        } else if (response.status === 429) {
          errorMessage += 'Limite de dépassée. Réessayez plus tard.';
        } else if (response.status >= 500) {
          errorMessage += 'Serveur Groq indisponible.';
        } else {
          errorMessage += `Code ${response.status}: ${data.error?.message || 'Erreur inconnue'}`;
        }
        
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: errorMessage
        }]);
        return;
      }
      
      console.log('✅ API Success - choices:', data.choices);
      
      const assistantMessage = {
        role: 'assistant',
        content: data.choices?.[0]?.message?.content || '❌ Réponse vide de l\'API.'
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('❌ Fetch Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ Erreur de connexion: ${error.message}. Vérifiez votre internet et votre clé API.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    '🛠️ Tes compétences ?',
    '📁 Tes projets ?',
    '📅 Planifier un RDV',
    '📧 Te contacter ?',
  ];

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '360px',
          height: '500px',
          background: 'rgba(2, 11, 24, 0.95)',
          border: '1px solid rgba(56, 189, 248, 0.2)',
          borderRadius: '16px',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          boxShadow: '0 0 40px rgba(56, 189, 248, 0.1)',
          overflow: 'hidden',
        }}>
          
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(56,189,248,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(56,189,248,0.05)',
          }}>
            <div style={{
              width: '36px', height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px'
            }}>🤖</div>
            <div>
              <div style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '14px' }}>
                Assistant IA · Oussama
              </div>
              <div style={{ color: '#22c55e', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                En ligne
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                marginLeft: 'auto', background: 'none', border: 'none',
                color: '#64748b', cursor: 'pointer', fontSize: '20px', lineHeight: 1
              }}>×</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px',
            display: 'flex', flexDirection: 'column', gap: '12px',
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}>
                <div style={{
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #0ea5e9, #6366f1)'
                    : 'rgba(30, 41, 59, 0.8)',
                  color: '#f1f5f9',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  border: msg.role === 'assistant' ? '1px solid rgba(56,189,248,0.1)' : 'none',
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '10px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid rgba(56,189,248,0.1)',
                }}>
                  <span style={{ color: '#38bdf8', fontSize: '18px', letterSpacing: '4px' }}>···</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions */}
          {messages.length === 1 && (
            <div style={{
              padding: '0 16px 8px',
              display: 'flex', flexWrap: 'wrap', gap: '6px',
            }}>
              {quickQuestions.map((q, i) => (
                <button key={i} onClick={() => { setInput(q); inputRef.current?.focus(); }}
                  style={{
                    background: 'rgba(56,189,248,0.08)',
                    border: '1px solid rgba(56,189,248,0.2)',
                    color: '#7dd3fc', borderRadius: '20px',
                    padding: '4px 10px', fontSize: '11px', cursor: 'pointer',
                  }}>{q}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '12px 16px',
            borderTop: '1px solid rgba(56,189,248,0.1)',
            display: 'flex', gap: '8px',
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Écrivez votre message..."
              style={{
                flex: 1, background: 'rgba(30,41,59,0.6)',
                border: '1px solid rgba(56,189,248,0.15)',
                borderRadius: '10px', color: '#f1f5f9',
                padding: '8px 12px', fontSize: '13px', outline: 'none',
              }}
            />
            <button onClick={sendMessage} disabled={isLoading || !input.trim()}
              style={{
                background: input.trim() ? 'linear-gradient(135deg, #0ea5e9, #6366f1)' : 'rgba(56,189,248,0.1)',
                border: 'none', borderRadius: '10px',
                width: '38px', cursor: input.trim() ? 'pointer' : 'default',
                color: 'white', fontSize: '16px',
                transition: 'all 0.2s',
              }}>➤</button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed', bottom: '20px', right: '20px',
          width: '56px', height: '56px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
          border: 'none', cursor: 'pointer', zIndex: 1001,
          fontSize: '24px',
          boxShadow: '0 0 20px rgba(56,189,248,0.4)',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
      >
        {isOpen ? '✕' : '🤖'}
      </button>
    </>
  );
}
