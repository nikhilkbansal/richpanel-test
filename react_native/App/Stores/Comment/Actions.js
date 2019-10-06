import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  getComment: ['payload'],
  postComment: ['payload'],
  likeUnlikeComment: ['payload'],
  gotComments: ['payload'],
  patchComment: ['payload'],
  patchReply: ['payload'],
  putComment: ['payload'],
  putReply: ['payload'],
  pushReplies: ['payload'],
  pushComments: ['payload'],
});

export const CommentTypes = Types;
export default Creators;
