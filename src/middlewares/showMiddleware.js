// Реализуйте showMiddleware

// Вам необходимо обработать showRequest
// После получения данных с сервера - диспачте showSuccess
// В случае ошибки showSuccess

// На забудьте вызвать метод next.

import {
    showFailure,
    showSuccess,
    showRequest,
  } from '../actions/showActions';

import {show} from '../api.js'
  
  export const tvmazeShowMiddleware = store => next => action => {
    if (action.type === showRequest.toString()) {
        show(action.payload)
        .then(show => {
          store.dispatch(showSuccess(show));
        })
        .catch(error => {
          store.dispatch(showFailure(error));
        });
    }
    return next(action);
  };
