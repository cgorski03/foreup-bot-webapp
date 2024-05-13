import React from 'react';
import './settings.css';
import UserContactInformationField from '../../components/settings/UserContactInformationField';
import CreatorMessage from './CreatorMessage';
import PasswordChangeForm from './PasswordChangeForm';

function Settings() {
  return (
    <div className="settingsPageContainer">
      <UserContactInformationField />
      <PasswordChangeForm />
      <CreatorMessage />
    </div>
  );
}
export default Settings;
