export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image?: string;
  company?: {
    name: string;
    title: string;
  };
  address?: {
    city: string;
    country: string;
  };
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'contact';
  timestamp: Date;
}

export interface ChatMessage {
  id: number;
  body: string;
  name: string;
  email: string;
}

export interface InboxStats {
  all: number;
  unassigned: number;
}

export interface TeamStats {
  sales: number;
  customerSupport: number;
}

export interface UserWithPreview extends User {
  lastMessage?: string;
  lastMessageTime?: Date;
}