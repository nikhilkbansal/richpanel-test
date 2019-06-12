import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import userActions, { UserTypes } from '../Stores/User/Actions';
import NavigationService from '../Services/NavigationService';
import httpClient from './HttpClient';


export function* createPost({ payload }) {
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


function* User() {
  yield all(
    [
      takeLatest(UserTypes.CREATE_POST, createPost),

    ],
  );
}

export default User;
