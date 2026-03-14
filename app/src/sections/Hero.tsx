import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleBackground from '@/components/ParticleBackground';
import MagneticButton from '@/components/MagneticButton';
import { ChevronDown, Mail, Github, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const name = nameRef.current;
    const title = titleRef.current;
    const tagline = taglineRef.current;
    const cta = ctaRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!section || !name || !title || !tagline || !cta || !scrollIndicator) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(name, { opacity: 0, y: 100, rotateX: 45 });
      gsap.set(title, { opacity: 0, filter: 'blur(20px)' });
      gsap.set(tagline, { opacity: 0, y: 30 });
      gsap.set(cta.children, { opacity: 0, y: 20 });
      gsap.set(scrollIndicator, { opacity: 0, y: -20 });

      // Entrance timeline
      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(name, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        ease: 'power3.out',
      })
        .to(
          title,
          {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.6'
        )
        .to(
          tagline,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .to(
          cta.children,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .to(
          scrollIndicator,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.2'
        );

      // Scroll-triggered exit animation
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(name, {
            y: -progress * 200,
            opacity: 1 - progress,
            duration: 0.1,
          });
          gsap.to(title, {
            y: -progress * 150,
            opacity: 1 - progress,
            duration: 0.1,
          });
          gsap.to(tagline, {
            y: -progress * 100,
            opacity: 1 - progress,
            duration: 0.1,
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Name */}
        <h1
          ref={nameRef}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-medium tracking-tight text-offwhite mb-4"
          style={{ perspective: '1000px' }}
        >
          ROBEL YONAS
        </h1>

        {/* Title */}
        <p
          ref={titleRef}
          className="text-xl sm:text-2xl md:text-3xl font-body font-light text-primary mb-6 tracking-wide"
        >
          Software Engineer & Problem Solver
        </p>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-base sm:text-lg md:text-xl font-body text-offwhite-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          M.Sc. Software Engineering Student
          <br />
          <span className="text-sm sm:text-base">
            Building data pipelines that process millions of records. Transforming complex data into intelligent solutions.
          </span>
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <MagneticButton
            href="mailto:robel4872@gmail.com"
            className="px-8 py-3 bg-primary text-white font-body font-medium rounded-full hover:bg-burnt-dark transition-colors duration-300"
            data-cursor-text="Email"
          >
            <Mail className="w-4 h-4 mr-2" />
            Get in Touch
          </MagneticButton>

          <MagneticButton
            href="https://github.com/RobelYonas"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-offwhite/30 text-offwhite font-body font-medium rounded-full hover:border-primary hover:text-primary transition-colors duration-300"
            data-cursor-text="GitHub"
          >
            <Github className="w-4 h-4 mr-2" />
            View GitHub
          </MagneticButton>

          <MagneticButton
            href="https://www.linkedin.com/in/robel-yonas/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-offwhite/30 text-offwhite font-body font-medium rounded-full hover:border-primary hover:text-primary transition-colors duration-300"
            data-cursor-text="LinkedIn"
          >
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </MagneticButton>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
          onClick={scrollToAbout}
        >
          <span className="text-xs text-offwhite-muted mb-2 font-body tracking-widest uppercase">
            Scroll
          </span>
          <div className="animate-bounce">
            <ChevronDown className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
