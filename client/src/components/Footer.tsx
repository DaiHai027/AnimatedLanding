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
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-purple-pink rounded-lg flex items-center justify-center">
                <i className="fas fa-sphere text-white text-sm"></i>
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
        </motion.div>
      </div>
    </footer>
  );
}
