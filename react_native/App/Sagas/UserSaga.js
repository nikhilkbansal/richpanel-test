import {
  all, call, put, takeLatest, select, take,
} from 'redux-saga/effects';

import userActions, { UserTypes } from '../Stores/User/Actions';
import NavigationService from '../Services/NavigationService';
import httpClient from './HttpClient';


export function* login({ payload }) {
  try {
    if (!payload.isRememberMe) {
      yield put(userActions.manageRememberMe(null));
    }

    const payloadData = {
      method: 'post',
      data: {
        ...payload,
      },
      url: 'auth/login',
    };
    const data = yield call(httpClient, payloadData);
    NavigationService.navigate('HomePage');
    yield put(userActions.putUserInfo({ ...data, isLoggedIn: true }));

    if (payload.isRememberMe) {
      yield put(userActions.manageRememberMe(payload));
    }
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
    yield call(httpClient, payloadData);
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
      url: 'auth/register',
    };
    const data = yield call(httpClient, payloadData);
    NavigationService.navigate('HomePage');
    yield put(userActions.putUserInfo({ ...data, isLoggedIn: true }));
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
