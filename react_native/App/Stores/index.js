import { combineReducers } from 'redux';
import rootSaga from 'App/Sagas';
import configureStore from './CreateStore';
import { reducer as userReducer } from './User/Reducers';
import { reducer as appReducer } from './App/Reducers';
import { reducer as postReducer } from './Post/Reducers';
import { reducer as paymentReducer } from './Payment/Reducers';
import { reducer as eventReducer } from './Event/Reducers';
import { reducer as searchReducer } from './Search/Reducers';

export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    app: appReducer,
    user: userReducer,
    post: postReducer,
    payment: paymentReducer,
    event: eventReducer,
    search: searchReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
