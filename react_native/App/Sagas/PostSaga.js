import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import postActions, { PostTypes } from '../Stores/Post/Actions';
import NavigationService from '../Services/NavigationService';
import httpClient from './HttpClient';

export function* createPost({ payload }) {
  try {
    const payloadData = {
      method: 'post',
      data: {
        ...payload,
      },
      url: 'post',
    };
    yield call(httpClient, payloadData);
    NavigationService.navigate('HomePage');
  } catch (e) {
    console.log('eee', e);
    // catch errors here
  }
}

export function* getHomePosts() {
  try {
    const payloadData = {
      method: 'get',
      url: 'post/homepagePosts',
    };
    const data = yield call(httpClient, payloadData);
    yield put(postActions.putHomePosts(data));
  } catch (e) {
    console.log('eee', e);
    // catch errors here
  }
}


function* User() {
  yield all(
    [
      takeLatest(PostTypes.POST_CREATE, createPost),
      takeLatest(PostTypes.GET_HOME_POSTS, getHomePosts),

    ],
  );
}

export default User;
