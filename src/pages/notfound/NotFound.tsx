import "./NotFound.css";
import React from "react";

const NotFound = (): JSX.Element => {
  return (
    <div className="notFoundPageStyling">
      <img src="/images/golf_bot_image.jpeg" className="appImage" alt="" />
      <h2>404 - Not Found</h2>
      <p>
        The page you are looking for does not exist. Maybe it's on the golf
        course?
      </p>
    </div>
  );
};

export default NotFound;
