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
import { makeSelectListOfShelves } from '../Shelves/selectors';
import { changeListOfShelves } from '../Shelves/actions';

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

export function BookList({
  listOfBooks,
  onChangeListOfBooks,
  token,
  onChangeListOfShelves,
  listOfShelves,
}) {
  const sentData = {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer google-oauth2 ${token}`,
    },
  };
  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    fetch(`${process.env.ICG_API_URL}/api/v1/books/`, sentData)
      .then(resp => resp.json())
      .then(res => onChangeListOfBooks(res.results));

    fetch(`${process.env.ICG_API_URL}/api/v1/shelves/`, sentData)
      .then(resp => resp.json())
      .then(res => onChangeListOfShelves(res.results));
  }, []);

  function addToShelf(id) {
    // TODO
    console.log(id);
  }

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
                <div>
                  <div>Add to shelf</div>
                  {listOfShelves.map(shelf => (
                    <button
                      key={shelf.id}
                      type="button"
                      onClick={() => addToShelf(shelf.id)}
                    >
                      {shelf.title}
                    </button>
                  ))}
                </div>
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
  listOfShelves: PropTypes.array,
  onChangeListOfBooks: PropTypes.func,
  onChangeListOfShelves: PropTypes.func,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  listOfBooks: makeSelectListOfBooks(),
  listOfShelves: makeSelectListOfShelves(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeListOfBooks: listOfBooks =>
      dispatch(changeListOfBooks(listOfBooks)),
    onChangeListOfShelves: listOfBooks =>
      dispatch(changeListOfShelves(listOfBooks)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(BookList);
