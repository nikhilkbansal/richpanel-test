import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import searchActions, { SearchTypes } from '../Stores/Search/Actions';
import NavigationService from '../Services/NavigationService';
import httpClient from './HttpClient';


export function* getSearch({ payload }) {
  try {
    console.log('payload', payload);
    const payloadData = {
      method: 'get',
      params: {
        ...payload,
      },
      url: 'search',
    };
    const data = yield call(httpClient, payloadData, 'default', false);
    yield put(searchActions.putAutoCompleteResults(data));
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




function* func() {
  yield all(
    [
      takeLatest(SearchTypes.GET_SEARCH, getSearch),
      takeLatest(SearchTypes.GET_POST_RECOMMENDATION, getRecommendationPosts),
      
    ],
  );
}

export default func;
