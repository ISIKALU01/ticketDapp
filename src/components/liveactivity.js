import React, { useState, useEffect } from 'react';
import { Zap, Ticket, User, MapPin, Clock, ArrowRight, ChevronDown } from 'lucide-react';

const LiveActivityFeed = () => {
  // Sample live activities (expanded list)
  const allActivities = [
    { id: 1, name: 'John D.', location: 'New York', action: 'purchased 2 VIP tickets', time: 'Just now', points: 1200 },
    { id: 2, name: 'Sarah M.', location: 'Los Angeles', action: 'redeemed 1000 points for backstage', time: '1 min ago', points: null },
    { id: 3, name: 'TeamAlexFan', location: 'Chicago', action: 'upgraded to Inner Circle', time: '3 mins ago', points: null },
    { id: 4, name: 'Mike T.', location: 'Miami', action: 'bought exclusive content pack', time: '5 mins ago', points: 800 },
    { id: 5, name: 'Emma S.', location: 'London', action: 'joined with 3 friends', time: '8 mins ago', points: null },
    { id: 6, name: 'David K.', location: 'Toronto', action: 'renewed annual membership', time: '12 mins ago', points: null },
    { id: 7, name: 'Lisa P.', location: 'Sydney', action: 'earned 500 loyalty points', time: '15 mins ago', points: 500 }
  ];

  const [displayedActivities, setDisplayedActivities] = useState(allActivities.slice(0, 3));
  const [showAll, setShowAll] = useState(false);
  const [pulse, setPulse] = useState(false);

  // Rotate activities when not showing all
  useEffect(() => {
    if (showAll) return;

    const rotateActivities = () => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
      
      setDisplayedActivities(prev => {
        const available = allActivities.filter(a => !prev.some(p => p.id === a.id));
        if (available.length === 0) return prev;
        
        const newActivities = [...prev.slice(1)];
        newActivities.push(available[Math.floor(Math.random() * available.length)]);
        return newActivities;
      });
    };

    const interval = setInterval(rotateActivities, 8000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, [showAll]);

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setDisplayedActivities(showAll ? allActivities.slice(0, 3) : allActivities);
  };

  return (
    <div className="w-full h-full flex flex-col border border-black/80 bg-gradient-to-br from-purple-900/20 to-black/30 shadow-sm rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-purple-500/20 bg-gradient-to-r from-purple-800/50 to-purple-900/70 flex items-center">
        <Zap className={`w-5 h-5 text-yellow-400 ${pulse ? 'animate-pulse' : ''}`} />
        <h3 className="ml-2 text-lg font-semibold font-raleway text-white">Live Fan Activity</h3>
        <div className="ml-auto flex items-center">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse mr-2"></span>
          <span className="text-xs text-purple-200">LIVE</span>
        </div>
      </div>
      
      {/* Activity Feed - Grow to fill space */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-purple-900/30">
          {displayedActivities.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-purple-900/10 transition-colors group">
              <div className="flex items-start">
                <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-full p-2 mr-3">
                  <User className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline flex-wrap">
                    <p className="font-medium text-white mr-2 truncate">{activity.name}</p>
                    <div className="flex items-center text-xs text-purple-300">
                      <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{activity.location}</span>
                    </div>
                  </div>
                  <p className="text-sm text-white mt-1 truncate">{activity.action}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-xs text-purple-300">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </div>
                    {activity.points && (
                      <div className="text-xs bg-purple-900/50 text-yellow-400 px-2 py-1 rounded-full whitespace-nowrap">
                        {activity.points} pts
                      </div>
                    )}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA - Fixed at bottom */}
      <div className="p-3 bg-black/20 border-t border-purple-900/30 text-center">
        <button 
          onClick={toggleShowAll}
          className="text-xs text-purple-300 hover:text-white transition-colors flex items-center justify-center mx-auto"
        >
          {showAll ? 'Show Less' : 'View All Activity'}
          <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${showAll ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default LiveActivityFeed;