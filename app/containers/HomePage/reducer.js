/*
 * HomeReducer
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
  CHANGE_USERNAME,
  CHANGE_TITLE,
  CHANGE_OFFSET,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  username: '',
  title: '',
  offset: 0,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:

      // Delete prefixed '@' from the github username
      return state
        .set('username', action.name.replace(/@/gi, ''));
    case CHANGE_TITLE:

      return state
        .set('title', action.title);
    case CHANGE_OFFSET:
      return state
        .set('offset', state.get('offset') + action.offset);
    default:
      return state;
  }
}

export default homeReducer;
