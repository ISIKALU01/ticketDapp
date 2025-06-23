import React from 'react';
import { CalendarDays, Clock, MapPin, Ticket } from 'lucide-react';

const UpcomingEventsCard = ({ events, title = 'Upcoming Events', onBuyTicket }) => {
  const handleBuyTicket = (eventId) => {
    // You can call your API or perform any action here
    console.log(`Buy ticket for event ${eventId}`);
    if (onBuyTicket) {
      onBuyTicket(eventId);
    }
  };

  return (
    <div className="border border-black/80 bg-black/10 shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="px-6 py-4 bg-gradient-to-br from-purple-900/80 to-black/90 border border-purple-500/30">
        <h3 className="text-xl text-center font-normal font-raleway text-white">{title}</h3>
      </div>
      
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-black/10">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Event
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                Ticket
              </th>
            </tr>
          </thead>
          <tbody className="bg-black/10 divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-black/40 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div 
                      className="flex items-center justify-center w-10 h-10 rounded-lg mr-3"
                      style={{ 
                        backgroundColor: `${event.color || '#3B82F6'}20`,
                        color: event.color || '#3B82F6'
                      }}
                    >
                      <Ticket className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{event.title}</div>
                      <div className="text-sm text-white">{event.organizer}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-white mb-1">
                    <CalendarDays className="w-4 h-4 mr-2 text-white" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-white">
                    <Clock className="w-4 h-4 mr-2 text-white" />
                    {event.time}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-white">
                    <MapPin className="w-4 h-4 mr-2 text-white" />
                    {event.location}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleBuyTicket(event.id)}
                    className="px-4 py-2 bg-[#ffd106] hover:bg-[#ffc800] text-black font-medium rounded-md 
                    transition-colors text-sm"
                  >
                    Buy Ticket
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        {/* Mobile Cards (shown on mobile) */}
        <div className="md:hidden space-y-4 p-4">
        {events.map((event) => (
          <div key={event.id} className="bg-black/20 p-4 rounded-lg hover:bg-black/30 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div 
                  className="flex items-center justify-center w-10 h-10 rounded-lg mr-3"
                  style={{ 
                    backgroundColor: `${event.color || '#3B82F6'}20`,
                    color: event.color || '#3B82F6'
                  }}
                >
                  <Ticket className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">{event.title}</h4>
                  <p className="text-xs text-white/80">{event.organizer}</p>
                </div>
              </div>
              <button
                onClick={() => handleBuyTicket(event.id)}
                className="px-3 py-1 bg-[#ffd106] hover:bg-[#ffc800] text-black text-xs font-medium rounded 
                transition-colors"
              >
                Buy
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center text-white">
                <CalendarDays className="w-4 h-4 mr-2 text-white/80" />
                {event.date}
              </div>
              <div className="flex items-center text-white">
                <Clock className="w-4 h-4 mr-2 text-white/80" />
                {event.time}
              </div>
              <div className="flex items-center col-span-2 text-white">
                <MapPin className="w-4 h-4 mr-2 text-white/80" />
                {event.location}
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default UpcomingEventsCard;



