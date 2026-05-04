import { useState, useRef } from 'react';

import { SYSTEM_PROMPT } from '../constants/systemPrompt';

// Initialize Groq client
// Note: In a production app, you should call your own backend to hide the API key
// Note: The Groq client SDK instantiation was removed because it was unused and caused a crash when the API key was missing.

export const useChat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const conversationHistory = useRef<any[]>([
    { role: "system", content: SYSTEM_PROMPT }
  ]);

  const handleSend = async (userText: string) => {
    if (!userText.trim()) return;

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    // Check if API key is present
    if (!apiKey || apiKey === 'your_groq_api_key_here' || apiKey.length < 10) {
      setMessages(prev => [...prev, 
        { role: "user", text: userText },
        { role: "assistant", text: "La clé API Groq n'est pas configurée ou est invalide. Veuillez vérifier votre fichier .env et redémarrer le serveur (npm run dev)." }
      ]);
      return;
    }

    // Add user message to UI and history
    const userMessage = { role: "user", text: userText };
    setMessages(prev => [...prev, userMessage]);
    conversationHistory.current.push({ role: "user", content: userText });

    setIsTyping(true);

    try {
      // Direct call with explicit headers
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey.trim()}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant", // Updated model (llama3-8b-8192 was decommissioned)
          messages: conversationHistory.current,
          temperature: 0.6,
          max_tokens: 512,
          stream: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Groq API Error Details:", errorData);
        // If it's a 403 or 401, it's likely a key issue or a CORS issue that fetch can't handle directly
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices[0]?.message?.content || "Je n'ai pas pu générer de réponse.";

      // Add assistant reply to history
      conversationHistory.current.push({ role: "assistant", content: reply });

      // Update UI
      const botMessage = { role: "assistant", text: reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      console.error("Chat Error:", error);
      
      let errorText = "Désolé, je rencontre un problème technique. Peux-tu réessayer ?";
      
      if (error.message.includes("401") || error.message.toLowerCase().includes("auth")) {
        errorText = "Erreur d'authentification : Votre clé API Groq semble invalide.";
      } else if (error.message.includes("429")) {
        errorText = "Limite de requêtes atteinte (Rate Limit). Veuillez patienter un instant.";
      }

      setMessages(prev => [...prev, { 
        role: "assistant", 
        text: errorText 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    isTyping,
    handleSend,
    setMessages
  };
};
