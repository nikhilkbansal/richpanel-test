/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { SearchTypes } from './Actions';
import { UserTypes } from '../User/Actions';
import { CommonFunctions } from '../../Utils';

export const putAutoCompleteResults = (state, { payload }) => {
  console.log('payload', payload);
  return {
    ...state,
    autoComplete: { ...payload },
  };
};

export const putSeeAllResults = (state, { payload }) => {
console.log(payload);
  const seeAll = payload.posts.length > 0 
    ? payload.posts :  payload.ngos.length > 0 
    ? payload.ngos: payload.events
  return {
    ...state,
    seeAll: [ ...seeAll ],
  }
};

export const putPostRecommendation = (state, { payload }) => ({
  ...state,
  postsRecommendation: { ...payload },
});

export const logoutSuccess = (state, data) => ({ ...INITIAL_STATE });

export const addShareCount = (state, { payload }) => {
  const posts = [...state.seeAll];
  const postIndex = posts.findIndex(o => o._id === payload.itemId);
  posts[postIndex].sharesCount += 1;

  return { ...state, seeAll: [...posts] };
};


export const postReaction = (state, { payload }) => {
  const posts = [...state.seeAll];
  const postIndex = posts.findIndex(o => o._id === payload._id);
  // if already have some reaction
  if (posts[postIndex].howUserReacted) {
    posts[postIndex].allReactions[`${posts[postIndex].howUserReacted}Count`]
  -= 1;
  } else {
    posts[postIndex].reactionsCount += 1;
  }

  posts[postIndex].howUserReacted = payload.reaction;
  posts[postIndex].allReactions[`${payload.reaction}Count`]
  += 1;

  posts[postIndex].topThreeReactions = CommonFunctions.topThreeReactions(
    posts[postIndex].allReactions,
  );
  return { ...state, seeAll: [...posts] };
};


export const removeReaction = (state, { payload }) => {
  const posts = [...state.seeAll];
  const postIndex = posts.findIndex(o => o._id === payload._id);
  posts[postIndex].reactionsCount -= 1;
  posts[postIndex].allReactions[`${posts[postIndex].howUserReacted}Count`]
  -= 1;
  posts[postIndex].topThreeReactions = CommonFunctions.topThreeReactions(
    posts[postIndex].allReactions,
  );
  posts[postIndex].howUserReacted = false;
  return { ...state, seeAll: [...posts] };
};

export const followUnfollow = (state, { payload }) => {
  let posts = [...state.seeAll];
  posts = posts.map((o) => {
    if (payload.followeeId === o.userId._id) {
      // eslint-disable-next-line no-param-reassign
      o.isFollowed = !payload.isFollowed;
    }
    return o;
  });

  return { ...state, seeAll: [...posts] };
};



/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [SearchTypes.PUT_AUTO_COMPLETE_RESULTS]: putAutoCompleteResults,
  [SearchTypes.PUT_SEE_ALL_RESULTS]: putSeeAllResults,
  [UserTypes.LOGOUT_SUCCESS]: logoutSuccess,
  [SearchTypes.PUT_POST_RECOMMENDATION]: putPostRecommendation, 
  [SearchTypes.POST_REACTION_SUCCESS_FROM_SEARCH]: postReaction,
  [SearchTypes.REMOVE_REACTION_SUCCESS_FROM_SEARCH]: removeReaction,
  [SearchTypes.ADD_SHARE_COUNT_FROM_SEARCH]: addShareCount, 
  [SearchTypes.FOLLOW_UNFOLLOW_FROM_SEARCH]: followUnfollow, 
});
