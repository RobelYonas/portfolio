import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: 'Data Engineering Researcher (Thesis)',
    company: 'Kristianstad University',
    location: 'Kristianstad, Sweden',
    period: 'Feb 2025 – Jun 2025',
    description: [
      'Engineered Python data pipeline for 17M+ records, simulating Data Warehouse environment',
      'Optimized complex SQL queries for transformation and ML preprocessing',
      'Presented technical findings to stakeholders',
    ],
    skills: ['Python', 'SQL', 'Data Warehouse', 'ML Preprocessing'],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Luday SE',
    location: 'Gothenburg, Sweden',
    period: 'Jun 2024 – Sep 2024',
    description: [
      'Full-stack development with Python backend and TypeScript frontend',
      'Designed PostgreSQL schemas and integrated REST APIs',
      'Agile/Scrum team collaboration with consultative approach',
    ],
    skills: ['Python', 'TypeScript', 'PostgreSQL', 'REST APIs', 'Agile'],
  },
  {
    title: 'Mobile Software Engineer',
    company: 'Youngstival',
    location: 'Remote',
    period: 'Oct 2024 – Jun 2025',
    description: [
      'Kotlin and Firebase development with real-time data synchronization',
      'Analyzed user feedback to prioritize features and improve stability',
      'Rapid adaptation to new technologies and legacy code refactoring',
    ],
    skills: ['Kotlin', 'Firebase', 'Android', 'Real-time Data'],
  },
];

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const timeline = timelineRef.current;
    const line = lineRef.current;

    if (!section || !heading || !timeline || !line) return;

    const ctx = gsap.context(() => {
      // Heading animation
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

      // Timeline line animation
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Experience cards animation
      const cards = timeline.querySelectorAll('.experience-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: -60,
            rotateY: 15,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Dot animation
        const dot = card.querySelector('.timeline-dot');
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.4,
              delay: 0.3,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 sm:py-32 lg:py-40 bg-charcoal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="mb-16 lg:mb-24">
          <span className="text-primary text-sm font-body tracking-widest uppercase mb-4 block">
            Experience
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-offwhite mb-4">
            Work History
          </h2>
          <p className="text-offwhite-muted font-body max-w-xl">
            A journey through data engineering, software development, and mobile engineering roles.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div
            ref={lineRef}
            className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent origin-top"
          />

          {/* Experience Cards */}
          <div className="space-y-12 lg:space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`experience-card relative lg:grid lg:grid-cols-2 lg:gap-8 ${
                  index !== experiences.length - 1 ? 'lg:pb-16' : ''
                }`}
                style={{ perspective: '1000px' }}
              >
                {/* Timeline Dot */}
                <div className="timeline-dot absolute left-4 lg:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 top-0 z-10 shadow-glow" />

                {/* Content */}
                <div
                  className={`pl-12 lg:pl-0 ${
                    index % 2 === 0
                      ? 'lg:pr-16 lg:text-right'
                      : 'lg:col-start-2 lg:pl-16'
                  }`}
                >
                  <div className="glass rounded-xl p-6 sm:p-8 hover:border-primary/50 transition-colors duration-300 group">
                    {/* Header */}
                    <div className={`mb-4 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                      <div className="flex items-center gap-2 mb-2 text-primary lg:justify-start">
                        <Briefcase className="w-4 h-4" />
                        <span className="text-sm font-body">{exp.period}</span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl text-offwhite mb-1">
                        {exp.title}
                      </h3>
                      <div className={`flex items-center gap-4 text-offwhite-muted text-sm font-body ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.company}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <ul className={`space-y-2 mb-6 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="text-offwhite-muted text-sm font-body leading-relaxed"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Skills */}
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                      {exp.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-body bg-primary/10 text-primary rounded-full border border-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
