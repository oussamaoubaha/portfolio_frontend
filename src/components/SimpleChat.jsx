import { useState, useRef, useEffect } from 'react';

export default function SimpleChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 Bonjour ! Je suis l\'assistant IA d\'Oussama. Comment puis-je vous aider ?' }
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

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      let response = '';
      
      // Enhanced keyword-based responses
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('compétence') || lowerInput.includes('skill') || lowerInput.includes('technologie') || lowerInput.includes('techno')) {
        response = '🛠️ Mes compétences principales sont :\n\n• Frontend: React.js, Next.js, TypeScript, Tailwind CSS\n• Backend: Laravel, Node.js, Express.js, PHP\n• Database: MySQL, MongoDB, PostgreSQL\n• IA & ML: TensorFlow, OpenCV, Computer Vision\n• Outils: Git, GitHub, Docker, Figma\n• Langages: JavaScript, Python, PHP, C/C++';
      } 
      else if (lowerInput.includes('projet') || lowerInput.includes('project') || lowerInput.includes('realisation') || lowerInput.includes('travail')) {
        response = '📁 Mes projets incluent :\n\n• Machro3y.com - Plateforme de services professionnels\n• Système Détection Somnolence - IA avec OpenCV\n• Plateforme RH & Pointage - Laravel + React\n• AI Gesture Controller - Contrôle par gestes\n• Portfolio Interactif - React.js + Node.js\n• AquaManager PFE - Application de gestion';
      } 
      else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('rdv') || lowerInput.includes('rendez-vous') || lowerInput.includes('whatsapp') || lowerInput.includes('téléphone')) {
        response = '📧 Pour me contacter :\n\n• Email: oussama.oubaha24@ump.ac.ma\n• WhatsApp: +212 628 841 979\n• LinkedIn: linkedin.com/in/oussama-oubaha\n• GitHub: github.com/oussama-oubaha\n\nDisponible pour stage de fin d\'études (2 mois)';
      } 
      else if (lowerInput.includes('expérience') || lowerInput.includes('stage') || lowerInput.includes('work') || lowerInput.includes('emploi') || lowerInput.includes('carrière')) {
        response = '💼 Mon expérience professionnelle :\n\n• SupMti - Développeur Fullstack (2026 - Avril à aujourd\'hui)\n• AquaManager PFE - Développeur Frontend (2026 - Février à Avril)\n• MediaTower.tech - Fullstack (2025-2026 - Décembre à Avril)\n• Maktoub-Tech - Frontend (2025)\n\n4 expériences en développement web';
      } 
      else if (lowerInput.includes('formation') || lowerInput.includes('étude') || lowerInput.includes('education') || lowerInput.includes('dut') || lowerInput.includes('est') || lowerInput.includes('ecole')) {
        response = '🎓 Ma formation :\n\n• DUT Conception et Développement des Logiciels\n• EST d\'Oujda (2024-2026)\n• Spécialisation: Génie Logiciel\n• Localisation: Oujda, Maroc\n\nFormation approfondie en programmation, bases de données, développement web et systèmes d\'information.';
      }
      else if (lowerInput.includes('darija') || lowerInput.includes('arabe') || lowerInput.includes('maroc') || lowerInput.includes('salam') || lowerInput.includes('bonjour')) {
        response = 'مرحباً! أنا مساعد أسامة المطور. يمكنني التحدث عن:\n\n• مهاراته التقنية\n• مشاريعه\n• خبرته المهنية\n• كيفية التواصل معه\n\nماذا تريد أن تعرف؟\n\n🤖 Je peux aussi répondre en français !';
      }
      else if (lowerInput.includes('age') || lowerInput.includes('ans') || lowerInput.includes('né')) {
        response = '👤 À propos de moi :\n\n• Âge: 22 ans\n• Localisation: Oujda, Maroc\n• Langues: Français, Arabe, Anglais\n• Statut: Étudiant en DUT CDL\n• Disponible: Stage de fin d\'études (2 mois)';
      }
      else {
        response = '🤖 Je suis l\'assistant IA d\'Oussama Oubaha, développeur full-stack junior.\n\nJe peux vous informer sur:\n• 🛠️ Compétences techniques\n• 📁 Projets réalisés\n• 💼 Expériences professionnelles\n• 🎓 Formation\n• 📧 Contact et disponibilités\n\nPosez-moi votre question !';
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    '🛠️ Compétences',
    '📁 Projets',
    '📧 Contact',
    '💼 Expérience',
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
          background: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
        }}>
          
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #333',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: '#222',
          }}>
            <div style={{
              width: '40px', height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px'
            }}>🤖</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: '16px' }}>
                Oussama Assistant
              </div>
              <div style={{ color: '#10b981', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                Online
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                marginLeft: 'auto', background: 'none', border: 'none',
                color: '#999', cursor: 'pointer', fontSize: '24px', lineHeight: 1,
                padding: '4px'
              }}>×</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px',
            display: 'flex', flexDirection: 'column', gap: '12px',
            background: '#1a1a1a',
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}>
                <div style={{
                  maxWidth: '75%',
                  padding: '12px 16px',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)'
                    : '#2a2a2a',
                  color: '#fff',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  border: msg.role === 'assistant' ? '1px solid #333' : 'none',
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '12px 20px',
                  borderRadius: '18px 18px 18px 4px',
                  background: '#2a2a2a',
                  border: '1px solid #333',
                }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6', animation: 'bounce 1.4s infinite ease-in-out both' }}></div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.16s' }}></div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.32s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions */}
          {messages.length === 1 && (
            <div style={{
              padding: '0 16px 12px',
              display: 'flex', flexWrap: 'wrap', gap: '8px',
              background: '#1a1a1a',
            }}>
              {quickQuestions.map((q, i) => (
                <button key={i} onClick={() => { setInput(q); inputRef.current?.focus(); }}
                  style={{
                    background: '#2a2a2a',
                    border: '1px solid #444',
                    color: '#a3a3a3', borderRadius: '20px',
                    padding: '6px 12px', fontSize: '12px', cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.target.style.background = '#333'; e.target.style.color = '#fff'; }}
                  onMouseLeave={e => { e.target.style.background = '#2a2a2a'; e.target.style.color = '#a3a3a3'; }}
                >{q}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '16px',
            borderTop: '1px solid #333',
            display: 'flex', gap: '12px',
            background: '#222',
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              style={{
                flex: 1, background: '#1a1a1a',
                border: '1px solid #444',
                borderRadius: '24px', color: '#fff',
                padding: '12px 16px', fontSize: '14px', outline: 'none',
              }}
            />
            <button onClick={sendMessage} disabled={isLoading || !input.trim()}
              style={{
                background: input.trim() ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' : '#2a2a2a',
                border: 'none', borderRadius: '50%',
                width: '48px', height: '48px', cursor: input.trim() ? 'pointer' : 'default',
                color: 'white', fontSize: '18px',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>➤</button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed', bottom: '20px', right: '20px',
          width: '60px', height: '60px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
          border: 'none', cursor: 'pointer', zIndex: 1001,
          fontSize: '28px',
          boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)',
          transition: 'all 0.3s',
        }}
        onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
      >
        {isOpen ? '✕' : '💬'}
      </button>
      
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </>
  );
}
