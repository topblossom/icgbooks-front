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
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import messages from './messages';
import { makeSelectListOfBooks } from './selectors';
import { changeListOfBooks } from './actions';

const Div = styled.div`
  position: relative;
  margin: 5vh;
  width: 95%;
`;

const Book = styled.div`
  padding: 10px;
  margin: 10px;
  width: 100vh;
  border-style: solid;
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
        <GridList cols={4}>
          {listOfBooks.map((todo, index) => (
            <GridListTile key={todo.id}>
              <Book key={todo.id}>
                <FormattedMessage {...messages.id} />: {index}
                <h2>{todo.title}</h2>
                <p>
                  <FormattedMessage {...messages.pages} />: {todo.pages}
                </p>
              </Book>
            </GridListTile>
          ))}
        </GridList>
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
