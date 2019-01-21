// Реализуйте searchMiddleware
// Обратите внимание на файл `searchMiddleware.test.js`

// Вам необходимо обработать searchRequest
// После получения данных с сервера - диспачте searchSuccess
// В случае ошибки searchFailure

// На забудьте вызвать метод next.

import {
    searchFailure,
    searchSuccess,
    searchRequest,
  } from '../actions/searchActions';

import {search} from '../api.js'
  
  export const tvmazeSearchMiddleware = store => next => action => {
    if (action.type === searchRequest.toString()) {
        search(action.payload)
        .then(shows => {
          store.dispatch(searchSuccess(shows));
        })
        .catch(error => {
          store.dispatch(searchFailure(error));
        });
    }
    return next(action);
  };
