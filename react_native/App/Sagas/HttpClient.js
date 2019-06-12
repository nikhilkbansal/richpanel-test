import {
  call, select, put, take,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import Idx from 'idx';
import AppActions from '../Stores/App/Actions';
import Toast from '../Services/ToastService';
// import { showLoader, hideLoader } from '../actions/app-action-types';
// import { refreshToken, logOutSuccess, GOT_REFRESH_TOKEN } from '../actions/user-actions-types';
import AxiosInstance from '../Services/AxiosService';

/**
 * Common HTTP client function to handle common scenerios
 *
 * @param {Object} payload
 * @param {String} access Can be 'private', 'public', 'default'(i.e. Works as private if token exist.)
 * @param {String} isLoader Show loader while running api
 * @param {String} timeout  Set custom timeout if needed
 * @throws If response status is not between 200-300 or any error come inside try block
 */
function* httpClient(payload, access = 'default', isLoader = true, timeout = false) {
  let headers = {};
  const { token } = yield select(({ user: { token: x } }) => ({ token: x }));

  if (token && ['default', 'private'].includes(access)) {
    if (Date.parse(token.expiresIn) - Date.now() < 60000) {
      // yield put(refreshToken());
      // yield take(GOT_REFRESH_TOKEN);
    }
    headers = { Authorization: `${token.tokenType} ${token.accessToken}` };
  }
  const timeoutCoundition = timeout ? { timeout } : {};
  const data = {
    ...payload,
    headers,
    ...timeoutCoundition,
  };

  try {
    if (isLoader) { yield put(AppActions.isLoading(true)); }
    // yield call(delay, 1000);
    const result = yield call(AxiosInstance, data);

    yield put(AppActions.isLoading(false));

    return result.data;
  } catch (error) {
    yield put(AppActions.isLoading(false));
    Toast(error.message);
    if (error && error.code == 401) {
      // yield put(logOutSuccess());
      // yield put(push({ pathname: '/' }));
    }
    throw error;
  }
}

export default httpClient;
