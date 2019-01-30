// Реализуйте саги
import { takeEvery, take, select, put, call, fork } from 'redux-saga/effects';
import {addKey} from '../Auth'
import { changeSol, fetchPhotosRequest, fetchPhotosSuccess, fetchPhotosFailure } from './actions';
import {
  getCurrentSol,
  isRoverHasPhotosForSol,
  getRovers
} from './RoverPhotos';
import { getPhotos } from './api';


function* fetchPhotosWatcher() {
  yield fork(photosFlow);
  yield takeEvery(fetchPhotosRequest, fetchPhoto);
}
function* photosFlow() {
  const { payload: key } = yield take(addKey);
  const rovers = yield select(getRovers);
  

  while (true) {
    const sol = yield select(getCurrentSol);    
    for (let name of rovers) {      
      const isRoverHasPhotos = yield select(state =>
        isRoverHasPhotosForSol(state, name, sol)        
      );
      if (!isRoverHasPhotos) yield put(fetchPhotosRequest({ key, name, sol }));
    }
    yield take(changeSol);
  }
}

function* fetchPhoto({ payload: { key, name, sol } }) {
  console.log('in saga')
  try {
    const { photos } = yield call(getPhotos, key, name, sol);
    const cleanedPhotos = photos.map(({ id, img_src, camera }) => ({
      id,
      img_src,
      camera
    }));
    console.log(name, sol, cleanedPhotos)
    yield put(fetchPhotosSuccess({ name, sol, photos: cleanedPhotos }));
  } catch (error) {
    yield put(fetchPhotosFailure({ name, sol, error }));
  }
}

export default function*() {
  yield fork(fetchPhotosWatcher);
}
