import React from 'react';
import SearchesTable from '../../components/dashboard/SearchesTable';
import './dashboard.css';

function Dashboard() {
  return (
    <div className="dashboardPageContainer">
      <SearchesTable />
    </div>
  );
}

export default Dashboard;
