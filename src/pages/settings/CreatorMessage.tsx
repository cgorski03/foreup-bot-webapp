import React from 'react';
import './creatorMessage.css';
import { FaGithub, FaGooglePlusG } from 'react-icons/fa';

export default function CreatorMessage() {
  return (
    <div className="creatorMessageContainer">
      <h1 className="messageHeading">
        <span className="handWave">👋</span> Hope you&apos;re having fun!
      </h1>
      <p className="messageText">
        To report bugs, don&apos;t. They are actually secret easter eggs.
      </p>
      <p className="messageText">
        If you insist on spoiling the fun, you can use the form below or brave GitHub to
        submit an issue.
      </p>
      <div className="linkContainer">
        <a
          href="https://github.com/cgorski03"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub link"
          className="githubLink"
        >
          <FaGithub className="githubIcon" />
          <span className="githubText">Venture into GitHub</span>
        </a>
        <a
          href="https://forms.gle/g5HJREbAcKkRz9Fb8"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Google Form link"
          className="formLink"
        >
          <FaGooglePlusG className="formIcon" />
          <span className="formText">Report via Google Form</span>
        </a>
      </div>
    </div>
  );
}
