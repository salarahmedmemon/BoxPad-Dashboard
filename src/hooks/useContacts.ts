import { useState, useEffect } from 'react';
import { UserWithPreview } from '../types';

export function useContacts() {
  const [contacts, setContacts] = useState<UserWithPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        console.log(import.meta.env.VITE_DUMMY_API);
        const response = await fetch(`${import.meta.env.VITE_DUMMY_API}users?limit=12`);
        const data = await response.json();
        
        const users: UserWithPreview[] = data.users.map((user: any) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          image: `https://i.pravatar.cc/150?img=${user.id}`,
          company: user.company,
          address: user.address,
          lastMessage: getRandomPreviewMessage(),
          lastMessageTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        }));
        
        setContacts(users);
        setError(null);
      } catch (err) {
        setError('Failed to load contacts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return { contacts, loading, error };
}

function getRandomPreviewMessage(): string {
  const messages = [
    'Hey! How are you doing?',
    'Thanks for your help!',
    'I have a question about my account',
    'Looking forward to our meeting',
    'Can you send me the files?',
    'Thanks for the quick response!',
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}