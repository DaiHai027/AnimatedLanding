import { motion } from 'framer-motion';

const footerLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#' },
    { name: 'API', href: '#' },
    { name: 'Integrations', href: '#' }
  ],
  company: [
    { name: 'About', href: '#about' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Contact', href: '#contact' }
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Status', href: '#' }
  ]
};

const socialLinks = [
  { icon: 'fab fa-twitter', href: '#', color: 'hover:text-purple-400' },
  { icon: 'fab fa-instagram', href: '#', color: 'hover:text-pink-400' },
  { icon: 'fab fa-linkedin', href: '#', color: 'hover:text-cyan-400' },
  { icon: 'fab fa-discord', href: '#', color: 'hover:text-purple-400' }
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative py-12 px-4 border-t border-slate-800/50" id="contact">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <svg width="32" height="32" viewBox="0 0 32 32" className="drop-shadow-lg">
                  <defs>
                    <linearGradient id="footerSphereGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#8b5cf6', stopOpacity: 1}} />
                      <stop offset="50%" style={{stopColor: '#ec4899', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#06b6d4', stopOpacity: 1}} />
                    </linearGradient>
                    <linearGradient id="footerInnerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0.3}} />
                      <stop offset="100%" style={{stopColor: '#ffffff', stopOpacity: 0}} />
                    </linearGradient>
                  </defs>
                  {/* Main sphere */}
                  <circle cx="16" cy="16" r="14" fill="url(#footerSphereGradient)" />
                  {/* Inner glow */}
                  <circle cx="16" cy="16" r="12" fill="url(#footerInnerGlow)" />
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
            <p className="text-slate-400 mb-4">Connecting people beyond boundaries through innovative social technology.</p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className={`text-slate-400 ${link.color} transition-colors duration-200`}
                >
                  <i className={`${link.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-slate-400">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="hover:text-white transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-slate-400">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="hover:text-white transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-slate-400">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="hover:text-white transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
        
        <motion.div 
          className="border-t border-slate-800/50 pt-8 text-center text-slate-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2024 SocialSphere. All rights reserved. Built with love for the future of social connection.</p>
          <p className="text-xs mt-2 opacity-50">
            Hint: Try the classic sequence... ↑↑↓↓←→←→BA 🎮
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
