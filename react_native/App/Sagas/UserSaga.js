import {
  all, call, put, takeLatest, select,
} from 'redux-saga/effects';

import { delay } from 'redux-saga';
import userActions, { UserTypes } from '../Stores/User/Actions';
import { INITIAL_STATE } from '../Stores/User/InitialState';
import NavigationService from '../Services/NavigationService';
import httpClient from './HttpClient';
import { CommonFunctions } from '../Utils';


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
    yield put(userActions.putUserInfo({ ...data, isLoggedIn: true }));
    if (payload.isRememberMe) {
      yield put(userActions.manageRememberMe(payload));
    }
    yield call(delay, 500);
    NavigationService.navigate('HomePage');
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

export function* updateUser({ payload }) {
  try {
    const profileData = yield select(({ user: { profile } }) => profile);

    const payloadData = {
      method: 'patch',
      data: {
        ...payload,
      },
      url: `users/${profileData.id}`,
    };
    const data = yield call(httpClient, payloadData);
    yield put(userActions.patchUserInfo({ profile: data }));
    NavigationService.goBack();
  } catch (e) {
  }
}


export function* logoutInit() {
  const refreshTokenStr = yield select(({ user: { token: { refreshToken } } }) => refreshToken);

  try {
    const payloadData = {
      method: 'post',
      data: {
        refreshToken: refreshTokenStr,
      },
      url: 'auth/logout',
    };
    yield call(httpClient, payloadData);
    NavigationService.navigate('LogIn');
    yield put(userActions.logoutSuccess());
  } catch (e) {
  }
}

export function* uploadProfilePic({ payload }) {
  const formData = yield call(CommonFunctions.createFormData, payload.file, 'file', payload.body);
  const profileData = yield select(({ user: { profile } }) => profile);

  try {
    const payloadData = {
      method: 'post',
      data: formData,
      url: 'files',
    };
    const data = yield call(httpClient, payloadData);
    console.log('data', data);
    yield put(userActions.patchUserInfo({ profile: { ...profileData, picture: data[0]._id } }));
  } catch (e) {
    console.log(e);
  }
}


function* User() {
  yield all(
    [
      takeLatest(UserTypes.LOGIN_INIT, login),
      takeLatest(UserTypes.FORGOT_PASSWORD_INIT, forgotPassword),
      takeLatest(UserTypes.REGISTER_INIT, register),
      takeLatest(UserTypes.UPDATE_USER_INIT, updateUser),
      takeLatest(UserTypes.LOGOUT_INIT, logoutInit),
      takeLatest(UserTypes.UPLOAD_PROFILE_PIC, uploadProfilePic),

    ],
  );
}

export default User;
