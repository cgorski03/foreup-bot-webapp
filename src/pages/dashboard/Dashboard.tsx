import React from "react";
import { SearchesTable } from "../../components/dashboard/SearchesTable";
import "./dashboard.css";
export const Dashboard = () => {
  return (
    <div className="dashboardPageContainer">
      <SearchesTable />
    </div>
  );
};
