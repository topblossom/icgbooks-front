/*
 * ProfilePage Messages
 *
 * This contains all the text for the Profile component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.Profile';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Profile',
  },
  google: {
    id: `${scope}.profile`,
    defaultMessage: 'Login using google account',
  },
});
