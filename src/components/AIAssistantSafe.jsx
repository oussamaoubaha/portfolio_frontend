'use client';
import { useState, useRef, useEffect } from 'react';

const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;

export default function AIAssistantSafe() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '👋 Bonjour ! Je suis l\'assistant IA d\'Oussama. Comment puis-je vous aider ?'
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
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [
            { 
              role: 'system', 
              content: `You are an intelligent AI assistant representing Oussama Oubaha, a Full Stack Developer student at EST d'Oujda. Be friendly, professional, and concise. Respond in the same language as the user.` 
            },
            ...newMessages.slice(-10)
          ],
          max_tokens: 500,
          temperature: 0.7,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.choices?.[0]?.message?.content || '❌ Réponse vide de l\'API.'
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Assistant Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ Erreur: ${error.message}. Vérifiez votre clé API et votre connexion.`
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
