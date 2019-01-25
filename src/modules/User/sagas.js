import { takeLatest, select, put, call, fork } from 'redux-saga/effects';
import { fetchRequest, fetchSuccess, fetchFailure } from './actions';
import { getUserInfo } from './api';
import { getApiKey } from '../Auth';

//const getApiKey = state => state.auth.apiKey;

function* fetchUserWatcher() {
  yield takeLatest(fetchRequest, fetchUserFlow);
}

export function* fetchUserFlow(action) {
  try {
    const apiKey = yield select(getApiKey);
    const result = yield call(getUserInfo, apiKey, action.payload);
    yield put(fetchSuccess(result));
  } catch (error) {

    yield put(fetchFailure(error));
  }
}

export default function*() {
  
  yield fork(fetchUserWatcher);
}
