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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { makeSelectListOfBooksInShelf, makeSelectShelfName } from './selectors';
import { changeListOfBooksInShelf, changeShelfName } from './actions';
import BookFromShelf from '../../components/BookfromShelf';

const Div = styled.div`
  position: relative;
  left: 5%;
  width: 90%;
`;

const EditableField = styled.div`
  border-bottom: 1px solid black;
  width: 100%;
  height: 100px;
`;

export function ShelfDetail({
  listOfBooksInShelf,
  onChangeListOfBooksInShelf,
  shelfId,
  onChangeShelfName,
  shelfName,
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
      .then(res => {
        onChangeListOfBooksInShelf(res.books);
        onChangeShelfName(res.title);
      });
  }, []);

  return (
    <div>
      <Helmet>
        <title>Shelf detail</title>
        <meta name="description" content="details of user's shelf" />
      </Helmet>
      <Div>
        <EditableField>
          {shelfName} <FontAwesomeIcon icon={faPencilAlt} />
        </EditableField>
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
  shelfName: PropTypes.string,
  onChangeShelfName: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  listOfBooksInShelf: makeSelectListOfBooksInShelf(),
  shelfName: makeSelectShelfName(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeListOfBooksInShelf: listOfBooksInShelf =>
      dispatch(changeListOfBooksInShelf(listOfBooksInShelf)),
    onChangeShelfName: shelfName => dispatch(changeShelfName(shelfName)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ShelfDetail);
