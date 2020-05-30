import { LIST_OF_BOOKS_IN_SHELF } from './constants';

export function changeListOfBooksInShelf(listOfBooksInShelf) {
  return {
    type: LIST_OF_BOOKS_IN_SHELF,
    listOfBooksInShelf,
  };
}
