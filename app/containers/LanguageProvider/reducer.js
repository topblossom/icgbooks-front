/*
 *
 * LanguageProvider reducer
 *
 */

import produce from 'immer';

import { CHANGE_LOCALE, IS_OPEN } from './constants';
import { DEFAULT_LOCALE } from '../../i18n';

export const initialState = {
  locale: DEFAULT_LOCALE,
  isLanguageBarOpen: false,
};

/* eslint-disable default-case, no-param-reassign */
const languageProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_LOCALE:
        draft.locale = action.locale;
        break;
    }
    switch (action.type) {
      case IS_OPEN:
        draft.isLanguageBarOpen = action.isLanguageBarOpen;
        break;
    }
  });

export default languageProviderReducer;
