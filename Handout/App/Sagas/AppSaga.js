import {
  all, call, put, takeLatest, select, take,
} from 'redux-saga/effects';

import { AppTypes } from '../Stores/App/Actions';
import NavigationService from '../Services/NavigationService';


export function* startUp() {
  const isUserLoggedIn = yield select(({ user: { isLoggedIn } }) => isLoggedIn);

  if (isUserLoggedIn) {
    NavigationService.navigate('HomePage');
  }
}


function* Saga() {
  yield all(
    [
      takeLatest(AppTypes.START_UP, startUp),
    ],
  );
}

export default Saga;
