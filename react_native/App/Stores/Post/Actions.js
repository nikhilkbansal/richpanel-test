import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  postCreate: ['payload'],
  putHomePosts: ['payload'],
  getHomePosts: null,
  postReaction: ['payload'],
  removeReaction: ['payload'],
  postReactionSuccess: ['payload'],
  removeReactionSuccess: ['payload'],
});

export const PostTypes = Types;
export default Creators;
