// Реализуйте саги
import { takeEvery, select, put, call, fork } from 'redux-saga/effects';
import {getApiKey} from '../Auth'
import { changeSol, fetchPhotosRequest, fetchPhotosSuccess, fetchPhotosFailure } from './actions';
import {
  getCurrentSol,
  isRoverHasPhotosForSol,
  roversName
} from './RoverPhotos';
import { getPhotos } from './api';

function* changeSolFlow(action) {
    const sol = yield select(getCurrentSol);
    for (let name of roversName) {
        const isRoverHasPhotos = yield select(state =>
        isRoverHasPhotosForSol(state, name, sol)        
      );
      if (!isRoverHasPhotos) {
        yield put(fetchPhotosRequest({ name, sol}));
      }
    }
    //yield take(changeSol)
  //}
}  
  
  function* fetchPhotoFlow(action) {
    const { sol, name } = action.payload;
    const apiKey = yield select(getApiKey);
  
    try {
      const { photos } = yield call(getPhotos, apiKey, name, sol);
  
      yield put(fetchPhotosSuccess({ name, sol, photos }));
    } catch (error) {
      yield put(fetchPhotosFailure(sol, name, error));
    }
  }
  
  function* fetchRoverWatcher() {
    yield takeEvery(fetchPhotosRequest, fetchPhotoFlow);
  }
  
  export default function*() {
    
    yield fork(fetchRoverWatcher);
    yield takeEvery(changeSol, changeSolFlow);    
  }