/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.shelfDetail || initialState;

const makeSelectListOfBooksInShelf = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.listOfBooksInShelf,
  );

const makeSelectShelfName = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.shelfName,
  );

export { makeSelectListOfBooksInShelf, makeSelectShelfName };
