import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  postCreate: ['payload'],
  putHomePosts: ['payload'],
  getHomePosts: null,
});

export const PostTypes = Types;
export default Creators;
