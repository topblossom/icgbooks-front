/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import H1 from 'components/H1';
import Icon from 'components/SVGIcon';
import BackgroundStyle from 'components/HomePage/Background';
import userManager from '../../utils/userManager';
import messages from './messages';
const Content = styled.div`
  background: rgb(255, 255, 255); /* Fallback color */
  background: rgba(255, 255, 255, 0.9); /* Black w/opacity/see-through */
  color: black;
  font-weight: bold;
  border: 3px solid #f1f1f1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 80%;
  padding: 20px;
  text-align: center;
`;
export default function Login() {
  const fun = function() {
    userManager.signinRedirect();
  };
  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta
          name="description"
          content="Feature page of React.js Boilerplate application"
        />
      </Helmet>
      <BackgroundStyle />
      <Content>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        {/* https://python-social-auth.readthedocs.io/en/latest/use_cases.html */}
        <a
          href={`${process.env.ICG_API_URL}/auth/login/google-oauth2/?next=${
            window.location.href
          }`}
        >
          <Icon name="google" />
          <Icon name="facebook" />
          <Icon name="twitter" />
        </a>
        <button type="button" onClick={fun}>
          Login but better
        </button>
      </Content>
    </div>
  );
}
