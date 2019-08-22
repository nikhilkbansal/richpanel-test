import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import postActions, { PostTypes } from '../Stores/Post/Actions';
import NavigationService from '../Services/NavigationService';
import httpClient from './HttpClient';
import { CommonFunctions } from '../Utils';


function* uploadFile({ payload }) {
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
    yield put(userActions.patchUserInfo({ profile: { ...profileData, pictures: [data._id, ...profileData.pictures] } }));
  } catch (e) {
    console.log(e);
  }
}

export function* createPost({ payload }) {
  try {
    const payloadData = {
      method: 'post',
      data: {
        ...payload,
      },
      url: 'post',
    };
    const data = yield call(httpClient, payloadData);
    // NavigationService.navigate('HomePage');
    // yield put(userActions.putUserInfo({ ...data, isLoggedIn: true }));
  } catch (e) {
    console.log('eee', e);
    // catch errors here
  }
}


function* User() {
  yield all(
    [
      takeLatest(PostTypes.POST_CREATE, createPost),

    ],
  );
}

export default User;
