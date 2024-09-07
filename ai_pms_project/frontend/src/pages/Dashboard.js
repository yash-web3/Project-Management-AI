import React from 'react';

function Dashboard() {
  return (
    <div className="page-content">
      <h1 className="page-title">Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Project Overview</h2>
          <p>Total Projects: 10</p>
          <p>Active Projects: 5</p>
        </div>
        <div className="dashboard-card">
          <h2>Task Summary</h2>
          <p>Open Tasks: 25</p>
          <p>Completed Tasks: 50</p>
        </div>
        <div className="dashboard-card">
          <h2>AI Insights</h2>
          <p>Productivity Trend: Increasing</p>
          <p>Risk Assessment: Low</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;