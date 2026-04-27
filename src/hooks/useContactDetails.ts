import { useState, useEffect } from 'react';
import { User } from '../types';

export function useContactDetails(userId: number | null) {
  const [contact, setContact] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setContact(null);
      return;
    }

    const fetchContactDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_DUMMY_API}users/${userId}`);
        const data = await response.json();
        
        setContact({
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          image: `https://i.pravatar.cc/150?img=${data.id}`,
          company: data.company,
          address: data.address,
        });
        setError(null);
      } catch (err) {
        setError('Failed to load contact details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, [userId]);

  return { contact, loading, error };
}