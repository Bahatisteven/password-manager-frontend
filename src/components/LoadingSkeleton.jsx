import React from 'react';

const LoadingSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-bw-surface border border-bw-border rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-bw-border h-10 w-10"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-bw-border rounded w-3/4"></div>
                <div className="h-3 bg-bw-border rounded w-1/2"></div>
              </div>
              <div className="h-4 bg-bw-border rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;