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
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import messages from './messages';
import {
  makeSelectListOfShelves,
  makeSelectIsOpenAddWindow,
} from './selectors';
import { changeListOfShelves, changeIsOpenAddWindow } from './actions';
import AddShelfWindow from '../../components/AddShelf';

const Div = styled.div`
  position: relative;
  left: 5%;
  width: 90%;
`;

const Shelf = styled.div`
  padding-bottom: 50px;
  width: 100vh;
  outline-style: solid;
`;
export function ShelvesList({
  listOfShelves,
  onChangeListOfShelves,
  isOpenAddWindow,
  onChangeIsOpenAddWindow,
  token,
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
    fetch(`${process.env.ICG_API_URL}/api/v1/shelves/`, sentData)
      .then(resp => resp.json())
      .then(res => onChangeListOfShelves(res.results));
  }, []);
  const dataPOST = data => ({
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer google-oauth2 ${token}`,
    },
    body: JSON.stringify({ title: data }),
  });

  function addShelf(event) {
    event.preventDefault();
    fetch(
      `${process.env.ICG_API_URL}/api/v1/shelves/`,
      dataPOST(event.target.newShelf.value),
    )
      .then(() =>
        fetch(`${process.env.ICG_API_URL}/api/v1/shelves/`, sentData)
          .then(resp => resp.json())
          .then(res => onChangeListOfShelves(res.results)),
      )
      .catch(error => error);
  }

  function deleteShelf(id) {
    fetch(`${process.env.ICG_API_URL}/api/v1/shelves/${id}/`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer google-oauth2 ${token}`,
      },
    })
      .then(() =>
        fetch(`${process.env.ICG_API_URL}/api/v1/shelves/`, sentData)
          .then(resp => resp.json())
          .then(res => onChangeListOfShelves(res.results)),
      )
      .catch(error => error);
  }

  return (
    <div>
      <Helmet>
        <title>Shelves</title>
        <meta name="description" content="List of user shelves" />
      </Helmet>
      <Div>
        <GridList cols={3}>
          {Array.isArray(listOfShelves) && listOfShelves.length ? (
            listOfShelves.map(todo => (
              <GridListTile key={todo.id}>
                <Link to={{ pathname: `/shelf_detail/${todo.id}` }}>
                  <Shelf key={todo.id}>
                    <h2>{todo.title}</h2>
                    <p>
                      <FormattedMessage {...messages.books} />:{' '}
                      {todo.books.length}
                    </p>
                  </Shelf>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    deleteShelf(todo.id);
                  }}
                >
                  Click to delete shelf
                </button>
              </GridListTile>
            ))
          ) : (
            <div>You don’t have any shelves yet</div>
          )}
        </GridList>
        <button
          type="submit"
          onClick={() => onChangeIsOpenAddWindow(!isOpenAddWindow)}
        >
          Add shelf
        </button>
      </Div>
      {isOpenAddWindow ? (
        <AddShelfWindow
          addShelf={addShelf}
          onChangeIsOpenAddWindow={onChangeIsOpenAddWindow}
          isOpenAddWindow={isOpenAddWindow}
        />
      ) : (
        <div />
      )}
    </div>
  );
}

ShelvesList.propTypes = {
  listOfShelves: PropTypes.array,
  onChangeListOfShelves: PropTypes.func,
  isOpenAddWindow: PropTypes.bool,
  onChangeIsOpenAddWindow: PropTypes.func,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  listOfShelves: makeSelectListOfShelves(),
  isOpenAddWindow: makeSelectIsOpenAddWindow(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeListOfShelves: listOfShelves =>
      dispatch(changeListOfShelves(listOfShelves)),
    onChangeIsOpenAddWindow: isOpenAddWindow =>
      dispatch(changeIsOpenAddWindow(!!isOpenAddWindow)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ShelvesList);
