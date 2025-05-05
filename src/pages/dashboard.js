// components/Dashboard.js
import React from 'react';
import Head from 'next/head';
import ImageCarousel from '../components/imagecarousel';
import Sidebar from '../components/sidebar';
import DataSpreadsheet from '../components/dataspreadsheet';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);


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
          {/* Collapsible Sidebar */}
          <div
            className={`fixed mt-[65px] inset-y-0 left-0 z-20 mt-[50px] bg-black/10 backdrop-blur-md shadow-xl 
              transition-all duration-300 ease-in-out
              ${sidebarOpen ? 
                'w-64 translate-x-0 md:w-72 lg:w-64' : 
                'w-16 -translate-x-12 hover:translate-x-0'
              }
              ${!sidebarOpen && 'md:w-20 md:-translate-x-10 md:hover:translate-x-0'}`}
          >
            {/* Toggle Button - Attached to Sidebar */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`absolute -right-3 top-4 z-30 bg-gray-500 p-2 rounded-full shadow-lg transition-all duration-300
                ${sidebarOpen ? '' : 'rotate-180'}`}
            >
              {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>

            {/* Sidebar Content */}
            <div className={`h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent 
              ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none md:opacity-0'}`}>
              <Sidebar />
            </div>

            {/* Collapsed State Indicator */}
            {!sidebarOpen && (
              <div className="absolute inset-y-0 left-0 w-1 bg-white/50 rounded-r-full"></div>
            )}
          </div>

          {/* Main Content Area */}
          <div
            className={`transition-all duration-300 mt-[50px]
              ${
                sidebarOpen 
                  ? 'ml-0 md:ml-0 lg:ml-64 pl-4 md:pl-6' 
                  : 'ml-4 md:ml-6 lg:ml-32 lg:mr-16 pl-0'
              }`}
          >
            {/* Mobile Overlay when sidebar is open */}
            {sidebarOpen && (
              <div 
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 z-10 bg-black/50 md:hidden"
              ></div>
            )}

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
                <div className="bg-white rounded-lg shadow-md p-3 md:p-5 flex-1 min-h-[250px] overflow-x-auto">
                  <DataSpreadsheet />
                </div>
              </div>
            </div>
          </div>
        </div>
    </>


  );
};

export default Dashboard;
