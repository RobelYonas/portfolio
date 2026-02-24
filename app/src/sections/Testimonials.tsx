import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Linkedin } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Tim Omorogieva',
    role: 'Founder Youngstival | Spaces | Impact 44',
    date: 'April 20, 2025',
    image: '/tim-omorogieva.png',
    linkedin: 'https://www.linkedin.com/in/tim-omorogieva-506aa9114/',
    text: `Robel Yonas made outstanding contributions to our mobile app project by building a secure and robust booking system using Kotlin and Firebase Firestore. He skillfully implemented authentication mechanisms, database rules, and real-time availability logic—ensuring both security and a smooth user experience.

Robel also developed a highly functional admin dashboard with dynamic visualizations that helped us monitor app activity with ease. His code was not only effective but cleanly written and well-documented. He's a highly driven and thoughtful developer, and I would enthusiastically recommend him for any project requiring backend expertise and end-to-end system integration.`,
  },
  {
    name: 'Fredrick Onwuegbuzie',
    role: 'Software Development Student at Kristianstad University',
    date: 'March 19, 2025',
    image: '/fredrick-onwuegbuzie.png',
    linkedin: 'https://www.linkedin.com/in/fredrick-onwuegbuzie-84b14221a/',
    text: `I'm reaching out to highly recommend Robel Yonas for a developer role. Robel is a dedicated and skilled developer with a strong passion for building efficient and scalable solutions. He's always eager to learn, adapt, and take on new challenges, making him a valuable asset to any team.

Robel has a solid understanding of programming principles and problem-solving techniques. He picks up new technologies quickly and writes clean, maintainable code. He's also a great team player—easy to work with, proactive, and always open to feedback. Whether collaborating on projects or working independently, he consistently delivers quality results.

Beyond his technical abilities, Robel brings a strong work ethic and a positive attitude. He's always pushing himself to improve and contribute meaningfully to the team. Any company looking for a talented and motivated developer would be lucky to have him.`,
  },
  {
    name: 'David Okeke',
    role: 'Software developer || Java, Python, JavaScript, React',
    date: 'March 13, 2025',
    image: '/david-okeke.png',
    linkedin: 'https://www.linkedin.com/in/david-okeke-tobe/',
    text: `I am pleased to write this letter of recommendation for Robel Yonas Tesfaye Bekele. As a skilled and dedicated software developer, Robel has consistently demonstrated strong problem-solving abilities, technical expertise, and a passion for innovation.

With a deep understanding of modern programming languages, frameworks, and best practices, Robel excels in building efficient and scalable software solutions. His ability to collaborate with teams, adapt to new technologies, and write clean, maintainable code makes him a valuable asset to any development project.

Beyond his technical skills, Robel is highly reliable, detail-oriented, and always eager to learn and improve. His professionalism and commitment to excellence set him apart. I am confident that he will make a significant contribution to any organization he joins.

I highly recommend Robel Yonas Tesfaye Bekele for any software development role.`,
  },
];

const Testimonials: React.FC = () => {
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

      // Cards animation
      const cardElements = cards.querySelectorAll('.testimonial-card');
      cardElements.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
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

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 sm:py-32 lg:py-40 bg-charcoal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="mb-16 lg:mb-24">
          <span className="text-primary text-sm font-body tracking-widest uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-offwhite mb-4">
            What People Say
          </h2>
          <p className="text-offwhite-muted font-body max-w-xl">
            Recommendations from colleagues and collaborators I've had the pleasure of working with.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div ref={cardsRef} className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card group"
            >
              <div className="glass rounded-2xl p-6 sm:p-8 h-full border border-border hover:border-primary/30 transition-all duration-500 relative">
                {/* Quote Icon - positioned absolute */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center pointer-events-none">
                  <Quote className="w-5 h-5 text-primary" />
                </div>

                {/* Content - with padding to avoid quote icon */}
                <div className="mb-6 pr-14">
                  <p className="text-offwhite-muted font-body text-sm leading-relaxed whitespace-pre-line">
                    {testimonial.text}
                  </p>
                </div>

                {/* Author */}
                <div className="pt-6 border-t border-border">
                  <div className="flex items-center gap-4">
                    {/* Profile Image */}
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-lg text-offwhite mb-0.5 truncate">
                        {testimonial.name}
                      </div>
                      <div className="text-offwhite-muted text-sm font-body mb-0.5 line-clamp-1">
                        {testimonial.role}
                      </div>
                      <div className="text-offwhite-muted/60 text-xs font-body">
                        {testimonial.date}
                      </div>
                    </div>
                    {/* LinkedIn Link */}
                    <MagneticButton
                      href={testimonial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-charcoal-light border border-border flex items-center justify-center text-offwhite-muted hover:text-primary hover:border-primary transition-all duration-300 flex-shrink-0"
                    >
                      <Linkedin className="w-4 h-4" />
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LinkedIn CTA */}
        <div className="mt-12 text-center">
          <MagneticButton
            href="https://linkedin.com/in/robel-yonas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full text-offwhite-muted hover:text-primary hover:border-primary transition-all duration-300"
          >
            <Linkedin className="w-5 h-5" />
            <span className="font-body text-sm">View more on LinkedIn</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
