import React from "react";

interface Loader2Props {
  message?: string;
  size?: number; // make it scalable
}

const Loader2: React.FC<Loader2Props> = ({ 
  message = "Loading...", 
  size = 80 
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      
      {/* Main Loader */}
      <div className="relative" style={{ width: size, height: size }}>
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-gray-300 dark:border-gray-700 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-indigo-500 rounded-full animate-spin"></div>
        
        {/* Inner Ring */}
        <div className="absolute inset-2 border-2 border-transparent border-b-purple-500 rounded-full animate-reverse-spin"></div>
        
        {/* Center Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* Loading Text */}
      {message && (
        <div className="text-center">
          <div className="text-sm font-medium text-gray-800 dark:text-white mb-3">
            {message}
          </div>
          
          {/* Simple Progress Dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce-delay-0"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce-delay-1"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce-delay-2"></div>
          </div>
        </div>
      )}
      
      {/* Progress Bar */}
      <div className="w-40 h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-progress-bar"></div>
      </div>
      
      <style jsx>{`
        @keyframes reverse-spin {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes bounce-delay-0 {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounce-delay-1 {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          45% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounce-delay-2 {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          50% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes progress-bar {
          0% {
            transform: translateX(-100%) scaleX(0);
          }
          50% {
            transform: translateX(-50%) scaleX(1);
          }
          100% {
            transform: translateX(100%) scaleX(0);
          }
        }

        :global(.animate-reverse-spin) {
          animation: reverse-spin 2s linear infinite;
        }

        :global(.animate-bounce-delay-0) {
          animation: bounce-delay-0 1.4s ease-in-out infinite;
        }

        :global(.animate-bounce-delay-1) {
          animation: bounce-delay-1 1.4s ease-in-out infinite;
        }

        :global(.animate-bounce-delay-2) {
          animation: bounce-delay-2 1.4s ease-in-out infinite;
        }

        :global(.animate-progress-bar) {
          animation: progress-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader2;
