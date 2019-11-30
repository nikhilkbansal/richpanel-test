/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { UserTypes } from './Actions';

export const putUserInfo = (state, { payload }) => ({ rememberMe: state.rememberMe , deviceToken: state.deviceToken, ...payload });
export const patchUserInfo = (state, { payload }) => ({ ...state, ...payload });
export const manageRememberMe = (state, { payload }) => ({ ...state, rememberMe: payload });
export const logoutSuccess = state => ({ ...INITIAL_STATE, rememberMe: state.rememberMe , deviceToken: state.deviceToken });

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [UserTypes.PUT_USER_INFO]: putUserInfo,
  [UserTypes.PATCH_USER_INFO]: patchUserInfo,
  [UserTypes.MANAGE_REMEMBER_ME]: manageRememberMe,
  [UserTypes.LOGOUT_SUCCESS]: logoutSuccess,
  // [UserTypes.UPLOAD_PROFILE_PIC]: uploadProfilePic,


});
