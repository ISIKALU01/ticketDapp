import React from 'react';
import { Lock, Star, Gem, Video, Image as ImageIcon } from 'lucide-react';

const ExclusiveContentVault = () => {
  // Sample premium content thumbnails
  const previewContent = [
    { type: 'video', title: 'Backstage Interview' },
    { type: 'image', title: 'VIP Party Photos' },
    { type: 'video', title: 'Soundcheck Footage' },
    { type: 'image', title: 'Meet & Greet' }
  ];

  return (
    <div className="max-w-md bg-gradient-to-br from-purple-900/80 to-black/90 border border-purple-500/30 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 p-4 flex items-center">
        <div className="bg-yellow-400/90 p-2 rounded-lg mr-3">
          <Lock className="w-6 h-6 text-purple-900" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white font-raleway">Exclusive Content Vault</h3>
          <p className="text-sm text-purple-200">Superfan Access Only</p>
        </div>
      </div>

      {/* Blurred Preview Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {previewContent.map((item, index) => (
            <div 
              key={index} 
              className="relative aspect-square bg-purple-950/50 rounded-lg overflow-hidden border border-purple-500/20"
            >
              {/* Blurred content placeholder */}
              <div className="absolute inset-0 backdrop-blur-md flex items-center justify-center">
                {item.type === 'video' ? (
                  <Video className="w-8 h-8 text-purple-400/50" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-purple-400/50" />
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <p className="text-xs text-purple-100 truncate">{item.title}</p>
              </div>
              <div className="absolute top-2 right-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400/30" />
              </div>
            </div>
          ))}
        </div>

        {/* Unlock Options */}
        <div className="bg-black/40 border border-purple-500/20 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Gem className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-sm font-medium text-white">Unlock Access</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-200">Monthly Subscription</span>
              <span className="text-sm font-bold text-white">$9.99/month</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-200">Reward Points</span>
              <span className="text-sm font-bold text-white">1000 points</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-purple-900 font-bold rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-yellow-400/30">
          <Star className="w-5 h-5" />
          <span>Join the Inner Circle</span>
        </button>

        {/* VIP Badge */}
        <div className="mt-3 flex items-center justify-center">
          <div className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded-full border border-purple-500/30 flex items-center">
            <Star className="w-3 h-3 mr-1 text-yellow-400" />
            VIP MEMBERS ONLY
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveContentVault;