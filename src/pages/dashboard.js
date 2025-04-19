// components/Dashboard.js
import React from 'react';
import Head from 'next/head'

const Dashboard = () => {
  // Demo data
  const stats = [
    { name: 'Total Users', value: 1245, change: '+12%', changeColor: 'text-green-500' },
    { name: 'Revenue', value: '$8,450', change: '+5%', changeColor: 'text-green-500' },
    { name: 'Tasks', value: '23/50', change: '-2%', changeColor: 'text-red-500' },
    { name: 'Performance', value: '87%', change: '+7%', changeColor: 'text-green-500' },
  ];

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

      <div className="p-6 vibrant-gradient font-raleway">
        <div className="p-6 max-w-7xl mx-auto mt-[100px] bg-black/30">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Simple Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-200">
                <h3 className="text-gray-500 text-sm font-medium">{stat.name}</h3>
                <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
                <span className={`text-sm ${stat.changeColor}`}>
                  {stat.change} from last week
                </span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow p-6 h-96 flex items-center justify-center">
        <p className="text-gray-400">[Chart Area - Placeholder]</p>
          </div>

        </div>
      </div>

    </>


  );
};

export default Dashboard;