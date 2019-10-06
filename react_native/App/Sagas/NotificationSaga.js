import {
  all, call, put, takeLatest, select, take,
} from 'redux-saga/effects';
import httpClient from './HttpClient';
import { Config } from '../Config';
import notificaitonActions, { NotificationTypes } from '../Stores/Notification/Actions';

export function* getNotifications({ payload }) {
  try {
    const payloadData = {
      method: 'get',
      params: {
        ...payload,
        perPage: Config.PAGE_SIZE,
      },
      url: 'notification',
    };
    const data = yield call(httpClient, payloadData, 'default', !payload.skip);
    yield put(notificaitonActions.gotComments(data));
  } catch (e) {
    // catch errors here
  }
}


function* Saga() {
  yield all(
    [
      takeLatest(NotificationTypes.GET_NOTIFICATIONS, getNotifications),
    ],
  );
}

export default Saga;
