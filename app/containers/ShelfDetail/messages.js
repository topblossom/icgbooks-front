/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Shelves';

export default defineMessages({
  id: {
    id: `${scope}.id`,
    defaultMessage: 'ID',
  },
  books: {
    id: `${scope}.books`,
    defaultMessage: 'Books amount',
  },
});
