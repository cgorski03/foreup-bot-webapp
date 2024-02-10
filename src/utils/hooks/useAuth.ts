import { getCurrentUser } from "aws-amplify/auth";
import { useState, useEffect } from "react";
//The fact this isn't a hook in amplify is insane i miss auth0

export const useAuth = (): boolean | null => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await getCurrentUser();
        setIsAuthenticated(true);
      } catch (err) {
        // The user is not signed in
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, []);

  return isAuthenticated;
};

