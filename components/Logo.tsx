
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  customLogo?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-16", showText = false, customLogo }) => {
  if (customLogo) {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <img src={customLogo} alt="Logo" className="h-full w-auto object-contain rounded-lg" />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg viewBox="0 0 240 240" className="h-full w-auto overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="120" cy="120" r="95" stroke="#768841" strokeWidth="8" />
        <path d="M55 110 C 65 45 115 35 220 22" stroke="#768841" strokeWidth="7" strokeLinecap="round" />
        <path d="M48 118 C 70 165 125 170 195 130" stroke="#768841" strokeWidth="6" strokeLinecap="round" />
        <path d="M45 140 C 75 195 140 195 205 155" stroke="#768841" strokeWidth="6" strokeLinecap="round" />
        <path d="M55 170 C 90 215 150 215 200 175" stroke="#768841" strokeWidth="6" strokeLinecap="round" />
      </svg>
      {showText && (
        <div className="flex flex-col items-center -mt-1 opacity-0 pointer-events-none">
          <h1 className="text-4xl font-terroa-title font-black text-terroa-brown tracking-[0.05em] leading-none uppercase relative">TERROÁ</h1>
          <span className="text-lg font-terroa-script text-terroa-green mt-1 leading-tight lowercase">a essência da raiz</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
