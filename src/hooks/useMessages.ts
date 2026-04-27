import { useState, useEffect } from 'react';
import { Message, ChatMessage } from '../types';

export function useMessages(userId: number | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setMessages([]);
      return;
    }

    const fetchMessages = async () => {
      try {
        setLoading(true);
        // Use postId = userId to get comments from JSONPlaceholder
        const response = await fetch(`${import.meta.env.VITE_JSON_API}comments?postId=${userId}`);
        const data: ChatMessage[] = await response.json();
        
        // Transform comments into chat messages with simulated timestamps
        const chatMessages: Message[] = data.slice(0, 8).map((comment, index) => ({
          id: comment.id,
          text: comment.body,
          sender: index % 2 === 0 ? 'contact' : 'user',
          timestamp: new Date(Date.now() - (8 - index) * 15 * 60 * 1000),
        }));
        
        // Add a welcome/first message from the contact
        const welcomeMessage: Message = {
          id: 0,
          text: `Hi! I'm ${getContactName(userId)}. How can I help you today?`,
          sender: 'contact',
          timestamp: new Date(Date.now() - 120 * 60 * 1000),
        };
        
        setMessages([welcomeMessage, ...chatMessages]);
        setError(null);
      } catch (err) {
        setError('Failed to load messages');
        console.error(err);
        // Set fallback messages
        setMessages(getFallbackMessages());
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userId]);

  const sendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return { messages, loading, error, sendMessage };
}

function getContactName(userId: number): string {
  const names: Record<number, string> = {
    1: 'Emily',
    2: 'Michael',
    3: 'Sarah',
    4: 'David',
    5: 'Jessica',
  };
  return names[userId] || 'Support Agent';
}

function getFallbackMessages(): Message[] {
  return [
    {
      id: 1,
      text: "Hi, I recently joined Fit4Life and I'm trying to access my workout plan, but I can't login. Can you help?",
      sender: 'contact',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
    },
    {
      id: 2,
      text: "Hello! I'm Michael, your AI customer support assistant. Let's fix this quickly. Could you confirm the email address?",
      sender: 'user',
      timestamp: new Date(Date.now() - 55 * 60 * 1000),
    },
    {
      id: 3,
      text: "Yes, it's olivia.mckinsey@gmail.com",
      sender: 'contact',
      timestamp: new Date(Date.now() - 50 * 60 * 1000),
    },
    {
      id: 4,
      text: "I see it. Resetting your password now...",
      sender: 'user',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
    },
    {
      id: 5,
      text: "Done! I'm logged in. Thanks!",
      sender: 'contact',
      timestamp: new Date(Date.now() - 40 * 60 * 1000),
    },
    {
      id: 6,
      text: "Oh my god 😱 I'll try it ASAP, thank you so much!!",
      sender: 'contact',
      timestamp: new Date(Date.now() - 35 * 60 * 1000),
    },
  ];
}