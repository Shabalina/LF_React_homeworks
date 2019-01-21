import { createStore, compose, applyMiddleware } from 'redux';
import { tvmazeSearchMiddleware } from './middlewares/searchMiddleware';
import { tvmazeShowMiddleware } from './middlewares/showMiddleware';
import rootReducer from './reducers';

const getStore = () => {
    const store = createStore(
      rootReducer,
      compose(
        applyMiddleware(tvmazeSearchMiddleware, tvmazeShowMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__
          ? window.__REDUX_DEVTOOLS_EXTENSION__()
          : noop => noop,
      ),
    );
  
    return store;
  };
  
  export default getStore;
