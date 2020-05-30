import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Book = styled.div`
  display: block;
`;

function BookFromShelf({ bookID }) {
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
  const [book, setBook] = useState();
  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    fetch(`${process.env.ICG_API_URL}/api/v1/books/${bookID}/`, sentData)
      .then(res => res.json())
      .then(res => setBook(res));
  }, []);

  return (
    <div>
      {bookID}
      {book ? (
        <Book>
          {book.title}
          <div>{book.pages}</div>
        </Book>
      ) : (
        <div>problem</div>
      )}
    </div>
  );
}

BookFromShelf.propTypes = {
  bookID: PropTypes.number,
};

export default BookFromShelf;
