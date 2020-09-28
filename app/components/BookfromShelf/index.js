import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import messages from '../../containers/BookList/messages';
import BookIcon from '../../images/icon-book.png';

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

function BookFromShelf({ bookID, token }) {
  const sentData = {
    method: 'get',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer google-oauth2 ${token}`,
    },
  };
  const [book, setBook] = useState({ title: null, pages: null });

  useEffect(() => {
    fetch(`${process.env.ICG_API_URL}/api/v1/books/${bookID}/`, sentData)
      .then(res => res.json())
      .then(res => setBook(res));
  }, []);

  console.log(book);
  return (
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
      key={bookID}
    >
      <Book key={bookID}>
        <ImageBook src={BookIcon} />
        <H2>{book.title ? book.title : 'Error'}</H2>
        <p>
          <FormattedMessage {...messages.pages} />:{' '}
          {book.pages ? book.pages : 'Error'}
        </p>
      </Book>
    </GridStyle>
  );
}

BookFromShelf.propTypes = {
  bookID: PropTypes.number,
  token: PropTypes.string,
};

export default BookFromShelf;
