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

export { makeSelectListOfShelves };
