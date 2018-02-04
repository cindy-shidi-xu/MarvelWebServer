/**
 * Tests for HomePage sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { GET_COMIC } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import githubData, { getRepos, getComics } from '../saga';

const username = 'mxstbr';

/* eslint-disable redux-saga/yield-effects */
describe('getRepos Saga', () => {
  let getReposGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getReposGenerator = getRepos();

    const selectDescriptor = getReposGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getReposGenerator.next(username).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the reposLoaded action if it requests the data successfully', () => {
    const response = [{
      name: 'First repo',
    }, {
      name: 'Second repo',
    }];
    const putDescriptor = getReposGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(reposLoaded(response, username)));
  });

  it('should call the repoLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getReposGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(repoLoadingError(response)));
  });
});

describe('githubDataSaga Saga', () => {
  const githubDataSaga = githubData();

  it('should start task to watch for GET_COMICs action', () => {
    const takeLatestDescriptor = githubDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(GET_COMIC, getComics));
  });
});
