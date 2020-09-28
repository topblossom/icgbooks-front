import produce from 'immer';
import { LIST_OF_BOOKS, IS_OPTION_OPEN } from './constants';

// The initial state of the App
export const initialState = {
  listOfBooks: [],
};

/* eslint-disable default-case, no-param-reassign */
const booksListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LIST_OF_BOOKS:
        draft.listOfBooks = action.listOfBooks;
        break;

      case IS_OPTION_OPEN:
        draft.isOptionOpen = action.isOptionOpen;
        break;
    }
  });

export default booksListReducer;
