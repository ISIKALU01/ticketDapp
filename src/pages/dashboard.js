// components/Dashboard.js
import React from 'react';


const Dashboard = () => {
  // Demo data
  const stats = [
    { name: 'Total Users', value: 1245, change: '+12%' },
    { name: 'Revenue', value: '$8,450', change: '+5%' },
    { name: 'Tasks', value: '23/50', change: '-2%' },
    { name: 'Performance', value: '87%', change: '+7%' },
  ];

  return (
    <div className={styles.dashboard}>
      <h1>Simple Dashboard</h1>
      <div className={styles.statsContainer}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <h3>{stat.name}</h3>
            <p className={styles.statValue}>{stat.value}</p>
            <span className={styles.statChange}>{stat.change}</span>
          </div>
        ))}
      </div>
      <div className={styles.chartPlaceholder}>
        <p>[Chart Area - Placeholder]</p>
      </div>
    </div>
  );
};

export default Dashboard;