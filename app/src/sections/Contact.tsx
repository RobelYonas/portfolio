import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Linkedin, MapPin, Download } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'robel4872@gmail.com',
    href: 'mailto:robel4872@gmail.com',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/RobelYonas',
    href: 'https://github.com/RobelYonas',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/robel-yonas',
    href: 'https://linkedin.com/in/robel-yonas',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Gothenburg, Sweden',
    href: null,
  },
];

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;

    if (!section || !heading || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        content.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 sm:py-32 lg:py-40 bg-charcoal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="mb-16 lg:mb-24 text-center">
          <span className="text-primary text-sm font-body tracking-widest uppercase mb-4 block">
            Contact
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-offwhite mb-6">
            Let's Build Something
            <br />
            <span className="text-primary">Intelligent</span>
          </h2>
          <p className="text-offwhite-muted font-body max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or 
            opportunities to be part of your vision.
          </p>
        </div>

        {/* Content */}
        <div ref={contentRef} className="max-w-4xl mx-auto">
          {/* CV Download Button */}
          <div className="text-center mb-12">
            <MagneticButton
              href="/main_cv.pdf"
              download="Robel_Yonas_CV.pdf"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-body font-medium rounded-full hover:bg-burnt-dark transition-colors duration-300"
            >
              <Download className="w-5 h-5" />
              Download My CV
            </MagneticButton>
          </div>

          {/* Contact Info Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {contactInfo.map((item, index) => {
              const CardContent = (
                <div className="flex items-center gap-5 p-5">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-offwhite-muted font-body uppercase tracking-wider mb-1">
                      {item.label}
                    </div>
                    <div className="text-offwhite font-body text-base truncate">
                      {item.value}
                    </div>
                  </div>
                </div>
              );

              return (
                <div key={index}>
                  {item.href ? (
                    <MagneticButton
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="block w-full rounded-xl bg-charcoal-light border border-border hover:border-primary/50 transition-all duration-300 text-left"
                    >
                      {CardContent}
                    </MagneticButton>
                  ) : (
                    <div className="block w-full rounded-xl bg-charcoal-light border border-border">
                      {CardContent}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Social Links */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm text-offwhite-muted font-body mb-6">
              Or find me on social media
            </p>
            <div className="flex justify-center gap-4">
              <MagneticButton
                href="https://github.com/RobelYonas"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-charcoal-light border border-border flex items-center justify-center text-offwhite-muted hover:text-primary hover:border-primary transition-all duration-300"
              >
                <Github className="w-6 h-6" />
              </MagneticButton>
              <MagneticButton
                href="https://linkedin.com/in/robel-yonas"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-charcoal-light border border-border flex items-center justify-center text-offwhite-muted hover:text-primary hover:border-primary transition-all duration-300"
              >
                <Linkedin className="w-6 h-6" />
              </MagneticButton>
              <MagneticButton
                href="mailto:robel4872@gmail.com"
                className="w-14 h-14 rounded-full bg-charcoal-light border border-border flex items-center justify-center text-offwhite-muted hover:text-primary hover:border-primary transition-all duration-300"
              >
                <Mail className="w-6 h-6" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
