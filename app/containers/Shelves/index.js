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
    fetch('http://icgbooks.sq4lea.olsztyn.pl/api/shelves', sentData)
      .then(resp => resp.json())
      .then(res => onChangeListOfShelves(res));
  }, []);
  const dataPOST = data => ({
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ name: data }),
  });

  function addShelf(event) {
    event.preventDefault();
    fetch(
      'http://icgbooks.sq4lea.olsztyn.pl/api/shelves/add',
      dataPOST(event.target.newShelf.value),
    )
      .then(() =>
        fetch('http://icgbooks.sq4lea.olsztyn.pl/api/shelves', sentData)
          .then(resp => resp.json())
          .then(res => onChangeListOfShelves(res)),
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
                <Shelf key={todo.id}>
                  <h2>{todo.name}</h2>
                  <p>
                    <FormattedMessage {...messages.books} />:{' '}
                    {todo.books.length}
                  </p>
                </Shelf>
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
