import { all } from 'redux-saga/effects';
import user from './UserSaga';
import post from './PostSaga';
import event from './EventSaga';
import app from './AppSaga';
import payment from './PaymentSaga';
import search from './SearchSaga';

const sagas = function* sagas() {
  yield all([user(), app(), post(), payment(), event(), search()]);
};

export default sagas;
