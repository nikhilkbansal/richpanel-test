/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { CommentTypes } from './Actions';

export const gotComments = (state, { payload }) => ({
  ...state,
  comments: [...payload],
});

export const patchComment = (state, { payload: { commentIndex, newComment } }) => {
  const comments = [...state.comments];
  comments[commentIndex] = { ...comments[commentIndex], ...newComment };
  return {
    ...state,
    comments: [...comments],
  };
};

export const patchReply = (state, { payload: { commentIndex, replyIndex, newReply } }) => {
  const comments = [...state.comments];
  comments[commentIndex].replies[replyIndex] = {
    ...comments[commentIndex].replies[replyIndex],
    ...newReply,
  };
  return {
    ...state,
    comments: [...comments],
  };
};


export const putComment = (state, { payload: { newComment } }) => {
  let comments = [...state.comments];
  comments = [newComment].concat(comments);
  return {
    ...state,
    comments: [...comments],
  };
};


export const putReply = (state, { payload: { commentIndex, newReply } }) => {
  const comments = [...state.comments];
  comments[commentIndex].replies = [newReply].concat(comments[commentIndex].replies);
  return {
    ...state,
    comments: [...comments],
  };
};


export const pushComments = (state, { payload: { comments: newComments } }) => {
  const comments = [...state.comments];
  return {
    ...state,
    comments: [...comments.concat(newComments)],
  };
};


export const pushReplies = (state, { payload: { commentIndex, replies } }) => {
  const comments = [...state.comments];
  comments[commentIndex].replies = comments[commentIndex].replies.concat(replies);
  return {
    ...state,
    comments: [...comments],
  };
};


/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [CommentTypes.GOT_COMMENTS]: gotComments,
  [CommentTypes.PATCH_COMMENT]: patchComment,
  [CommentTypes.PATCH_REPLY]: patchReply,
  [CommentTypes.PUT_COMMENT]: putComment,
  [CommentTypes.PUT_REPLY]: putReply,
  [CommentTypes.PUSH_REPLIES]: pushReplies,
  [CommentTypes.PUSH_COMMENTS]: pushComments,


});
