import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
}

export const useScrollAnimation = <T extends HTMLElement>(
  animationCallback: (element: T, gsapInstance: typeof gsap) => gsap.core.Timeline | gsap.core.Tween | void,
  options: ScrollAnimationOptions = {}
) => {
  const elementRef = useRef<T>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const result = animationCallback(element, gsap);
      
      if (result) {
        const trigger = ScrollTrigger.create({
          trigger: options.trigger || element,
          start: options.start || 'top 80%',
          end: options.end || 'bottom 20%',
          scrub: options.scrub,
          markers: options.markers,
          toggleActions: options.toggleActions || 'play none none reverse',
          animation: result,
          onEnter: options.onEnter,
          onLeave: options.onLeave,
        });
        triggersRef.current.push(trigger);
      }
    }, element);

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, [animationCallback, options]);

  return elementRef;
};

export const useParallax = <T extends HTMLElement>(speed: number = 0.5) => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        y: () => speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, element);

    return () => ctx.revert();
  }, [speed]);

  return elementRef;
};

export const useRevealAnimation = <T extends HTMLElement>(
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  delay: number = 0
) => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const directions = {
      up: { y: 40, x: 0 },
      down: { y: -40, x: 0 },
      left: { y: 0, x: 40 },
      right: { y: 0, x: -40 },
    };

    const { x, y } = directions[direction];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { opacity: 0, x, y },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [direction, delay]);

  return elementRef;
};

export default useScrollAnimation;
