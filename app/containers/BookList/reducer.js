import produce from 'immer';
import { LIST_OF_BOOKS } from './constants';

// The initial state of the App
export const initialState = {
  listOfBooks: [],
};

/* eslint-disable default-case, no-param-reassign */
const booksListReducer = (state = initialState, action) =>
  produce(state, draft => {
    if (action.type === LIST_OF_BOOKS) {
      draft.listOfBooks = action.listOfBooks;
    }
  });

export default booksListReducer;
