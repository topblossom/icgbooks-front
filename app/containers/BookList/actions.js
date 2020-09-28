import { LIST_OF_BOOKS, IS_OPTION_OPEN } from './constants';

export function changeListOfBooks(listOfBooks) {
  return {
    type: LIST_OF_BOOKS,
    listOfBooks,
  };
}

export function changeIsOptionOpen(isOptionOpen) {
  return {
    type: IS_OPTION_OPEN,
    isOptionOpen,
  };
}
