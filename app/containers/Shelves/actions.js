import { LIST_OF_SHELVES, IS_OPEN_ADD_WINDOW } from './constants';

export function changeListOfShelves(listOfShelves) {
  return {
    type: LIST_OF_SHELVES,
    listOfShelves,
  };
}
export function changeIsOpenAddWindow(isOpenAddWindow) {
  return {
    type: IS_OPEN_ADD_WINDOW,
    isOpenAddWindow,
  };
}
