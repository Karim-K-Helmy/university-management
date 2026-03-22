import React from 'react';

export const SkeletonCard = () => (
  <div className="card p-4 space-y-3">
    <div className="skeleton h-44 w-full" />
    <div className="skeleton h-4 w-3/4" />
    <div className="skeleton h-3 w-full" />
    <div className="skeleton h-3 w-2/3" />
    <div className="flex gap-2 pt-2">
      <div className="skeleton h-8 w-24" />
    </div>
  </div>
);

export const SkeletonRow = () => (
  <div className="flex items-center gap-4 p-4" style={{ borderBottom: '1px solid #DDD3C2' }}>
    <div className="skeleton w-10 h-10" />
    <div className="flex-1 space-y-2">
      <div className="skeleton h-4 w-1/3" />
      <div className="skeleton h-3 w-1/4" />
    </div>
    <div className="skeleton h-5 w-16" />
  </div>
);

export const SkeletonStat = () => (
  <div className="stat-card">
    <div className="skeleton w-12 h-12" />
    <div className="flex-1 space-y-2">
      <div className="skeleton h-6 w-16" />
      <div className="skeleton h-3 w-24" />
    </div>
  </div>
);
