import React, { useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import useAuth from '../../utils/hooks/useAuth';
import useAuthContext from '../../utils/hooks/useAuthContext';

type LoadSecurePageProps = {
  onLoad: (result: boolean, error?: Error) => void;
};
function LoadSecurePage(props: LoadSecurePageProps) {
  const { onLoad } = props;
  const isAuthenticated = useAuth();
  const { setAuthedContext, clearAuthedContext } = useAuthContext();
  useEffect(() => {
    const setUserContext = async (): Promise<[boolean, Error?]> => {
      // Set the user context based on the user info from auth api
      try {
        await setAuthedContext();
        return [true];
      } catch (error: any) {
        return [false, error];
      }
    };
    // isAuthenticated will be null before async op finishes so have to check against t/f
    if (isAuthenticated === false) {
      // The user is not authenticated ensure context is empty
      const success = clearAuthedContext();
      if (!success) {
        onLoad(false, new Error('Failed to clear user context'));
        return;
      }
      onLoad(false);
      return;
    }

    if (isAuthenticated) {
      setUserContext().then(([success, error]) => onLoad(success, error));
    }
  }, [isAuthenticated, onLoad]);

  return (
    <div>
      <TailSpin
        color="white"
        width="40"
        wrapperClass="mainLoginPageLoader"
      />
    </div>
  );
}

export default LoadSecurePage;
