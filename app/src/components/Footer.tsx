import React from 'react';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 bg-charcoal border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center lg:text-left">
            <a
              href="#hero"
              className="font-display text-2xl text-offwhite hover:text-primary transition-colors duration-300 inline-block mb-2"
            >
              Robel Yonas
            </a>
            <p className="text-offwhite-muted text-sm font-body">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="#about"
              className="text-sm font-body text-offwhite-muted hover:text-offwhite transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#experience"
              className="text-sm font-body text-offwhite-muted hover:text-offwhite transition-colors duration-300"
            >
              Experience
            </a>
            <a
              href="#projects"
              className="text-sm font-body text-offwhite-muted hover:text-offwhite transition-colors duration-300"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-sm font-body text-offwhite-muted hover:text-offwhite transition-colors duration-300"
            >
              Contact
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <MagneticButton
              href="https://github.com/RobelYonas"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-charcoal-light border border-border flex items-center justify-center text-offwhite-muted hover:text-primary hover:border-primary transition-all duration-300"
            >
              <Github className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-charcoal-light border border-border flex items-center justify-center text-offwhite-muted hover:text-primary hover:border-primary transition-all duration-300"
            >
              <Linkedin className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton
              href="mailto:robel4872@gmail.com"
              className="w-10 h-10 rounded-full bg-charcoal-light border border-border flex items-center justify-center text-offwhite-muted hover:text-primary hover:border-primary transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>

        {/* Made with love */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-offwhite-muted text-sm font-body flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> in Gothenburg
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
