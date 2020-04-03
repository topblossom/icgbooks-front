/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Logout',
  },
  profile: {
    id: `${scope}.profile`,
    defaultMessage: 'Profile',
  },
  features: {
    id: `${scope}.features`,
    defaultMessage: 'Features',
  },
  books: {
    id: `${scope}.books`,
    defaultMessage: 'Books',
  },
  shelves: {
    id: `${scope}.shelves`,
    defaultMessage: 'Shelves',
  },
});
