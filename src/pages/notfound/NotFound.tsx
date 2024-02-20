import React from 'react';
import './NotFound.css';

function NotFound() {
  return (
    <div className="notFoundPageStyling">
      <img src="/images/golf_bot_image.jpeg" className="appImage" alt="" />
      <h2>404 - Not Found</h2>
      <p>
        The page you are looking for does not exist. Maybe it&apos;s on the golf
        course?
      </p>
    </div>
  );
}

export default NotFound;
