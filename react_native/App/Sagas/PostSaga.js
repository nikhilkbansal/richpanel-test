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
    const data = yield call(httpClient, payloadData, 'default', false);
    yield put(postActions.putHomePosts(data));
  } catch (e) {
    console.log('eee', e);
    // catch errors here
  }
}

export function* postReaction({ payload }) {
  try {
    const payloadData = {
      method: 'post',
      url: 'reaction',
      data: {
        ...payload,
        itemId: payload._id,
        itemType: 'post',
      },
    };
    yield call(httpClient, payloadData, 'default', 'false');
    yield put(postActions.postReactionSuccess(payload));
  } catch (e) {
    console.log('eee', e);
    // catch errors here
  }
}


export function* share({ payload }) {
  try {
    const payloadData = {
      method: 'post',
      url: 'share',
      data: {
        ...payload,
      },
    };
    yield call(httpClient, payloadData, 'default', 'false');
    yield put(postActions.addShareCount(payload));
  } catch (e) {
    // catch errors here
  }
}


export function* removeReaction({ payload }) {
  try {
    const payloadData = {
      method: 'delete',
      url: 'reaction',
      data: {
        itemId: payload._id,
      },
    };
    yield call(httpClient, payloadData, 'default', 'false');
    yield put(postActions.removeReactionSuccess(payload));
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
      takeLatest(PostTypes.POST_REACTION, postReaction),
      takeLatest(PostTypes.REMOVE_REACTION, removeReaction),
      takeLatest(PostTypes.SHARE_POST, share),

    ],
  );
}

export default User;
