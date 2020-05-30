/*
 * ShelfDetail
 *
 * Page with all books in Shelf
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { makeSelectListOfBooksInShelf } from './selectors';
import { changeListOfBooksInShelf } from './actions';
import BookFromShelf from '../../components/BookfromShelf';

const Div = styled.div`
  position: relative;
  left: 5%;
  width: 90%;
`;

export function ShelfDetail({
  listOfBooksInShelf,
  onChangeListOfBooksInShelf,
  shelfId,
}) {
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
    fetch(`${process.env.ICG_API_URL}/api/v1/shelves/${shelfId}/`, sentData)
      .then(res => res.json())
      .then(res => onChangeListOfBooksInShelf(res.books));
  }, []);

  return (
    <div>
      <Helmet>
        <title>Shelf detail</title>
        <meta name="description" content="details of user's shelf" />
      </Helmet>
      <Div>
        {Array.isArray(listOfBooksInShelf) ? (
          listOfBooksInShelf.map(todo => (
            <BookFromShelf key={todo} bookID={todo} />
          ))
        ) : (
          <div>error{listOfBooksInShelf}</div>
        )}
      </Div>
    </div>
  );
}

ShelfDetail.propTypes = {
  listOfBooksInShelf: PropTypes.array,
  onChangeListOfBooksInShelf: PropTypes.func,
  shelfId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  listOfBooksInShelf: makeSelectListOfBooksInShelf(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeListOfBooksInShelf: listOfBooksInShelf =>
      dispatch(changeListOfBooksInShelf(listOfBooksInShelf)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ShelfDetail);
