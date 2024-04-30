import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import PageHeader from './components/layout/pageHeader';
import Dashboard from './pages/dashboard/Dashboard';
import Settings from './pages/settings/Settings';
import config from './amplifyconfiguration.json';
import NotFound from './pages/notfound/NotFound';
import Search from './pages/search/Search';
import Callback from './pages/callback';
import Login from './pages/login/login';
import { UserInformationContext, UserInformation } from './Contexts/UserContext';

Amplify.configure(config);

function App() {
  const [userInfo, setUserInfo] = useState<UserInformation | null>(null);
  const contextValue = useMemo(() => ({ userInfo, setUserInfo }), [userInfo, setUserInfo]);
  return (
    <Router>
      <UserInformationContext.Provider value={contextValue}>
        <div>
          <PageHeader />
          <Routes>
            <Route
              path="/"
              element={<Callback />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/search"
              element={<Search />}
            />
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/settings"
              element={<Settings />}
            />
            <Route
              path="/settings/"
              element={<Settings />}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </div>
      </UserInformationContext.Provider>
    </Router>
  );
}

export default App;
