import React from 'react';

interface SidebarProps {
  inboxStats: { all: number; unassigned: number };
  teamStats: { sales: number; customerSupport: number };
  usersList: Array<{ name: string; count: number }>;
  onClose?: () => void;
  isMobile?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  inboxStats,
  teamStats,
  usersList,
  onClose,
  isMobile,
}) => {
  return (
    <div className="h-full w-64 border-r border-gray-200 bg-white overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-l-[5.61px] relative">
      {/* Close button – visible only on mobile */}
      {isMobile && onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 p-1 bg-gray-100 rounded-full"
          aria-label="Close sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}

      <div className="p-5">
        <div className="mb-[13.55px] flex items-center gap-2">
          <h1 className="text-xl font-bold text-gray-900">Inbox</h1>
        </div>

        {/* My Inbox */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src='/assets/img/profile.svg' alt='profile icon.' />
              <span className="font-medium text-gray-700">My Inbox</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className='flex gap-2'>
                <img src='/assets/img/people.svg' alt='peoples icon.' />
                <span className="font-medium text-gray-700">All</span>
              </div>
              <span className="font-medium text-gray-900">{inboxStats.all}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className='flex gap-2'>
                <img src='/assets/img/unassigned.svg' alt='unassigned icon.' />
                <span className="font-medium text-gray-700">Unassigned</span>
              </div>
              <span className="font-medium text-gray-900">{inboxStats.unassigned}</span>
            </div>
          </div>
        </div>

        {/* Teams */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between gap-2">
            <span className="font-medium text-gray-700">Teams</span>
            <img src='/assets/img/down-chevron.svg' alt='down chevron icon' />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className='flex gap-2'>
                <img src='/assets/img/sales.svg' alt='sales icon.' />
                <span className="text-gray-600">Sales</span>
              </div>
              <span className="font-medium text-gray-900">{teamStats.sales}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className='flex gap-2'>
                <img src='/assets/img/sales.svg' alt='sales icon.' />
                <span className="text-gray-600">Customer Support</span>
              </div>
              <span className="font-medium text-gray-900">{teamStats.customerSupport}</span>
            </div>
          </div>
        </div>

        {/* Users */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-medium text-gray-700">Users</span>
            <img src='/assets/img/down-chevron.svg' alt='down-chevron icon' />
          </div>

          <div className="space-y-4">
            {usersList.map((user, idx) => (
              idx === 1 ? (
                <div className='w-full h-[28px] relative' key={idx}>
                  <div className="absolute w-[110%] top-[-10px] left-[-11px] flex bg-white rounded-[5.61px] border-[0.7px] border-[#D8DEE4] shadow-[0_10px_30px_rgba(231,235,236,1)] p-[10px] justify-between text-sm">
                    <div className='flex items-center gap-2'>
                      <img src='/assets/img/user.svg' alt='user icon.' />
                      <span className="text-gray-600">{user.name}</span>
                    </div>
                    <span className="font-medium text-gray-900">{user.count}</span>
                  </div>
                </div>
              ) : (
                <div key={idx} className="flex justify-between text-sm my-6">
                  <div className='flex items-center gap-2'>
                    <img src='/assets/img/user.svg' alt='user icon.' />
                    <span className="text-gray-600">{user.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">{user.count}</span>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Bottom Links */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="font-medium text-gray-700">Channels</span>
            <img src='/assets/img/down-chevron.svg' alt='down-chevron icon' />
          </div>

          <div className='w-full h-[28px] relative'>
            <div className="absolute w-[110%] top-[0px] left-[-11px] flex bg-white rounded-[5.61px] border-[0.7px] border-[#D8DEE4] shadow-[0_10px_30px_rgba(231,235,236,1)] p-[10px] justify-between text-sm">
              <div className='flex items-center gap-2'>
                <img src='/assets/img/whatsapp.svg' alt='whatsapp icon.' />
                <span className="text-gray-600">Fit4Life</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between text-sm mt-8">
            <div className='flex items-center gap-2'>
              <img src='/assets/img/instagram.svg' alt='instagram icon.' />
              <span className="text-gray-600">Fit4Life</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};