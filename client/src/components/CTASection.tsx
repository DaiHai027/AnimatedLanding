import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function CTASection() {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-12">
            <CardContent className="p-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Connect?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join millions of users already experiencing the future of social media. Download SocialSphere today and start building meaningful connections.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button className="group bg-black hover:bg-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  <i className="fab fa-apple mr-3 text-2xl"></i>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download for</div>
                    <div className="text-lg font-bold">iOS</div>
                  </div>
                </Button>
                <Button className="group bg-black hover:bg-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  <i className="fab fa-google-play mr-3 text-2xl text-green-400"></i>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download for</div>
                    <div className="text-lg font-bold">Android</div>
                  </div>
                </Button>
              </div>
              
              <div className="flex items-center justify-center space-x-4 text-sm text-slate-400">
                <span className="flex items-center">
                  <i className="fas fa-star text-yellow-400 mr-1"></i>
                  4.9 Rating
                </span>
                <span>•</span>
                <span>Free Download</span>
                <span>•</span>
                <span>No Ads</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
