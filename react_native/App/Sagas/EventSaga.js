import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import eventActions, { EventTypes } from '../Stores/Event/Actions';
import NavigationService from '../Services/NavigationService';
import httpClient from './HttpClient';
import { CommonFunctions } from '../Utils';


export function* createEvent({ payload }) {
  try {
    const payloadData = {
      method: 'post',
      data: {
        ...payload,
      },
      url: 'event',
    };
    const data = yield call(httpClient, payloadData);
    NavigationService.navigate('HomePage');
    // yield put(userActions.putUserInfo({ ...data, isLoggedIn: true }));
  } catch (e) {
    console.log('eee', e);
    // catch errors here
  }
}

export function* getHomeEvents() {
  try {
    const payloadData = {
      method: 'get',
      url: 'event/homepageEvents',
    };
    const data = yield call(httpClient, payloadData);
    yield put(eventActions.putHomeEvents(data));
  } catch (e) {
    // console.log('eee', e);
    // catch errors here
  }
}

function* func() {
  yield all(
    [
      takeLatest(EventTypes.EVENT_CREATE, createEvent),
      takeLatest(EventTypes.GET_HOME_EVENTS, getHomeEvents),

    ],
  );
}

export default func;
