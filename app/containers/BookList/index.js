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
import Grid from '@material-ui/core/Grid';
import Icon from 'components/SVGIcon';
import { Button } from '@material-ui/core';
import messages from './messages';
import { makeSelectListOfBooks, makeSelectIsOptionOpen } from './selectors';
import { changeListOfBooks, changeIsOptionOpen } from './actions';
import { makeSelectListOfShelves } from '../Shelves/selectors';
import { changeListOfShelves } from '../Shelves/actions';
import BookIcon from '../../images/icon-book.png';

const Div = styled.div`
  position: relative;
  margin: auto;
  width: 95%;
`;

const GridStyle = styled(Grid)`
  // background-color: #ffe6e6;
  // border: none;
`;

const Book = styled.div`
  padding: 10px;
  margin: 10px;
  width: 100%;
  // max-width: 700px;
  height: 600px;
  background-color: #ffe6e6;
  // border-style: solid;
  border-radius: 25px;
  box-shadow: 10px 12px 14px -8px rgba(0, 0, 0, 0.52);
`;

const ImageBook = styled.img`
  width: 70%;
  height: auto;
  max-height: 50%;
  display: block;
  margin: auto;
`;

const H2 = styled.h2`
  text-align: center;
`;

const ModalWindow = styled.div`
  width: 200px;
  height: 200px;
  background-color: white;
  position: absolute;
  overflow: auto;
  overflow-x: hidden;
`;

const ModalButton = styled(Button)`
  width: 100%;
  border: 2px solid #000000;
`;

export function BookList({
  listOfBooks,
  onChangeListOfBooks,
  token,
  onChangeListOfShelves,
  listOfShelves,
  isOptionOpen,
  onChangeIsOptionOpen,
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

  async function booksInShelf(shelfId) {
    const response = await fetch(
      `${process.env.ICG_API_URL}/api/v1/shelves/${shelfId}/`,
      sentData,
    );
    const json = await response.json();

    return json;
  }

  async function addToShelf(shelfId, bookId) {
    const shelfDetails = await booksInShelf(shelfId);
    shelfDetails.books.push(bookId);
    console.log(shelfDetails);
    const sentDataPut = {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer google-oauth2 ${token}`,
      },
      body: JSON.stringify({
        books: shelfDetails.books,
        title: shelfDetails.title,
      }),
    };

    fetch(`${process.env.ICG_API_URL}/api/v1/shelves/${shelfId}/`, sentDataPut);
  }

  return (
    <div>
      <Helmet>
        <title>Book List</title>
        <meta name="description" content="List of books" />
      </Helmet>
      <Div>
        <Grid container>
          {listOfBooks.map((todo, index) => (
            <GridStyle
              container
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              // spacing={3}
              direction="row"
              justify="center"
              alignItems="center"
              key={todo.id}
            >
              <Book key={todo.id}>
                <Button
                  type="submit"
                  onClick={() => {
                    let temp;
                    if (index === isOptionOpen) {
                      temp = -1;
                    } else {
                      temp = index;
                    }
                    onChangeIsOptionOpen(temp);
                  }}
                >
                  <Icon name="vertical3dots" />
                </Button>
                {isOptionOpen === index ? (
                  <ModalWindow>
                    {listOfShelves.map(shelf => (
                      <ModalButton
                        key={shelf.id}
                        type="button"
                        onClick={() => addToShelf(shelf.id, todo.id)}
                      >
                        {shelf.title}
                      </ModalButton>
                    ))}
                  </ModalWindow>
                ) : (
                  <span />
                )}
                <FormattedMessage {...messages.number} /> {index}
                <ImageBook src={BookIcon} />
                <H2>{todo.title}</H2>
                <p>
                  <FormattedMessage {...messages.pages} />: {todo.pages}
                </p>
              </Book>
            </GridStyle>
          ))}
        </Grid>
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
  isOptionOpen: PropTypes.number,
  onChangeIsOptionOpen: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  listOfBooks: makeSelectListOfBooks(),
  listOfShelves: makeSelectListOfShelves(),
  isOptionOpen: makeSelectIsOptionOpen(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeListOfBooks: listOfBooks =>
      dispatch(changeListOfBooks(listOfBooks)),
    onChangeListOfShelves: listOfBooks =>
      dispatch(changeListOfShelves(listOfBooks)),
    onChangeIsOptionOpen: isOptionOpen =>
      dispatch(changeIsOptionOpen(isOptionOpen)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(BookList);
