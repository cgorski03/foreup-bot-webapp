import React from 'react';
import './settings.css';
import UserContactInformationField from '../../components/settings/UserContactInformationField';
import CreatorMessage from './CreatorMessage';

function Settings() {
  return (
    <div className="settingsPageContainer">
      <UserContactInformationField />
      <CreatorMessage />
    </div>
  );
}
export default Settings;
