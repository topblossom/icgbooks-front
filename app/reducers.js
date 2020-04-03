/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import booksListReducer from 'containers/BookList/reducer';
import shelvesListReducer from './containers/Shelves/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    books: booksListReducer,
    shelves: shelvesListReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
