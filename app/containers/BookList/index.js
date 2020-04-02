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
import { makeSelectListOfBooks } from './selectors';
import { changeListOfBooks } from './actions';
const Div = styled.div`
  position: relative;
  left: 45%;
`;

const Book = styled.div`
  padding-bottom: 50px;
`;
export function BookList({ listOfBooks, onChangeListOfBooks }) {
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
    fetch('http://icgbooks.sq4lea.olsztyn.pl/api/books', sentData)
      .then(resp => resp.json())
      .then(res => onChangeListOfBooks(res));
  }, []);

  return (
    <div>
      <Helmet>
        <title>Book List</title>
        <meta name="description" content="List of books" />
      </Helmet>
      <Div>
        {listOfBooks.map((todo, index) => (
          <Book key={todo.id}>
            <FormattedMessage {...messages.id} />: {index}
            <h2>{todo.title}</h2>
            <p>
              <FormattedMessage {...messages.pages} />: {todo.pages}
            </p>
          </Book>
        ))}
      </Div>
    </div>
  );
}

BookList.propTypes = {
  listOfBooks: PropTypes.array,
  onChangeListOfBooks: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  listOfBooks: makeSelectListOfBooks(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeListOfBooks: listOfBooks =>
      dispatch(changeListOfBooks(listOfBooks)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(BookList);
