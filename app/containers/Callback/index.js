import React from 'react';
import { connect } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import PropTypes from 'prop-types';
import userManager from '../../utils/userManager';

function CallbackPage({ onChangeLoginStatus, onChangeToken }) {
  // just redirect to '/' in both cases
  const successCallback = user => {
    console.log(user);
    console.log('Access token');
    onChangeToken(user.access_token);
    const var1 = true;
    console.log('Change login status');
    onChangeLoginStatus(var1);
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
      <div>Successfuly logged in</div>
    </CallbackComponent>
  );
}

CallbackPage.propTypes = {
  onChangeLoginStatus: PropTypes.func,
  onChangeToken: PropTypes.func,
};

export default connect()(CallbackPage);
