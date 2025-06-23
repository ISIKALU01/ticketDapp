import React from 'react';
import { Heart, Sparkles, MessageSquare, Phone, ChevronRight } from 'lucide-react';

const MeetFreekzAngels = () => {
  return (
    <div className="w-full relative overflow-hidden shadow-2xl border border-pink-500/30 mb-10">
      {/* Background Image with Blur Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 p-8 md:p-12 lg:p-16 text-white">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-4">
            <Sparkles className="w-8 h-8 text-pink-400 mr-3" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-raleway bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Meet Freekz Angels
            </h2>
          </div>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl mb-6 text-pink-100">
            Connect with stunning models and influencers ready to meet
          </p>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-pink-900/30 backdrop-blur-sm p-4 rounded-xl border border-pink-500/20">
              <div className="flex items-center mb-2">
                <Heart className="w-5 h-5 text-pink-400 mr-2" />
                <h3 className="font-semibold">Verified Profiles</h3>
              </div>
              <p className="text-sm text-pink-100">100% real women with complete background checks</p>
            </div>
            
            <div className="bg-purple-900/30 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20">
              <div className="flex items-center mb-2">
                <MessageSquare className="w-5 h-5 text-purple-400 mr-2" />
                <h3 className="font-semibold">Direct Contact</h3>
              </div>
              <p className="text-sm text-purple-100">Get personal phone numbers and social media links</p>
            </div>
            
            <div className="bg-fuchsia-900/30 backdrop-blur-sm p-4 rounded-xl border border-fuchsia-500/20">
              <div className="flex items-center mb-2">
                <Phone className="w-5 h-5 text-fuchsia-400 mr-2" />
                <h3 className="font-semibold">Discreet Service</h3>
              </div>
              <p className="text-sm text-fuchsia-100">100% private arrangements with no public records</p>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-black/40 p-6 rounded-xl border border-white/10">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Ready for unforgettable experiences?</h3>
              <p className="text-pink-200">Join 5,000+ satisfied members worldwide</p>
            </div>
            <button className="flex items-center justify-center px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg hover:shadow-pink-500/30">
              Get Started Now
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center mt-8 gap-4 text-xs text-white/70">
            <span>✓ 24/7 Support</span>
            <span>✓ Premium Screening</span>
            <span>✓ Satisfaction Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetFreekzAngels;