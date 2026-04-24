import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white">
      <div className="relative">
        {/* Animated logo or circle */}
        <div className="w-16 h-16 border-2 border-gray-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-primary rounded-full animate-spin"></div>
        
        {/* Logo text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-[10px] font-bold tracking-widest uppercase">B</span>
        </div>
      </div>
      
      <p className="mt-6 font-serif italic text-xs tracking-[0.3em] text-gray-400 uppercase animate-pulse">
        Bazario
      </p>
    </div>
  );
};

export default LoadingScreen;
