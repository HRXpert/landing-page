"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  trend?: {
    value: string;
    isPositive: boolean;
    icon: LucideIcon;
  };
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBgColor,
  trend,
  className = ""
}) => {
  return (
    <div className={`bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className={`${iconBgColor} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
      {trend && (
        <div className="flex items-center mt-4 text-sm">
          <trend.icon className={`w-4 h-4 mr-1 ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`} />
          <span className={trend.isPositive ? 'text-green-400' : 'text-red-400'}>
            {trend.value}
          </span>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
