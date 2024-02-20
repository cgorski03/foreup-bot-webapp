import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchesTable from '../../components/dashboard/SearchesTable';
import LoadSecurePage from '../../components/search/loading/LoadSecurePage';
import './dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const handleLoadingResult = (result: boolean, error?: Error): void => {
    if (result) {
      setIsAuthenticated(true);
    } else {
      console.log(error);
      navigate('/login');
    }
  };
  if (isAuthenticated === null) {
    return (
      <div>
        <LoadSecurePage onLoad={handleLoadingResult} />
      </div>
    );
  }
  return (
    <div className="dashboardPageContainer">
      <SearchesTable />
    </div>
  );
}

export default Dashboard;
