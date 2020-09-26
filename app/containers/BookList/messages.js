/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.BookList';

export default defineMessages({
  number: {
    id: `${scope}.number`,
    defaultMessage: 'No.',
  },
  pages: {
    id: `${scope}.pages`,
    defaultMessage: 'Pages',
  },
});
