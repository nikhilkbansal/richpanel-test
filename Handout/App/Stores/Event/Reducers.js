/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { EventTypes } from './Actions';
import { UserTypes } from '../User/Actions';
import { CommonFunctions } from '../../Utils';

export const putHomeEvent = (state, { payload }) => ({ ...state, homeEvents: [...payload] });
export const pushHomeEvent = (state, { payload }) => ({ ...state, homeEvents: [...state.homeEvents,...payload] });
export const logoutSuccess = (state, data) => ({ ...INITIAL_STATE });

export const addShareCount = (state, { payload }) => {
  const events = [...state.homeEvents];

  const eventIndex = events.findIndex(o => o._id === payload.itemId);
  events[eventIndex].sharesCount += 1;

  return { ...state, homeEvents: [...events] };
};


export const eventReaction = (state, { payload }) => {
  const events = [...state.homeEvents];
  const eventIndex = events.findIndex(o => o._id === payload._id);
  // if already have some reaction
  if (events[eventIndex].howUserReacted) {
    events[eventIndex].allReactions[`${events[eventIndex].howUserReacted}Count`]
  -= 1;
  } else {
    events[eventIndex].reactionsCount += 1;
  }

  events[eventIndex].howUserReacted = payload.reaction;
  events[eventIndex].allReactions[`${payload.reaction}Count`]
  += 1;

  events[eventIndex].topThreeReactions = CommonFunctions.topThreeReactions(
    events[eventIndex].allReactions,
  );
  return { ...state, homeEvents: [...events] };
};


export const removeReaction = (state, { payload }) => {
  const events = [...state.homeEvents];
  const eventIndex = events.findIndex(o => o._id === payload._id);
  events[eventIndex].reactionsCount -= 1;
  events[eventIndex].allReactions[`${events[eventIndex].howUserReacted}Count`]
  -= 1;
  events[eventIndex].topThreeReactions = CommonFunctions.topThreeReactions(
    events[eventIndex].allReactions,
  );
  events[eventIndex].howUserReacted = false;
  return { ...state, homeEvents: [...events] };
};


export const followUnfollow = (state, { payload }) => {
  let events = [...state.homeEvents];
  events = events.map((o) => {
    if (payload.followeeId === o.userId._id) {
      // eslint-disable-next-line no-param-reassign
      o.isFollowed = !payload.isFollowed;
    }
    return o;
  });

  return { ...state, homeEvents: [...events] };
};


/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [EventTypes.PUT_HOME_EVENTS]: putHomeEvent,
  [EventTypes.PUSH_HOME_EVENTS]: pushHomeEvent,
  [UserTypes.LOGOUT_SUCCESS]: logoutSuccess,
  [EventTypes.EVENT_REACTION_SUCCESS]: eventReaction,
  [EventTypes.REMOVE_EVENT_REACTION_SUCCESS]: removeReaction,
  [EventTypes.ADD_EVENT_SHARE_COUNT]: addShareCount,
  [EventTypes.FOLLOW_UNFOLLOW_EVENT]: followUnfollow,
});
