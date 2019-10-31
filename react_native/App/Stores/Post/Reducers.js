/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { PostTypes } from './Actions';
import { UserTypes } from '../User/Actions';
import { CommonFunctions } from '../../Utils';

export const putHomePosts = (state, { payload }) => ({ ...state, homePosts: [...payload] });
export const logoutSuccess = (state, data) => ({ ...INITIAL_STATE });

export const addShareCount = (state, { payload }) => {
  const posts = [...state.homePosts];
  const postIndex = posts.findIndex(o => o._id === payload.itemId);
  posts[postIndex].sharesCount += 1;

  return { ...state, homePosts: [...posts] };
};


export const postReaction = (state, { payload }) => {
  const posts = [...state.homePosts];
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
  return { ...state, homePosts: [...posts] };
};


export const removeReaction = (state, { payload }) => {
  const posts = [...state.homePosts];
  const postIndex = posts.findIndex(o => o._id === payload._id);
  posts[postIndex].reactionsCount -= 1;
  posts[postIndex].allReactions[`${posts[postIndex].howUserReacted}Count`]
  -= 1;
  posts[postIndex].topThreeReactions = CommonFunctions.topThreeReactions(
    posts[postIndex].allReactions,
  );
  posts[postIndex].howUserReacted = false;
  return { ...state, homePosts: [...posts] };
};


export const followUnfollow = (state, { payload }) => {
  let posts = [...state.homePosts];
  posts = posts.map((o) => {
    if (payload.followeeId === o.userId._id) {
      // eslint-disable-next-line no-param-reassign
      o.isFollowed = !payload.isFollowed;
    }
    return o;
  });

  return { ...state, homePosts: [...posts] };
};


/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [PostTypes.PUT_HOME_POSTS]: putHomePosts,
  [UserTypes.LOGOUT_SUCCESS]: logoutSuccess,
  [PostTypes.POST_REACTION_SUCCESS]: postReaction,
  [PostTypes.REMOVE_REACTION_SUCCESS]: removeReaction,
  [PostTypes.ADD_SHARE_COUNT]: addShareCount,
  [PostTypes.FOLLOW_UNFOLLOW_POST]: followUnfollow,
});
