/*
 * BooksList
 *
 * Page with all books available in db
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import messages from './messages';
import { makeSelectListOfShelves } from './selectors';
import { changeListOfShelves } from './actions';
const Div = styled.div`
  position: relative;
  left: 45%;
`;

const Shelf = styled.div`
  padding-bottom: 50px;
`;
export function ShelvesList({ listOfShelves, onChangeListOfShelves }) {
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
    // When initial state username is not null, submit the form to load repos
    fetch('http://icgbooks.sq4lea.olsztyn.pl/api/shelves', sentData)
      .then(resp => resp.json())
      .then(res => onChangeListOfShelves(res));
  }, []);

  return (
    <div>
      <Helmet>
        <title>Shelves</title>
        <meta name="description" content="List of user shelves" />
      </Helmet>
      <Div>
        {Array.isArray(listOfShelves) && listOfShelves.length ? (
          listOfShelves.map((todo, index) => (
            <Shelf key={todo.id}>
              <FormattedMessage {...messages.id} />: {index}
              <h2>{todo.title}</h2>
              <p>
                <FormattedMessage {...messages.pages} />: {todo.pages}
              </p>
            </Shelf>
          ))
        ) : (
          <div>You have not any shelves yet</div>
        )}
      </Div>
    </div>
  );
}

ShelvesList.propTypes = {
  listOfShelves: PropTypes.array,
  onChangeListOfShelves: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  listOfBooks: makeSelectListOfShelves(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeListOfBooks: listOfShelves =>
      dispatch(changeListOfShelves(listOfShelves)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ShelvesList);
