import React from 'react';
import './ErrorMessage.css';

export function AuthorizationErrorMessage({ error }: { error: string }) {
  const parseLoginMessage = () => {
    if (error === '') {
      return '';
    }
    switch (error) {
      case 'username is required to signIn':
        return 'Please provide a username and password';

      case 'Incorrect username or password.':
        return 'The username or password is incorrect';

      default:
        return 'An error occurred during authorization.';
    }
  };

  return <div id="AuthorizationErrorMessageDisplay">{parseLoginMessage()}</div>;
}

export function StartSearchErrorMessage({ error }: { error: string }) {
  const parseSearchMessage = () => {
    if (error === '') {
      return '';
    }
    switch (error) {
      case 'requestError':
        return 'An error occur while starting the search. Please try again';

      case 'startTooLate':
        return 'The start time must be before the end time';

      case 'noCourse':
        return 'Please select a golf course';
      case 'noDiscord':
        return 'Please connect your discord account in settings to start a search';
      default:
        return '';
    }
  };

  return <div id="AuthorizationErrorMessageDisplay">{parseSearchMessage()}</div>;
}
