/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);

const makeSelectTitle = () => createSelector(
  selectHome,
  (homeState) => homeState.get('title')
);

const makeSelectOffset = () => createSelector(
  selectHome,
  (homeState) => homeState.get('offset')
);

export {
  selectHome,
  makeSelectUsername,
  makeSelectTitle,
  makeSelectOffset,
};
