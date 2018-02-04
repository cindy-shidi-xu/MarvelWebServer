/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectRepos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const makeSelectBooks = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'books'])
);

const makeSelectTotalNumber = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'totalNumber'])
);

const makeSelectLimit = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'limit'])
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectBooks,
  makeSelectTotalNumber,
  makeSelectLimit,
};
