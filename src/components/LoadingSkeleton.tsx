import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="h-full bg-white animate-pulse">
      {/* Sidebar skeleton */}
      <div className="fixed left-0 top-0 h-full w-64 border-r border-gray-200 bg-white p-4">
        <div className="mb-8 h-8 w-32 bg-gray-200 rounded"></div>
        <div className="space-y-4">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <div className="h-4 w-28 bg-gray-200 rounded"></div>
          <div className="space-y-2 mt-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-6 w-full bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="ml-64 flex h-full">
        <div className="w-80 border-r border-gray-200 p-4">
          <div className="mb-4 h-10 w-full bg-gray-200 rounded"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="flex-1">
                  <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-48 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 border-r border-gray-200 p-4">
          <div className="mb-4 h-8 w-48 bg-gray-200 rounded"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                <div className="flex-1">
                  <div className="h-3 w-48 bg-gray-200 rounded mb-2"></div>
                  <div className="h-16 w-full bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-80 p-4">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-12 w-full bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};