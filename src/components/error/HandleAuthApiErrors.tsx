import React from 'react';
import FullscreenErrorMessage from './FullscreenErrorMessage';

export default function HandleAuthApiErrors({
  responseCode,
}: {
  responseCode: number | null;
}) {
  switch (responseCode) {
    case 401:
      // User's JWT is expired
      return <FullscreenErrorMessage msg="You are not authorized for this page" />;
    case 402:
      // User was not authenticated
      return <FullscreenErrorMessage msg="Your session has timed out." />;
    default:
      return <FullscreenErrorMessage msg="An error has occured" />;
  }
}
