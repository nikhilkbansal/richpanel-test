import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import paymentActions, { PaymentTypes } from '../Stores/Payment/Actions';
import NavigationService from '../Services/NavigationService';
import httpClient from './HttpClient';
import { CommonFunctions } from '../Utils';

export function* paymentInit({ payload }) {
  try {
    const payloadData = {
      method: 'post',
      data: {
        ...payload,
        email: 'rahul@gmail.com',
        amount: 100,
        productinfo: 'Donation - Goonj - 2323232',
        firstname: 'Rahul',
        phone: '919999199199',
        lastname: 'Saini',

      },
      url: 'payment/payU/makePayment',
    };
    const data = yield call(httpClient, payloadData);
    console.log('data', data);
    return 223;
    // NavigationService.navigate('HomePage');
    // yield put(userActions.putUserInfo({ ...data, isLoggedIn: true }));
  } catch (e) {
    console.log('eee', e);
    // catch errors here
  }
}


function* Saga() {
  yield all(
    [
      takeLatest(PaymentTypes.PAYMENT_INIT, paymentInit),
    ],
  );
}

export default Saga;
