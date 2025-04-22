// components/Dashboard.js
import React from 'react';
import Head from 'next/head';
import ImageCarousel from '../components/imagecarousel';
import Sidebar from '../components/sidebar';
import DataSpreadsheet from '../components/dataspreadsheet';
import { useState } from 'react';
import { Menu, X } from 'react-feather'; // or your preferred icon library

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

    
      <div className="p-4 md:p-6 vibrant-gradient font-raleway min-h-screen">
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-20 z-30 bg-white p-2 rounded-md shadow-lg lg:hidden"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Collapsible Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-black/80 backdrop-blur-md shadow-xl transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0`}
      >
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        } lg:ml-64 pl-0 lg:pl-6`}
      >
        <div className="pt-16 lg:pt-0">
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Responsive Carousel */}
            <div
              className="bg-white rounded-lg shadow-md overflow-hidden"
              style={{
                height: 'clamp(300px, 50vh, 600px)',
                minHeight: '300px'
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
