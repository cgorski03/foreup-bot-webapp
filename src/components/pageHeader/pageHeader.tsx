import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import './pageHeader.css';
import PageLabel from './pageLabel/PageLabel';
import useSignOut from '../../utils/hooks/useSignOut';
import useSignIn from '../../utils/hooks/useSignIn';
import HandleAuthApiErrors from '../error/HandleAuthApiErrors';

function PageHeader() {
  const { logOut } = useSignOut();
  const { setAuthedContext } = useSignIn();
  const navigate = useNavigate();
  const location = useLocation();
  const [userAuthed, setUserAuthed] = useState<Boolean>(true);

  function isProtectedPage() {
    return !(location.pathname === '/' || location.pathname === '/login');
  }
  useEffect(() => {
    const attemptSetContext = async () => {
      const result = await setAuthedContext();
      return result;
    };
    attemptSetContext().then((result) => {
      if (!result && isProtectedPage()) {
        setUserAuthed(false);
      }
    });
  }, [location.pathname]);

  const handleNavButtonClick = (buttonValue: number) => {
    if (buttonValue === 3) {
      logOut().then((success) => {
        if (!success) {
          // This is mock logic TODO
          console.log('Error signing out');
        }
      });
    } else {
      switch (buttonValue) {
        case 0:
          navigate('/search');
          break;
        case 1:
          navigate('/dashboard');
          break;
        case 2:
          navigate('/settings');
          break;
        default:
          break;
      }
    }
  };
  if (!isProtectedPage()) {
    return null;
  }
  if (isProtectedPage() && !userAuthed) {
    return <HandleAuthApiErrors responseCode={401} />;
  }
  return (
    <div className="pageHeaderContainer">
      <img
        src="/images/golf_bot_image.jpeg"
        className="headerLogo"
        alt="app"
      />
      <PageLabel
        buttonLabel="Search"
        buttonValue={0}
        handleButtonClick={handleNavButtonClick}
        isSelectedPage={location.pathname === '/search'}
      />
      <PageLabel
        buttonLabel="Dashboard"
        buttonValue={1}
        handleButtonClick={handleNavButtonClick}
        isSelectedPage={location.pathname === '/dashboard'}
      />
      <PageLabel
        buttonLabel="Settings"
        buttonValue={2}
        handleButtonClick={handleNavButtonClick}
        isSelectedPage={location.pathname === '/settings'}
      />
      <PageLabel
        buttonLabel={<IoLogOut />}
        buttonValue={3}
        handleButtonClick={handleNavButtonClick}
        isSelectedPage={location.pathname === ''}
      />
    </div>
  );
}

export default PageHeader;
