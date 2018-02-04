import { fromJS } from 'immutable';

import appReducer from '../reducer';
import {
  loadRepos,
  reposLoaded,
  repoLoadingError,
} from '../actions';

describe.only('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      currentUser: false,
      userData: fromJS({
        books: false,
        title: false,
      }),
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadRepos action correctly', () => {
    const expectedResult = state
      .set('loading', false)
      .set('error', false)
      .setIn(['userData', 'books'], false)
      .setIn(['userData', 'title'], false);


    expect(appReducer(state, loadRepos())).toEqual(expectedResult);
  });

  it('should handle the reposLoaded action correctly', () => {
    const fixture = [{
      name: 'My Repo',
    }];
    const expectedResult = state
      .setIn(['userData', 'books'], false)
      .setIn(['userData', 'title'], false)
      .set('loading', false)
      .set('currentUser', false);

    expect(appReducer(state, reposLoaded(fixture, false))).toEqual(expectedResult);
  });

  it('should handle the repoLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = state
      .setIn(['userData', 'books'], false)
      .setIn(['userData', 'title'], false)
      .set('loading', false)
      .set('currentUser', false);

    expect(appReducer(state, repoLoadingError(fixture))).toEqual(expectedResult);
  });
});
