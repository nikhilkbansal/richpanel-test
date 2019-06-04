import { all } from 'redux-saga/effects';
import user from './UserSaga';
import app from './AppSaga';

const sagas = function* sagas() {
  yield all([user(), app()]);
};

export default sagas;
