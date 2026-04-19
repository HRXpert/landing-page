"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Activity {
  id: number;
  action: string;
  user: string;
  time: string;
  type: 'success' | 'warning' | 'info' | 'error';
}

interface ActivityFeedProps {
  activities: Activity[];
  title?: string;
  viewAllLink?: string;
  className?: string;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  title = "Recent Activities",
  viewAllLink,
  className = ""
}) => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'success':
        return { icon: '✓', color: 'text-green-400', bg: 'bg-green-600/20' };
      case 'warning':
        return { icon: '⚠', color: 'text-orange-400', bg: 'bg-orange-600/20' };
      case 'error':
        return { icon: '✕', color: 'text-red-400', bg: 'bg-red-600/20' };
      default:
        return { icon: 'ℹ', color: 'text-blue-400', bg: 'bg-blue-600/20' };
    }
  };

  return (
    <div className={`bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {viewAllLink && (
          <Link href={viewAllLink} className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center">
            View all <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        )}
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const activityStyle = getActivityIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg">
              <div className={`p-2 rounded-lg ${activityStyle.bg} flex items-center justify-center w-8 h-8`}>
                <span className={`text-sm ${activityStyle.color}`}>
                  {activityStyle.icon}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">{activity.action}</p>
                <p className="text-gray-400 text-xs">by {activity.user}</p>
              </div>
              <span className="text-gray-400 text-xs">{activity.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;
