import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const useCustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // Check for touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Add custom cursor class to body
    document.body.classList.add('custom-cursor-enabled');

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.3 });
      gsap.to(cursorDot, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
      gsap.to(cursorDot, { opacity: 0, duration: 0.3 });
    };

    // Handle hoverable elements
    const handleElementMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);
      const text = target.getAttribute('data-cursor-text') || '';
      setCursorText(text);
    };

    const handleElementMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    // Add event listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleElementMouseEnter);
      el.addEventListener('mouseleave', handleElementMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.classList.remove('custom-cursor-enabled');
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementMouseEnter);
        el.removeEventListener('mouseleave', handleElementMouseLeave);
      });
    };
  }, []);

  // Update hover listeners when DOM changes
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleElementMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);
      const text = target.getAttribute('data-cursor-text') || '';
      setCursorText(text);
    };

    const handleElementMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementMouseEnter);
        el.removeEventListener('mouseleave', handleElementMouseLeave);
        el.addEventListener('mouseenter', handleElementMouseEnter);
        el.addEventListener('mouseleave', handleElementMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return { cursorRef, cursorDotRef, isHovering, cursorText };
};

export default useCustomCursor;
