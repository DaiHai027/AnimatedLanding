import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-cyan-600/5"></div>
      <motion.div 
        className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Main Content Container */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-3xl p-16 shadow-2xl">
            <motion.h2 
              className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Connect?
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Join millions of users already experiencing the future of social media. 
              Download SocialSphere today and start building meaningful connections.
            </motion.p>
            
            {/* Download Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button className="group relative bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 border border-slate-600 hover:border-slate-500 px-10 py-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center min-w-[200px]">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <i className="fab fa-apple mr-4 text-3xl relative z-10"></i>
                <div className="text-left relative z-10">
                  <div className="text-sm text-slate-400">Download for</div>
                  <div className="text-xl font-bold text-white">iOS</div>
                </div>
              </Button>
              
              <Button className="group relative bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 border border-slate-600 hover:border-slate-500 px-10 py-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center min-w-[200px]">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <i className="fab fa-google-play mr-4 text-3xl text-green-400 relative z-10"></i>
                <div className="text-left relative z-10">
                  <div className="text-sm text-slate-400">Download for</div>
                  <div className="text-xl font-bold text-white">Android</div>
                </div>
              </Button>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-8 text-slate-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-sm"></i>
                  ))}
                </div>
                <span className="font-semibold text-white">4.9</span>
                <span>Rating</span>
              </div>
              <div className="h-4 w-px bg-slate-600"></div>
              <span className="flex items-center gap-2">
                <i className="fas fa-download text-green-400"></i>
                Free Download
              </span>
              <div className="h-4 w-px bg-slate-600"></div>
              <span className="flex items-center gap-2">
                <i className="fas fa-shield-alt text-blue-400"></i>
                No Ads
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
