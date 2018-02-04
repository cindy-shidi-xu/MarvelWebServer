/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  GET_COMIC_SUCCESS,
  GET_COMIC_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    books: false,
    title: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMIC_SUCCESS:
      return state
        .setIn(['userData', 'books'], action.results.results)
        .setIn(['userData', 'title'], action.results.title)
        .setIn(['userData', 'totalNumber'], action.results.total)
        .setIn(['userData', 'limit'], action.results.limit)
        .set('loading', false);
    case GET_COMIC_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
