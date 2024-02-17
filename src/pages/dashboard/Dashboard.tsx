import React from "react";
import { SearchesList } from "../../components/dashboard/SearchesList";
import "./dashboard.css";
export const Dashboard = () => {
  return (
    <div className="dashboardPageContainer">
      <SearchesList />
    </div>
  );
};
