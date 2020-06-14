import produce from 'immer';
import { LIST_OF_BOOKS_IN_SHELF, SHELF_NAME } from './constants';

// The initial state of the App
export const initialState = {
  listOfBooksInShelf: [],
  shelfName: '',
};

/* eslint-disable default-case, no-param-reassign */
const shelfBooksListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LIST_OF_BOOKS_IN_SHELF:
        draft.listOfBooksInShelf = action.listOfBooksInShelf;
        break;

      case SHELF_NAME:
        draft.shelfName = action.shelfName;
        break;
    }
  });

export default shelfBooksListReducer;
