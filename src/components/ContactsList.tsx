import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { UserWithPreview } from '../types';

interface ContactsListProps {
  contacts: UserWithPreview[];
  selectedContactId: number | null;
  onSelectContact: (contactId: number) => void;
  loading: boolean;
}

/* ---------------- Avatar Helpers ---------------- */

const colors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-yellow-500',
  'bg-indigo-500',
];

function getInitial(name: string) {
  return name?.charAt(0)?.toUpperCase() || '?';
}

function getColor(name: string) {
  const index =
    (name?.charCodeAt(0) || 0) + (name?.charCodeAt(1) || 0);
  return colors[index % colors.length];
}

/* ---------------- Component ---------------- */

export const ContactsList: React.FC<ContactsListProps> = ({
  contacts,
  selectedContactId,
  onSelectContact,
  loading,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const filteredContacts = contacts.filter((contact) =>
    `${contact.firstName} ${contact.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (sortBy === 'newest') {
      return (
        (b.lastMessageTime?.getTime() || 0) -
        (a.lastMessageTime?.getTime() || 0)
      );
    }

    return (
      (a.lastMessageTime?.getTime() || 0) -
      (b.lastMessageTime?.getTime() || 0)
    );
  });

  return (
    <div className="h-full flex flex-col border-r border-gray-200 rounded-r-[5.61px] bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              className="h-5"
              src="/assets/img/minimize.svg"
              alt="minimize icon"
            />
            <h2 className="text-lg font-semibold text-gray-900">
              Michael Johnson
            </h2>
          </div>

          <img
            className="h-5"
            src="/assets/img/compose.svg"
            alt="compose icon"
          />
        </div>

        {/* Search */}
        <div className="relative mb-3 flex items-center gap-2">
          <img
            className="h-5"
            src="/assets/img/search.svg"
            alt="search icon"
          />

          <input
            type="text"
            placeholder="Search Chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg py-2 pr-4 text-[13px] focus:border-blue-500 focus:outline-none"
          />

          <img
            className="h-5"
            src="/assets/img/filter.svg"
            alt="filter icon"
          />
        </div>

        {/* Filters */}
        <div className="flex justify-between">
          <button className="flex items-center gap-1 rounded-md px-3 py-1 text-sm text-black">
            Open <ChevronDown size={16} />
          </button>

          <button
            onClick={() =>
              setSortBy(sortBy === 'newest' ? 'oldest' : 'newest')
            }
            className="flex items-center gap-1 rounded-md px-3 py-1 text-sm text-black"
          >
            {sortBy === 'newest' ? 'Newest' : 'Oldest'}
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {loading ? (
          <div className="p-4 text-center text-gray-500">
            Loading contacts...
          </div>
        ) : (
          sortedContacts.map((contact) => {
            const fullName = `${contact.firstName} ${contact.lastName}`;

            return (
              <button
                key={contact.id}
                onClick={() => onSelectContact(contact.id)}
                className={`w-full border-b border-gray-100 p-4 text-left transition-colors hover:bg-gray-50 ${
                  selectedContactId === contact.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold ${getColor(
                      contact.firstName
                    )}`}
                  >
                    {getInitial(contact.firstName)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        {fullName}
                      </h3>

                      {contact.lastMessageTime && (
                        <span className="text-xs text-gray-400">
                          {formatTime(contact.lastMessageTime)}
                        </span>
                      )}
                    </div>

                    <p className="mt-0.5 truncate text-sm text-gray-500">
                      {contact.lastMessage || 'No messages yet'}
                    </p>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

/* ---------------- Time Formatter ---------------- */

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = diff / (1000 * 60 * 60);

  if (hours < 24) {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return date.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
  });
}