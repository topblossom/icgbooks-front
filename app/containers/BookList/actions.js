import { LIST_OF_BOOKS } from './constants';

export function changeListOfBooks(listOfBooks) {
  return {
    type: LIST_OF_BOOKS,
    listOfBooks,
  };
}
