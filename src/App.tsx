import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./pages/search/Search";
import Login from "./pages/login/login";
import Callback from "./pages/callback";
import NotFound from "./pages/notfound/NotFound";
import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";
import {
  UserInformationContext,
  UserInformation,
} from "./Contexts/UserContext";

Amplify.configure(config);

function App() {
  const [userInfo, setUserInfo] = useState<UserInformation | null>(null);

  return (
    <Router>
      <UserInformationContext.Provider value={{ userInfo, setUserInfo }}>
        <div>
          <Routes>
            <Route path="/" element={<Callback />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </UserInformationContext.Provider>
    </Router>
  );
}

export default App;
