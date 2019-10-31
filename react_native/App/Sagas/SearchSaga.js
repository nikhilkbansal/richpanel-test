import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import searchActions, { SearchTypes } from '../Stores/Search/Actions';
import NavigationService from '../Services/NavigationService';
import httpClient from './HttpClient';


export function* getSearch({ payload }) {
  try {
    console.log('payload', payload);
    if(!payload.term){
      delete payload.term;
    }

    const payloadData = {
      method: 'get',
      params: {
        ...payload,
      },
      url: 'search',
    };
    const data = yield call(httpClient, payloadData, 'default', false);
    if(payload.type === 'all'){
      yield put(searchActions.putAutoCompleteResults(data));
    }
    else{
      yield put(searchActions.putSeeAllResults(data));
    }
  } catch (e) {
    console.log('eee', e);
    // catch errors here
  }
}

export function* getRecommendationPosts({ payload }) {
  try {
    console.log('payload', payload);
    const payloadData = {
      method: 'get',
      params: {
        ...payload,
      },
      url: '/search/recommendation/posts',
    };
    const data = yield call(httpClient, payloadData, 'default', false);
    yield put(searchActions.putAutoCompleteResults(data));
  } catch (e) {
    console.log('eee', e);
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
    yield call(httpClient, payloadData, 'default', false);
    yield put(searchActions.postReactionSuccessFromSearch(payload));
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
    yield call(httpClient, payloadData, 'default', false);
    yield put(searchActions.addShareCountFromSearch(payload));
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
    yield call(httpClient, payloadData, 'default', false);
    yield put(searchActions.removeReactionSuccessFromSearch(payload));
  } catch (e) {
    console.log('eee', e);
    // catch errors here
  }
}


function* func() {
  yield all(
    [
      takeLatest(SearchTypes.GET_SEARCH, getSearch),
      takeLatest(SearchTypes.GET_POST_RECOMMENDATION, getRecommendationPosts),
      takeLatest(SearchTypes.POST_REACTION_FROM_SEARCH, postReaction),
      takeLatest(SearchTypes.REMOVE_REACTION_FROM_SEARCH, removeReaction),
      takeLatest(SearchTypes.SHARE_POST_FROM_SEARCH, share),
    ],
  );
}

export default func;
