import React, { useEffect, useMemo, useState } from 'react';
import SearchesTable from '../../components/dashboard/SearchesTable';
import './dashboard.css';
import { useGetCourses, useGetSearches } from '../../utils/api/requests';
import HandleAuthApiErrors from '../../components/error/HandleFetchErrors';
import { UserSearchInfo } from '../../utils/api/types';
import { DashboardContext } from '../../Contexts/DashboardContext';

function Dashboard() {
  const {
    getSearches,
    forceSearches,
    searchesLoading,
    searches,
    responseCode,
    setSearches,
  } = useGetSearches();
  const { getCourses, coursesLoading, courses } = useGetCourses();
  const [error, setError] = useState<Boolean>(false);

  // Handle initial API call
  useEffect(() => {
    getCourses();
    getSearches();
  }, []);

  useEffect(() => {
    // If the response code is not 200, set the error state to true
    if (responseCode != null && responseCode !== 200) {
      setError(true);
    }
  }, [responseCode]);

  const handleRefreshSearches = () => {
    forceSearches();
  };
  const handleSetSearches = (updatedSearches: UserSearchInfo[]) => {
    setSearches(updatedSearches);
  };
  const dashboardContext = useMemo(
    () => ({
      refreshSearches: handleRefreshSearches,
      refreshLoading: searchesLoading,
      setSearches: handleSetSearches,
    }),
    [handleRefreshSearches, searchesLoading, handleSetSearches],
  );
  return (
    <div className="dashboardPageContainer">
      {error ? (
        <HandleAuthApiErrors responseCode={responseCode} />
      ) : (
        <DashboardContext.Provider value={dashboardContext}>
          <SearchesTable
            searches={searches}
            courses={courses}
            loading={searchesLoading || coursesLoading}
          />
        </DashboardContext.Provider>
      )}
    </div>
  );
}

export default Dashboard;
