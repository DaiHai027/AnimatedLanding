import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: 'fas fa-brain',
    title: 'AI-Powered Matching',
    description: 'Connect with like-minded individuals through our advanced AI algorithm that understands your interests and preferences.',
    gradient: 'from-purple-500 to-purple-600',
    hoverColor: 'hover:border-purple-500/50',
    shadowColor: 'hover:shadow-purple-500/10'
  },
  {
    icon: 'fas fa-shield-alt',
    title: 'Privacy First',
    description: 'Your data is protected with end-to-end encryption and advanced privacy controls. You decide who sees what.',
    gradient: 'from-pink-500 to-pink-600',
    hoverColor: 'hover:border-pink-500/50',
    shadowColor: 'hover:shadow-pink-500/10'
  },
  {
    icon: 'fas fa-vr-cardboard',
    title: 'Immersive Experiences',
    description: 'Join virtual spaces, attend events, and experience social interaction in completely new dimensions.',
    gradient: 'from-cyan-500 to-cyan-600',
    hoverColor: 'hover:border-cyan-500/50',
    shadowColor: 'hover:shadow-cyan-500/10'
  },
  {
    icon: 'fas fa-comments',
    title: 'Smart Conversations',
    description: 'Real-time translation, sentiment analysis, and conversation starters help you connect meaningfully across cultures.',
    gradient: 'from-purple-500 to-pink-500',
    hoverColor: 'hover:border-purple-500/50',
    shadowColor: 'hover:shadow-purple-500/10'
  },
  {
    icon: 'fas fa-users',
    title: 'Community Building',
    description: 'Create and join communities around your passions. Host events, share content, and build lasting relationships.',
    gradient: 'from-pink-500 to-cyan-500',
    hoverColor: 'hover:border-pink-500/50',
    shadowColor: 'hover:shadow-pink-500/10'
  },
  {
    icon: 'fas fa-mobile-alt',
    title: 'Cross-Platform Sync',
    description: 'Seamlessly switch between devices. Your conversations, connections, and content are always in sync.',
    gradient: 'from-cyan-500 to-purple-500',
    hoverColor: 'hover:border-cyan-500/50',
    shadowColor: 'hover:shadow-cyan-500/10'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose{' '}
            <span className="text-gradient-purple-pink">SocialSphere</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Discover the innovative features that make our platform the future of social networking.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="relative group h-full">
                {/* Animated border */}
                <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-rotate"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500"></div>
                
                <Card className={`relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/80 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${feature.shadowColor} h-full`}>
                  <CardContent className="p-0">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <i className={`${feature.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
