// components/Dashboard.js
import React from 'react';
import Head from 'next/head';
import ImageCarousel from '../components/imagecarousel';
import UpcomingEventsCard from '../components/events';
import ExclusiveContentVault from '../components/exclusivecontent';
import LiveActivityFeed from '../components/liveactivity';
import MeetFreekzAngels from '../components/premiumdating';

const events = [
  {
    id: '1',
    title: 'Tech Conference 2023',
    organizer: 'Tech Org',
    date: 'Oct 15, 2023',
    time: '9:00 AM - 5:00 PM',
    location: 'Convention Center',
    status: 'Buy',
    color: '#6366F1',
  },
  {
    id: '2',
    title: 'Product Launch',
    organizer: 'Acme Inc',
    date: 'Nov 2, 2023',
    time: '2:00 PM - 4:00 PM',
    location: 'Virtual',
    status: 'Buy',
  },
  {
    id: '3',
    title: 'Team Building',
    organizer: 'HR Department',
    date: 'Nov 10, 2023',
    time: 'All Day',
    location: 'Mountain Resort',
    status: 'Buy',
    color: '#10B981',
  },
];

const Dashboard = () => {
  return (
    <>
      <Head>
        <style>{`
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .vibrant-gradient {
            background: linear-gradient(
              135deg,              
              #0f172a 0%,
              #1e1b4b 30%,
              #5b21b6 50%,
              #1e1b4b 70%,
              #0f172a 100%
            );
            background-size: 400% 400%;
            animation: gradientFlow 8s ease infinite;
          }
        `}</style>
      </Head>

      <div className="p-4 md:p-6 vibrant-gradient font-raleway min-h-screen relative">
        {/* Main Content Area - Removed sidebar-dependent padding */}
        <div className="mt-[25px]">
          <div className="relative z-0">
            <div className="flex flex-col gap-4 md:gap-6">
              {/* Responsive Carousel */}
              <div
                className="bg-white shadow-md overflow-hidden"
                style={{
                  height: 'clamp(300px, 50vh, 600px)',
                  minHeight: '500px'
                }}
              >
                <ImageCarousel />
              </div>

              {/* Responsive Spreadsheet */}
              <div className="max-w-6xl p-0">
                <h1 className="text-2xl text-white font-normal mb-6">Upcoming Events</h1>
                <UpcomingEventsCard 
                  events={events} 
                  title="Freekz is bringing a party near you"
                />
              </div>

              {/* Exclusive content card */}
              <div className="grid md:grid-cols-2 gap-6 max-w-6xl p-4">
                <ExclusiveContentVault />
                <LiveActivityFeed />
              </div>

              {/* Premium dating */}
              <div className="px-4">
                <MeetFreekzAngels />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;