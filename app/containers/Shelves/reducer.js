import produce from 'immer';
import { LIST_OF_SHELVES } from './constants';

// The initial state of the App
export const initialState = {
  listOfShelves: [],
};

/* eslint-disable default-case, no-param-reassign */
const shelvesListReducer = (state = initialState, action) =>
  produce(state, draft => {
    if (action.type === LIST_OF_SHELVES) {
      draft.listOfShelves = action.listOfShelves;
    }
  });

export default shelvesListReducer;
