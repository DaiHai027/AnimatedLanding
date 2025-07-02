import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <svg width="32" height="32" viewBox="0 0 32 32" className="drop-shadow-lg">
                <defs>
                  <linearGradient id="sphereGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#8b5cf6', stopOpacity: 1}} />
                    <stop offset="50%" style={{stopColor: '#ec4899', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#06b6d4', stopOpacity: 1}} />
                  </linearGradient>
                  <linearGradient id="innerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0.3}} />
                    <stop offset="100%" style={{stopColor: '#ffffff', stopOpacity: 0}} />
                  </linearGradient>
                </defs>
                {/* Main sphere */}
                <circle cx="16" cy="16" r="14" fill="url(#sphereGradient)" />
                {/* Inner glow */}
                <circle cx="16" cy="16" r="12" fill="url(#innerGlow)" />
                {/* Network connections */}
                <g stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.8">
                  <path d="M8 12 L24 12" />
                  <path d="M6 20 L26 20" />
                  <path d="M16 4 L16 28" />
                  <path d="M12 6 L20 26" />
                  <path d="M20 6 L12 26" />
                </g>
                {/* Connection nodes */}
                <g fill="#ffffff">
                  <circle cx="8" cy="12" r="1.5" />
                  <circle cx="24" cy="12" r="1.5" />
                  <circle cx="6" cy="20" r="1.5" />
                  <circle cx="26" cy="20" r="1.5" />
                  <circle cx="16" cy="4" r="1.5" />
                  <circle cx="16" cy="28" r="1.5" />
                  <circle cx="12" cy="6" r="1.5" />
                  <circle cx="20" cy="26" r="1.5" />
                  <circle cx="20" cy="6" r="1.5" />
                  <circle cx="12" cy="26" r="1.5" />
                </g>
              </svg>
            </div>
            <span className="text-xl font-bold text-gradient-purple-pink">SocialSphere</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Contact
            </button>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('activateEasterEgg'))}
              className="text-slate-300 hover:text-purple-400 transition-colors duration-200 group"
              title="Play Brick Breaker"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="transition-transform group-hover:scale-110">
                <path d="M18 8h-2V4c0-1.1-.9-2-2-2H10c-1.1 0-2 .9-2 2v4H6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zM10 4h4v4h-4V4zm8 14H6v-6h12v6z"/>
                <circle cx="8" cy="16" r="1"/>
                <circle cx="16" cy="16" r="1"/>
                <circle cx="12" cy="14" r="0.5"/>
                <circle cx="12" cy="18" r="0.5"/>
                <circle cx="10" cy="16" r="0.5"/>
                <circle cx="14" cy="16" r="0.5"/>
              </svg>
            </button>
            <Button className="bg-gradient-purple-pink hover:opacity-90 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
              Sign Up
            </Button>
          </div>
          
          <button 
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 py-4">
            <div className="flex flex-col space-y-4 px-4">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-slate-300 hover:text-white transition-colors duration-200 text-left"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-slate-300 hover:text-white transition-colors duration-200 text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-slate-300 hover:text-white transition-colors duration-200 text-left"
              >
                Contact
              </button>
              <button 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('activateEasterEgg'));
                  setIsMobileMenuOpen(false);
                }}
                className="text-slate-300 hover:text-purple-400 transition-colors duration-200 text-left flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-2V4c0-1.1-.9-2-2-2H10c-1.1 0-2 .9-2 2v4H6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zM10 4h4v4h-4V4zm8 14H6v-6h12v6z"/>
                  <circle cx="8" cy="16" r="1"/>
                  <circle cx="16" cy="16" r="1"/>
                  <circle cx="12" cy="14" r="0.5"/>
                  <circle cx="12" cy="18" r="0.5"/>
                  <circle cx="10" cy="16" r="0.5"/>
                  <circle cx="14" cy="16" r="0.5"/>
                </svg>
                Play Brick Breaker
              </button>
              <Button className="bg-gradient-purple-pink hover:opacity-90 px-4 py-2 rounded-lg font-medium transition-all duration-200 w-fit">
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
