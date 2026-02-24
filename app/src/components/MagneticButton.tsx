import React, { useRef, useCallback } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  download?: string;
  'data-cursor-text'?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.4,
  radius = 150,
  onClick,
  href,
  target,
  rel,
  type = 'button',
  disabled = false,
  download,
  'data-cursor-text': cursorText,
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);
  const boundingRef = useRef<DOMRect | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const button = buttonRef.current;
    const content = contentRef.current;
    if (!button || !content || !boundingRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = boundingRef.current;

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < radius) {
      const factor = 1 - distance / radius;
      
      gsap.to(button, {
        x: distanceX * strength * factor,
        y: distanceY * strength * factor,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(content, {
        x: distanceX * strength * 0.5 * factor,
        y: distanceY * strength * 0.5 * factor,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [strength, radius]);

  const handleMouseLeave = useCallback(() => {
    const button = buttonRef.current;
    const content = contentRef.current;
    if (!button || !content) return;

    gsap.to([button, content], {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;
    boundingRef.current = button.getBoundingClientRect();
  }, []);

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={onClick}
        href={href}
        target={target}
        rel={rel}
        download={download}
        data-cursor-text={cursorText}
        data-cursor-hover
      >
        <span ref={contentRef} className="relative z-10">
          {children}
        </span>
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type={type}
      className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      disabled={disabled}
      data-cursor-text={cursorText}
      data-cursor-hover
    >
      <span ref={contentRef} className="relative z-10">
        {children}
      </span>
    </button>
  );
};

export default MagneticButton;
