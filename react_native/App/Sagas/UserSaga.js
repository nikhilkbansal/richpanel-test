import {
  all, call, put, takeLatest, select, take,
} from 'redux-saga/effects';

import { UserTypes } from '../Stores/User/Actions';

import httpClient from './HttpClient';


export function* login({ payload }) {
  try {
    const payloadData = {
      method: 'post',
      data: {
        ...payload,
      },
      url: 'auth/login',
    };
    const members = yield call(httpClient, payloadData);
    console.log('members', members);
    // yield put();
  } catch (e) {
    console.log('eee', e);
    // catch errors here
  }
}


export function* forgotPassword({ payload }) {
  try {
    const payloadData = {
      method: 'post',
      data: {
        ...payload,
      },
      url: 'users/forgotPassword',
    };
    const members = yield call(httpClient, payloadData);
  } catch (e) {
  }
}

export function* register({ payload }) {
  try {
    const payloadData = {
      method: 'post',
      data: {
        ...payload,
      },
      url: 'users/forgotPassword',
    };
    const members = yield call(httpClient, payloadData);
  } catch (e) {
  }
}

function* User() {
  yield all(
    [
      takeLatest(UserTypes.LOGIN_INIT, login),
      takeLatest(UserTypes.FORGOT_PASSWORD_INIT, forgotPassword),
      takeLatest(UserTypes.REGISTER_INIT, register),

    ],
  );
}

export default User;
