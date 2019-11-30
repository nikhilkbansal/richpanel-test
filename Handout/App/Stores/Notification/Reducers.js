/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { NotificationTypes } from './Actions';
import { UserTypes } from '../User/Actions';

export const pushNotifications = (state, { payload }) => ({ ...state, notifications: [...payload] });
export const logoutSuccess = (state, data) => ({ ...INITIAL_STATE });

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [NotificationTypes.PUSH_NOTIFICATIONS]: pushNotifications,
  [UserTypes.LOGOUT_SUCCESS]: logoutSuccess,

});
