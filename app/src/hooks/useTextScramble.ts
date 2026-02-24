import { useRef, useCallback } from 'react';
import gsap from 'gsap';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export const useTextScramble = () => {
  const elementRef = useRef<HTMLElement>(null);
  const originalTextRef = useRef('');
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const scramble = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    if (!originalTextRef.current) {
      originalTextRef.current = element.textContent || '';
    }

    const originalText = originalTextRef.current;
    const length = originalText.length;

    if (animationRef.current) {
      animationRef.current.kill();
    }

    let iteration = 0;
    const maxIterations = length * 3;

    animationRef.current = gsap.to({}, {
      duration: 0.8,
      ease: 'power2.inOut',
      onUpdate: function() {
        const progress = this.progress();
        iteration = Math.floor(progress * maxIterations);

        let result = '';
        for (let i = 0; i < length; i++) {
          if (originalText[i] === ' ') {
            result += ' ';
          } else if (i < iteration / 3) {
            result += originalText[i];
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        element.textContent = result;
      },
      onComplete: () => {
        element.textContent = originalText;
      },
    });
  }, []);

  const reset = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    if (animationRef.current) {
      animationRef.current.kill();
    }
    element.textContent = originalTextRef.current;
  }, []);

  return { elementRef, scramble, reset };
};

export default useTextScramble;
