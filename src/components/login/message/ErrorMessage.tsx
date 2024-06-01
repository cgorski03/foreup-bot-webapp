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
      case 'NOMATCH':
        return 'The passwords do not match';
      case 'BADPASSWORD':
        return 'Ensure your password meets the requirements';
      default:
        return 'An error occurred during authorization.';
    }
  };

  return <div id="AuthorizationErrorMessageDisplay">{parseLoginMessage()}</div>;
}

export function StartSearchResponseMessage({ message }: { message: string }) {
  const parseSearchMessage = () => {
    if (message === '') {
      return '';
    }
    switch (message) {
      case 'requestError':
        return 'An error occur while starting the search. Do you have more than 3 concurrent searches?';
      case 'startTooLate':
        return 'The start time must be before the end time';
      case 'noCourse':
        return 'Please select a golf course';
      case 'noDiscord':
        return 'Please connect your discord account in settings to start a search';
      case 'tooManySearches':
        return 'You have too many searches in progress. Please wait for one to finish or cancel one before starting another.';
      case 'success':
        return 'Search started successfully';
      default:
        return '';
    }
  };
  if (message !== 'success') {
    return <div id="AuthorizationErrorMessageDisplay">{parseSearchMessage()}</div>;
  }
  return (
    <div
      id="AuthorizationErrorMessageDisplay"
      style={{ color: 'green' }}
    >
      {parseSearchMessage()}
    </div>
  );
}
