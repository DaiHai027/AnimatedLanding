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
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-purple-pink rounded-lg flex items-center justify-center">
              <i className="fas fa-sphere text-white text-sm"></i>
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
