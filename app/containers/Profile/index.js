/*
 * ProfilePage
 *
 * This the page where you can set the user settings
 */
import React from 'react';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

export default function Profile() {
  return (
    <div>
      <Helmet>
        <title>Profile</title>
        <meta
          name="description"
          content="Feature page of React.js Boilerplate application"
        />
      </Helmet>
    </div>
  );
}
