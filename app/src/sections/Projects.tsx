import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Parking Spot Detection System',
    description: 'Real-time video analytics pipeline for IoT applications. Optimized for real-time inference balancing accuracy and speed.',
    image: '/project-parking.jpg',
    tags: ['PyTorch', 'Computer Vision', 'Real-time Analytics', 'IoT'],
    github: 'https://github.com/RobelYonas',
    demo: null,
    color: '#e67e22',
  },
  {
    title: 'HomeSync IoT Control App',
    description: 'Event-driven hardware control with fault-tolerant communication. Embedded systems integration with low-latency data flow.',
    image: '/project-homesync.jpg',
    tags: ['Kotlin', 'Arduino', 'Socket.IO', 'Embedded Systems'],
    github: 'https://github.com/RobelYonas',
    demo: null,
    color: '#3498db',
  },
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const grid = gridRef.current;

    if (!section || !heading || !grid) return;

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

      // Project cards animation
      const cards = grid.querySelectorAll('.project-card');
      cards.forEach((card, cardIndex) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            rotateX: 15,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            delay: cardIndex * 0.2,
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

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

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
    setHoveredIndex(null);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 sm:py-32 lg:py-40 bg-charcoal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="mb-16 lg:mb-24">
          <span className="text-primary text-sm font-body tracking-widest uppercase mb-4 block">
            Projects
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-offwhite mb-4">
            Featured Work
          </h2>
          <p className="text-offwhite-muted font-body max-w-xl">
            A selection of projects showcasing my expertise in data engineering, 
            computer vision, and IoT development.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 gap-8"
          style={{ perspective: '1000px' }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative overflow-hidden rounded-2xl bg-charcoal-light border border-border hover:border-primary/50 transition-colors duration-500">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent z-10"
                  />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Hover overlay */}
                  <div 
                    className={`absolute inset-0 bg-primary/20 z-20 transition-opacity duration-300 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* View button */}
                  <div 
                    className={`absolute top-4 right-4 z-30 transition-all duration-300 ${
                      hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                    }`}
                  >
                    <MagneticButton
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-offwhite rounded-full flex items-center justify-center text-charcoal hover:bg-primary hover:text-white transition-colors duration-300"
                      data-cursor-text="View"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </MagneticButton>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <h3 className="font-display text-xl sm:text-2xl text-offwhite mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-offwhite-muted text-sm font-body leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-body bg-border/50 text-offwhite-muted rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    <MagneticButton
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-body text-offwhite-muted hover:text-primary transition-colors duration-300"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </MagneticButton>
                    {project.demo && (
                      <MagneticButton
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-body text-offwhite-muted hover:text-primary transition-colors duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </MagneticButton>
                    )}
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

export default Projects;
