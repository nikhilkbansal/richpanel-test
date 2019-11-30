import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  postCreate: ['payload'],
  putHomePosts: ['payload'],
  pushHomePosts: ['payload'],
  getHomePosts: ['payload'],
  postReaction: ['payload'],
  removeReaction: ['payload'],
  postReactionSuccess: ['payload'],
  removeReactionSuccess: ['payload'],
  sharePost: ['payload'],
  addShareCount: ['payload'],
  followUnfollowPost: ['payload'],
});

export const PostTypes = Types;
export default Creators;
