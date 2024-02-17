import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchesList } from '../../components/dashboard/SearchesList';
import { LoadSecurePage } from '../../components/search/loading/LoadSecurePage';
import './dashboard.css';
export const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const handleLoadingResult = (result: boolean, error?: Error): void => {
    result ? setIsAuthenticated(true) : navigate('/login');
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
      <SearchesList />
    </div>
  );
};
