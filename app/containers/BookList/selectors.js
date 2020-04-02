/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.books || initialState;

const makeSelectListOfBooks = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.listOfBooks,
  );

export { makeSelectListOfBooks };
