/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.HomePage';

export default defineMessages({
  groupName: {
    id: `${scope}.groupName`,
    defaultMessage: 'TopBlossom',
  },
  workStatus: {
    id: `${scope}.workStatus`,
    defaultMessage: 'Work in progress...',
  },
  paragraph: {
    id: `${scope}.paragraph`,
    defaultMessage: 'Place for your bookshelf',
  },
  trymeHeader: {
    id: `${scope}.tryme.header`,
    defaultMessage: 'Try me!',
  },
  trymeMessage: {
    id: `${scope}.tryme.message`,
    defaultMessage: 'Show Github repositories by',
  },
  trymeAtPrefix: {
    id: `${scope}.tryme.atPrefix`,
    defaultMessage: '@',
  },
});
