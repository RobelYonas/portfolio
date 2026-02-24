import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experienceFields = [
  { value: 'Data', label: 'Data Engineering' },
  { value: 'Software', label: 'Software Development' },
  { value: 'Mobile', label: 'Mobile Development' },
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const text = textRef.current;
    const imageContainer = imageContainerRef.current;
    const image = imageRef.current;
    const statsEl = statsRef.current;

    if (!section || !heading || !text || !imageContainer || !image || !statsEl) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        heading,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Text paragraphs stagger
      const paragraphs = text.querySelectorAll('p');
      gsap.fromTo(
        paragraphs,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image reveal with mask
      gsap.fromTo(
        imageContainer,
        { 
          clipPath: 'circle(0% at 50% 50%)',
          opacity: 0 
        },
        {
          clipPath: 'circle(75% at 50% 50%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: imageContainer,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image parallax
      gsap.to(image, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: imageContainer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Stats counter animation
      const statItems = statsEl.querySelectorAll('.stat-item');
      gsap.fromTo(
        statItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsEl,
            start: 'top 85%',
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
      id="about"
      className="relative py-24 sm:py-32 lg:py-40 bg-charcoal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-primary text-sm font-body tracking-widest uppercase mb-4 block">
            About Me
          </span>
          <h2
            ref={headingRef}
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-offwhite"
          >
            Profile
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            ref={imageContainerRef}
            className="relative aspect-square max-w-md mx-auto lg:mx-0 overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10" />
            <img
              ref={imageRef}
              src="/profile-photo.png"
              alt="Robel Yonas"
              className="w-full h-full object-cover scale-110"
            />
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-primary/30 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full -z-10" />
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <div ref={textRef} className="space-y-4">
              <p className="text-lg sm:text-xl text-offwhite font-body leading-relaxed">
                I am an M.Sc. Software Engineering student at the University of Gothenburg 
                with a strong foundation in Python, SQL, and Data Engineering.
              </p>
              <p className="text-base text-offwhite-muted font-body leading-relaxed">
                I have hands-on experience building data pipelines processing 17M+ records 
                and developing backend APIs in agile teams. I thrive at the intersection 
                of deep technical work and human collaboration, making me suited for 
                consultative roles.
              </p>
              <p className="text-base text-offwhite-muted font-body leading-relaxed">
                Currently based in Gothenburg, Sweden, I'm passionate about transforming 
                complex data into intelligent solutions that drive real-world impact.
              </p>
            </div>

            {/* Experience Fields */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-border"
            >
              {experienceFields.map((field, index) => (
                <div key={index} className="stat-item text-center lg:text-left">
                  <div className="font-display text-2xl sm:text-3xl text-primary mb-1">
                    {field.value}
                  </div>
                  <div className="text-sm text-offwhite-muted font-body">
                    {field.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
