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
import messages from './messages';
import { makeSelectListOfBooks } from './selectors';
import { changeListOfBooks } from './actions';
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
                <Icon name="vertical3dots" />
                <FormattedMessage {...messages.number} /> {index}
                <ImageBook src={BookIcon} />
                <H2>{todo.title}</H2>
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
