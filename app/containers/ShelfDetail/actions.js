import { LIST_OF_BOOKS_IN_SHELF, SHELF_NAME } from './constants';

export function changeListOfBooksInShelf(listOfBooksInShelf) {
  return {
    type: LIST_OF_BOOKS_IN_SHELF,
    listOfBooksInShelf,
  };
}
export function changeShelfName(shelfName) {
  return {
    type: SHELF_NAME,
    shelfName,
  };
}
