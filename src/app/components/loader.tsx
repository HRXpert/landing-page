import React from 'react';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  message = "Loading..." 
}) => {
  // Standard size classes for full-screen loader
  const sizeClasses = {
    container: 'w-24 h-24',
    text: 'text-lg',
    dots: 'w-3 h-3',
    pulse: 'w-12 h-12',
  };

  const LoaderContent = () => (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Main Animated Loader */}
      <div className="relative">
        {/* Outer Rotating Ring */}
        <div className={`${sizeClasses.container} relative`}>
          <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-indigo-400 animate-spin"></div>
          
          {/* Middle Pulsing Ring */}
          <div className="absolute inset-2 rounded-full border-2 border-gray-600 animate-pulse"></div>
          
          {/* Inner Rotating Ring (Opposite Direction) */}
          <div className="absolute inset-4 rounded-full border-2 border-transparent border-b-purple-500 border-l-purple-400 animate-reverse-spin"></div>
          
          {/* Center Pulsing Dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`${sizeClasses.pulse} bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse-scale`}></div>
          </div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            <div className={`${sizeClasses.dots} bg-indigo-400 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 animate-float-1`}></div>
            <div className={`${sizeClasses.dots} bg-purple-400 rounded-full absolute top-1/2 right-0 transform -translate-y-1/2 animate-float-2`}></div>
            <div className={`${sizeClasses.dots} bg-blue-400 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-float-3`}></div>
            <div className={`${sizeClasses.dots} bg-cyan-400 rounded-full absolute top-1/2 left-0 transform -translate-y-1/2 animate-float-4`}></div>
          </div>
        </div>
        
        {/* Glowing Effect */}
        <div className={`absolute inset-0 ${sizeClasses.container} rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl animate-glow`}></div>
      </div>
      
      {/* Loading Text with Typing Animation */}
      <div className="text-center">
        <div className={`${sizeClasses.text} font-semibold text-white animate-text-shimmer bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent bg-[length:200%_auto]`}>
          {message}
        </div>
        
        {/* Animated Dots */}
        <div className="flex justify-center space-x-1 mt-2">
          <div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce-delay-0"></div>
          <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce-delay-1"></div>
          <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce-delay-2"></div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full animate-progress-bar"></div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 flex items-center justify-center z-50">
      <LoaderContent />
      
      <style jsx>{`
        @keyframes reverse-spin {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(0.3);
            opacity: 0.8;
          }
          50% {
            transform: scale(0.7);
            opacity: 1;
          }
        }

        @keyframes float-1 {
          0%, 100% {
            transform: translate(-50%, -20px) scale(0.8);
            opacity: 0.6;
          }
          50% {
            transform: translate(-50%, -40px) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes float-2 {
          0%, 100% {
            transform: translate(20px, -50%) scale(0.8);
            opacity: 0.6;
          }
          50% {
            transform: translate(40px, -50%) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes float-3 {
          0%, 100% {
            transform: translate(-50%, 20px) scale(0.8);
            opacity: 0.6;
          }
          50% {
            transform: translate(-50%, 40px) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes float-4 {
          0%, 100% {
            transform: translate(-20px, -50%) scale(0.8);
            opacity: 0.6;
          }
          50% {
            transform: translate(-40px, -50%) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(0.9);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        @keyframes text-shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
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

        :global(.animate-pulse-scale) {
          animation: pulse-scale 2s ease-in-out infinite;
        }

        :global(.animate-float-1) {
          animation: float-1 3s ease-in-out infinite;
        }

        :global(.animate-float-2) {
          animation: float-2 3s ease-in-out infinite 0.5s;
        }

        :global(.animate-float-3) {
          animation: float-3 3s ease-in-out infinite 1s;
        }

        :global(.animate-float-4) {
          animation: float-4 3s ease-in-out infinite 1.5s;
        }

        :global(.animate-glow) {
          animation: glow 2s ease-in-out infinite;
        }

        :global(.animate-text-shimmer) {
          animation: text-shimmer 3s ease-in-out infinite;
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

export default Loader;
