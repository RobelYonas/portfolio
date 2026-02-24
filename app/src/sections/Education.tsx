import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    degree: 'M.Sc. Software Engineering and Management',
    school: 'University of Gothenburg',
    location: 'Gothenburg, Sweden',
    period: '2025 – 2027 (Expected)',
    description: 'Focus: Data-Intensive Systems, Requirements Engineering, Quality Assurance',
    courses: ['Data Engineering', 'Software Architecture', 'Project Management'],
  },
  {
    degree: 'B.S. Computer Science',
    school: 'Kristianstad University',
    location: 'Kristianstad, Sweden',
    period: '2022 – 2025',
    description: 'Concentrations: Database Systems, Machine Learning, Software Testing',
    courses: ['Database Design', 'ML Algorithms', 'Software Quality'],
  },
];

const Education: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;

    if (!section || !heading || !cards) return;

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

      // Cards animation with 3D tilt
      const cardElements = cards.querySelectorAll('.education-card');
      cardElements.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    gsap.to(card, {
      rotateX: -rotateX,
      rotateY: -rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-24 sm:py-32 lg:py-40 bg-charcoal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="mb-16 lg:mb-24">
          <span className="text-primary text-sm font-body tracking-widest uppercase mb-4 block">
            Education
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-offwhite mb-4">
            Academic Background
          </h2>
          <p className="text-offwhite-muted font-body max-w-xl">
            A strong foundation in computer science and software engineering, 
            with specialized focus on data-intensive systems.
          </p>
        </div>

        {/* Education Cards */}
        <div
          ref={cardsRef}
          className="space-y-6"
          style={{ perspective: '1000px' }}
        >
          {education.map((edu, index) => (
            <div
              key={index}
              className="education-card"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="glass rounded-2xl p-6 sm:p-8 lg:p-10 border border-border hover:border-primary/30 transition-all duration-500 group">
                <div className="grid lg:grid-cols-3 gap-6 lg:gap-10">
                  {/* Left: Degree & School */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-offwhite mb-2 group-hover:text-primary transition-colors duration-300">
                          {edu.degree}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-offwhite-muted text-sm font-body">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {edu.school}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {edu.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-offwhite-muted font-body leading-relaxed mb-4">
                      {edu.description}
                    </p>
                  </div>

                  {/* Right: Courses */}
                  <div className="lg:border-l lg:border-border lg:pl-10">
                    <div className="flex items-center gap-2 mb-4 text-primary">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm font-body font-medium">Key Courses</span>
                    </div>
                    <ul className="space-y-2">
                      {edu.courses.map((course, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-offwhite-muted text-sm font-body"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
