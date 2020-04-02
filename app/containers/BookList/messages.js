/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.BookList';

export default defineMessages({
  id: {
    id: `${scope}.id`,
    defaultMessage: 'ID',
  },
  pages: {
    id: `${scope}.pages`,
    defaultMessage: 'Pages',
  },
});
