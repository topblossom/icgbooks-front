/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, memo } from 'react';
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
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import GlobalStyle from '../../global-styles';
import { changeLoginStatus } from './actions';
import { makeSelectLoggedIn } from './selectors';
import reducer from './reducer';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const key = 'app';

export function App({ onChangeLoginStatus, isLoggedIn }) {
  useInjectReducer({ key, reducer });
  const header = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  });
  const sentData = {
    method: 'get',
    mode: 'cors',
    credentials: 'include',
    header,
  };
  useEffect(() => {
    fetch(`${process.env.ICG_API_URL}/api/v1/`, sentData)
      .then(response => response.status)
      .then(function(response) {
        let statusResp;
        if (response === 200) {
          statusResp = true;
          onChangeLoginStatus(statusResp);
        } else if (response === 403) {
          statusResp = false;
          onChangeLoginStatus(statusResp);
        }
        return response;
      })
      .catch(error => console.log(error));
  });
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
        <Route exact path="/books" component={BookList} />
        <Route exact path="/shelves" component={ShelvesList} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/features" component={FeaturePage} />
        <Route
          exact
          path="/shelf_detail/:id"
          component={props => <ShelfDetail shelfId={props.match.params.id} />}
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
  onChangeLoginStatus: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectLoggedIn(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeLoginStatus: loginStatus =>
      dispatch(changeLoginStatus(loginStatus)),
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
