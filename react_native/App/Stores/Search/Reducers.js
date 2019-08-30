/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { SearchTypes } from './Actions';
import { UserTypes } from '../User/Actions';

export const putAutoCompleteResults = (state, { payload }) => {
  console.log('payload', payload);
  return {
    ...state,
    autoComplete: { ...payload },
  };
};

export const putSeeAllResults = (state, { payload }) => ({
  ...state,
  autoComplete: { ...payload },
});

export const logoutSuccess = (state, data) => ({ ...INITIAL_STATE });

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [SearchTypes.PUT_AUTO_COMPLETE_RESULTS]: putAutoCompleteResults,
  [SearchTypes.PUT_SEE_ALL_RESULTS]: putSeeAllResults,
  [UserTypes.LOGOUT_SUCCESS]: logoutSuccess,
});
