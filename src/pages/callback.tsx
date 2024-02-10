import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/hooks/useAuth";

const Callback = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/search");
    }
  }, [navigate, isAuthenticated]);

  return <div />;
};

export default Callback;
