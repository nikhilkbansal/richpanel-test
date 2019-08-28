/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { PostTypes } from './Actions';
import { UserTypes } from '../User/Actions';

export const putHomePosts = (state, { payload }) => ({ ...state, homePosts: [...payload] });
export const logoutSuccess = (state, data) => ({ ...INITIAL_STATE });

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [PostTypes.PUT_HOME_POSTS]: putHomePosts,
  [UserTypes.LOGOUT_SUCCESS]: logoutSuccess,

});
