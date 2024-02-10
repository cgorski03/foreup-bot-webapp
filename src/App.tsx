import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/login/login";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Settings } from "./pages/settings/Settings";
import { Search } from "./pages/search/Search";
import Callback from "./pages/callback";
import NotFound from "./pages/notfound/NotFound";
import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";
import {
  UserInformationContext,
  UserInformation,
} from "./Contexts/UserContext";
import { PageHeader } from "./components/pageHeader/pageHeader";

Amplify.configure(config);

function App() {
  const [userInfo, setUserInfo] = useState<UserInformation | null>(null);

  return (
    <Router>
      <UserInformationContext.Provider value={{ userInfo, setUserInfo }}>
        <div>
          <PageHeader />
          <Routes>
            <Route path="/" element={<Callback />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<Search />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </UserInformationContext.Provider>
    </Router>
  );
}

export default App;
