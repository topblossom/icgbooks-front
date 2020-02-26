/*
 *
 * LanguageProvider actions
 *
 */

import { CHANGE_LOCALE, IS_OPEN } from './constants';

export function changeLocale(languageLocale) {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}

export function changeIsLanguageBarOpen(isLanguageBarOpen) {
  return {
    type: IS_OPEN,
    isLanguageBarOpen,
  };
}
