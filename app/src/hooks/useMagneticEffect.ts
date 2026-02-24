import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export const useMagneticEffect = <T extends HTMLElement>(options: MagneticOptions = {}) => {
  const { strength = 0.3, radius = 100 } = options;
  const elementRef = useRef<T>(null);
  const boundingRef = useRef<DOMRect | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const element = elementRef.current;
    if (!element || !boundingRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = boundingRef.current;

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < radius) {
      const factor = 1 - distance / radius;
      gsap.to(element, {
        x: distanceX * strength * factor,
        y: distanceY * strength * factor,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [strength, radius]);

  const handleMouseLeave = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;
    boundingRef.current = element.getBoundingClientRect();
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseEnter, handleMouseMove, handleMouseLeave]);

  return elementRef;
};

export default useMagneticEffect;
