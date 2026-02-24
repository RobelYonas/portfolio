import React from 'react';
import { useCustomCursor } from '@/hooks/useCustomCursor';

const CustomCursor: React.FC = () => {
  const { cursorRef, cursorDotRef, isHovering, cursorText } = useCustomCursor();

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2
          transition-all duration-150 ease-out
          ${isHovering ? 'w-20 h-20' : 'w-10 h-10'}
          ${cursorText ? 'w-24 h-24' : ''}
        `}
        style={{
          opacity: 0,
        }}
      >
        <div
          className={`w-full h-full rounded-full border transition-all duration-300
            ${isHovering 
              ? 'border-primary bg-primary/10 scale-110' 
              : 'border-offwhite/50 bg-transparent'
            }
          `}
        />
        {cursorText && (
          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary">
            {cursorText}
          </span>
        )}
      </div>

      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2
          w-1.5 h-1.5 rounded-full bg-primary transition-all duration-100
          ${isHovering ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
        `}
        style={{
          opacity: 0,
        }}
      />
    </>
  );
};

export default CustomCursor;
