import { LIST_OF_SHELVES } from './constants';

export function changeListOfShelves(listOfShelves) {
  return {
    type: LIST_OF_SHELVES,
    listOfShelves,
  };
}
