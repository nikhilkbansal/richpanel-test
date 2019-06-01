import { combineReducers } from 'redux';
import rootSaga from 'App/Sagas';
import configureStore from './CreateStore';
import { reducer as userReducer } from './User/Reducers';
import { reducer as appReducer } from './App/Reducers';

export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    app: appReducer,
    user: userReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
