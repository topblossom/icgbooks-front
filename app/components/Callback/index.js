import React from 'react';
import { connect } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import { Redirect } from 'react-router-dom';
import userManager from '../../utils/userManager';

// eslint-disable-next-line react/prefer-stateless-function
class CallbackPage extends React.Component {
  render() {
    // just redirect to '/' in both cases
    return (
      <CallbackComponent
        userManager={userManager}
        successCallback={() => <Redirect to="/" />}
        errorCallback={error => {
          console.error(error);
          return <Redirect to="/" />;
        }}
      >
        <div>Redirecting...</div>
      </CallbackComponent>
    );
  }
}

export default connect()(CallbackPage);
