/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_COMIC } from 'containers/App/constants';
import { reposLoaded, repoLoadingError, comicsFound, comicsGetError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername, makeSelectTitle, makeSelectOffset } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_COMIC, getComics);
}


export function* getComics() {
  // Select username from store
  const offset = yield select(makeSelectOffset());
  const title = yield select(makeSelectTitle());
  const titleParam = title ? `&title=${title}` : '';

  const requestURL = `http://localhost:3500/getComics?offset=${offset}${titleParam}`;

  try {
    // Call our request helper (see 'utils/request')
    const results = yield call(request, requestURL);
    yield put(comicsFound(title, results));
  } catch (err) {
    yield put(comicsGetError(err));
  }
}
