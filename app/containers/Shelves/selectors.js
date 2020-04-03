/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.shelves || initialState;

const makeSelectListOfShelves = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.listOfShelves,
  );

const makeSelectIsOpenAddWindow = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isOpenAddWindow,
  );

export { makeSelectListOfShelves, makeSelectIsOpenAddWindow };
