import React from 'react';
import { FormattedMessage } from 'react-intl';

import LocaleToggle from 'containers/LocaleToggle';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import messages from './messages';

const NavBar = styled.div`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #ffffff;
  height: 50px;
  box-shadow: 0px 15px 30px 5px rgba(0, 0, 0, 0.4);
`;
const NavLinkLeft = styled(Link)`
  display: inline-block;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
  text-decoration: none;
  margin-right: 1rem;
  float: left;
  padding-top: 10px;
`;
const NavButtonRight = styled.div`
  float: right;
  padding: 10px;
`;

// li a {
//   display: block;
//   color: white;
//   text-align: center;
//   padding: 14px 16px;
//   text-decoration: none;
// }
//
// li a:hover:not(.active) {
//   background-color: #111;
// }
//
// .active {
//   background-color: #4CAF50;
// }
function Header() {
  return (
    <div>
      <NavBar>
        <NavLinkLeft to="/">
          <FormattedMessage {...messages.home} />
        </NavLinkLeft>
        <NavLinkLeft to="/">
          <FormattedMessage {...messages.login} />
        </NavLinkLeft>
        <NavButtonRight>
          <LocaleToggle />
        </NavButtonRight>
      </NavBar>
    </div>
  );
}

export default Header;
