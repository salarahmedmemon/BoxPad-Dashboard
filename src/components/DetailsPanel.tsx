import React, { useState } from 'react';
import { User as UserType } from '../types';

interface DetailsPanelProps {
  contact: UserType | null;
  loading: boolean;
  assignee?: string;
  team?: string;
  labels?: string[];
  onClose?: () => void;
  isMobile?: boolean;
}

export const DetailsPanel: React.FC<DetailsPanelProps> = ({
  contact,
  loading,
  assignee = 'James West',
  team = 'Sales Team',
  labels = ['Closed Won', 'Chicago'],
  onClose,
  isMobile,
}) => {
  const [notes, setNotes] = useState<string>('Strong potential for future upgrades');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState(notes);

  const handleSaveNotes = () => {
    setNotes(tempNotes);
    setIsEditingNotes(false);
  };

  if (loading) {
    return (
      <div className="h-full border-l border-gray-200 bg-white p-4 rounded-[8.42px]">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
          <div className="h-20 w-full bg-gray-200 rounded"></div>
          <div className="h-6 w-40 bg-gray-200 rounded"></div>
          <div className="h-24 w-full bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="flex h-full items-center justify-center border-l border-gray-200 bg-white p-4 rounded-[8.42px]">
        <p className="text-gray-400">Select a contact to view details</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto border-l border-gray-200 bg-white rounded-[8.42px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden relative">
      {/* Close button – visible only on mobile */}
      {isMobile && onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 left-3 z-10 p-1 bg-gray-100 rounded-full"
          aria-label="Close details"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}

      <div className='text-lg font-semibold text-black flex items-center justify-between p-4'>
        <h3 className="">Details</h3>
        <img className='h-6' src='/assets/img/sidemenu.svg' alt='sidemenu icon' />
      </div>

      {/* Chat Data */}
      <div className="mb-4 border-t-[0.7px] border-b-[0.7px] border-[#D8DEE4] p-4">
        <div className='flex items-center justify-between'>
          <h4 className="mb-2 text-sm font-medium text-gray-700">Chat Data</h4>
          <img src='/assets/img/down-chevron.svg' alt='down chevron icon' />
        </div>
        <div className="space-y-3 mt-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Assignee:</span>
            <div className='flex items-center gap-2'>
              <img src='/assets/img/chat-data.svg' alt='chat data profile icon' />
              <span className="font-medium text-gray-900">{assignee}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Team:</span>
            <div className='flex items-center gap-2'>
              <img src='/assets/img/chat-data.svg' alt='chat data profile icon' />
              <span className="font-medium text-gray-900">{team}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Data */}
      <div className="mb-6 p-4">
        <h4 className="mb-3 text-sm font-medium text-gray-700">Contact Data</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-start gap-8 text-sm">
            <span className='text-gray-400'>First Name</span>
            <span className="text-black">{contact.firstName}</span>
          </div>
          <div className="flex items-center justify-start gap-8 text-sm">
            <span className='text-gray-400'>Last Name</span>
            <span className="text-black">{contact.lastName}</span>
          </div>
          <div className="flex items-center justify-start gap-8 text-sm">
            <span className='text-gray-400'>Phone Number</span>
            <span className="text-black">{contact.phone}</span>
          </div>
          <div className="flex items-center justify-start gap-8 text-sm">
            <span className='text-gray-400'>Email</span>
            <a href={`mailto:${contact.email}`} className="text-black hover:underline">
              {contact.email}
            </a>
          </div>
          <span className='block mt-10 text-sm text-black'>See all</span>
        </div>
      </div>

      {/* Labels */}
      <div className="p-4 border-t-[0.7px] border-b-[0.7px] border-[#D8DEE4]">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-700">Contact Labels</h4>
          <img src='/assets/img/down-chevron.svg' alt='down chevron icon' />
        </div>
        <div className="flex flex-wrap gap-2">
          {labels.map((label, idx) => (
            <span
              key={idx}
              className="flex items-center gap-1 rounded-full bg-[#E5F1FC] px-3 py-2 text-xs text-[#007AEC] border-[1.4px] border-[#007AEC]"
            >
              {idx === 0 && (
                <img src="/assets/img/label.svg" alt="label icon" className="h-3 w-3" />
              )}
              {label}
            </span>
          ))}
          <button className="rounded-full bg-[#E5F1FC] px-3 py-1 text-[18px] text-[#007AEC] border-[1.4px] border-[#007AEC]">
            +
          </button>
        </div>
      </div>

      {/* Notes */}
      <div className="p-4">
        <div className="mb-2">
          <div className='flex items-center justify-between mb-2'>
            <h4 className="text-sm font-medium text-gray-700">Notes</h4>
            <img src='/assets/img/down-chevron.svg' alt='down chevron icon' />
          </div>
          <button
            onClick={() => {
              setIsEditingNotes(true);
              setTempNotes(notes);
            }}
            className="w-full h-[25px] bg-[#F5E096] rounded-[5.61px] px-[7.02px] text-left text-sm text-gray-500"
          >
            {'Add a note'}
          </button>
        </div>
        {isEditingNotes ? (
          <div className="space-y-2">
            <textarea
              value={tempNotes}
              onChange={(e) => setTempNotes(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
              rows={3}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveNotes}
                className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditingNotes(false)}
                className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="w-full bg-[#F5E096] rounded-[5.61px] p-[7.02px] text-sm text-black">{notes || 'Add a note'}</p>
        )}
      </div>

      {/* Other Chats */}
      <div className='p-4'>
        <div className='flex items-center justify-between'>
          <h4 className="mb-2 text-sm font-medium text-gray-700">Other Chats</h4>
          <img src='/assets/img/down-chevron.svg' alt='down chevron icon' />
        </div>
        <div className='w-full flex justify-between'>
          <div className='flex items-center gap-2'>
            <img src='/assets/img/instagram.svg' alt='instagram icon' />
            <div className='flex flex-col'>
              <span className='text-[14px] text-black'>Fit4Life</span>
              <span className='text-[12px] mt-[-4px] text-gray-400'>On my way!</span>
            </div>
          </div>
          <span className='text-[12px] text-[#00000066]'>08/08/25</span>
        </div>
      </div>
    </div>
  );
};