import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';

import LocaleToggle from 'containers/LocaleToggle';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectLoggedIn } from '../../containers/App/selectors';
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
function Header({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <NavBar>
          <NavLinkLeft to="/">
            <FormattedMessage {...messages.home} />
          </NavLinkLeft>
          <NavLinkLeft to="/profile">
            <FormattedMessage {...messages.profile} />
          </NavLinkLeft>
          <NavLinkLeft to="/books">
            <FormattedMessage {...messages.books} />
          </NavLinkLeft>
          <NavLinkLeft to="/shelves">
            <FormattedMessage {...messages.shelves} />
          </NavLinkLeft>
          <NavButtonRight>
            <LocaleToggle />
          </NavButtonRight>
          <NavButtonRight>
            <a href="http://icgbooks.sq4lea.olsztyn.pl/logout">
              <FormattedMessage {...messages.logout} />
            </a>
          </NavButtonRight>
        </NavBar>
      ) : (
        <NavBar>
          <NavLinkLeft to="/">
            <FormattedMessage {...messages.home} />
          </NavLinkLeft>
          <NavLinkLeft to="/login">
            <FormattedMessage {...messages.login} />
          </NavLinkLeft>
          <NavButtonRight>
            <LocaleToggle />
          </NavButtonRight>
        </NavBar>
      )}
    </div>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  onChangeLoginStatus: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectLoggedIn(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(Header);
