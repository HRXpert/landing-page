import React from 'react';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 border border-gray-700 rounded-xl p-8 shadow-sm hover:shadow-indigo-500/30 hover:border-indigo-500 transition-all duration-300 min-w-0 flex-shrink-0 w-full min-h-[260px] flex flex-col">
      <div className="w-14 h-14 bg-gray-900 rounded-lg flex items-center justify-center mb-4 shadow shadow-indigo-500/20">
        <Icon className="w-7 h-7 text-indigo-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-base leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard; 