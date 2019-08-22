import { all } from 'redux-saga/effects';
import user from './UserSaga';
import post from './PostSaga';
import app from './AppSaga';
import payment from './PaymentSaga';

const sagas = function* sagas() {
  yield all([user(), app(), post(), payment()]);
};

export default sagas;
