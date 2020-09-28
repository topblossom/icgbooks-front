/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import BookList from 'containers/BookList/Loadable';
import ShelvesList from 'containers/Shelves/Loadable';
import ShelfDetail from 'containers/ShelfDetail/Loadable';
import Login from 'containers/Login/Loadable';
import Profile from 'containers/Profile/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import CallbackPage from 'containers/Callback';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import GlobalStyle from '../../global-styles';
import { changeLoginStatus, changeToken } from './actions';
import { makeSelectLoggedIn, makeSelectToken } from './selectors';
import reducer from './reducer';
// import userManager from '../../utils/userManager';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const key = 'app';

export function App({ onChangeLoginStatus, isLoggedIn, token, onChangeToken }) {
  useInjectReducer({ key, reducer });

  // useEffect(() => {
  //   let statusResp;
  //   const checkIfUserIsLoggedIn = userManager.getUser();
  //   if (typeof checkIfUserIsLoggedIn.access_token === 'string') {
  //     onChangeToken(checkIfUserIsLoggedIn.access_token);
  //     statusResp = true;
  //     onChangeLoginStatus(statusResp);
  //   } else {
  //     statusResp = false;
  //     onChangeLoginStatus(statusResp);
  //   }
  // });

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Bookshelf"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header isLoggedIn={isLoggedIn} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path="/books"
          component={() => <BookList token={token} />}
        />
        <Route
          exact
          path="/shelves"
          component={() => <ShelvesList token={token} />}
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/features" component={FeaturePage} />
        <Route
          exact
          path="/shelf_detail/:id"
          component={props => (
            <ShelfDetail shelfId={props.match.params.id} token={token} />
          )}
        />
        <Route
          exact
          path="/callback"
          component={() => (
            <CallbackPage
              onChangeLoginStatus={onChangeLoginStatus}
              onChangeToken={onChangeToken}
            />
          )}
        />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  token: PropTypes.string,
  onChangeLoginStatus: PropTypes.func,
  onChangeToken: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectLoggedIn(),
  token: makeSelectToken(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeLoginStatus: loginStatus =>
      dispatch(changeLoginStatus(loginStatus)),
    onChangeToken: token => dispatch(changeToken(token)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
