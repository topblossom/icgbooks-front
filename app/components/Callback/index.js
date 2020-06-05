import React from 'react';
import { connect } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import userManager from '../../utils/userManager';

function CallbackPage() {
  // just redirect to '/' in both cases
  const successCallback = user => {
    console.log(user);
  };

  const errorCallback = error => {
    console.error(error);
  };
  return (
    <CallbackComponent
      userManager={userManager}
      successCallback={successCallback}
      errorCallback={errorCallback}
    >
      <div>Redirecting...</div>
    </CallbackComponent>
  );
}

export default connect()(CallbackPage);
