/*
 * LoginPage Messages
 *
 * This contains all the text for the Login component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.Login';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Login',
  },
  google: {
    id: `${scope}.login.google`,
    defaultMessage: 'Login using google account',
  },
});
