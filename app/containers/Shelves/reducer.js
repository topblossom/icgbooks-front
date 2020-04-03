import produce from 'immer';
import { LIST_OF_SHELVES, IS_OPEN_ADD_WINDOW } from './constants';

// The initial state of the App
export const initialState = {
  listOfShelves: [],
  isOpenAddWindow: false,
};

/* eslint-disable default-case, no-param-reassign */
const shelvesListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LIST_OF_SHELVES:
        draft.listOfShelves = action.listOfShelves;
        break;

      case IS_OPEN_ADD_WINDOW:
        draft.isOpenAddWindow = action.isOpenAddWindow;
        break;
    }
  });

export default shelvesListReducer;
