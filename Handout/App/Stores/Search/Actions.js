import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  getSearch: ['payload'],
  putAutoCompleteResults: ['payload'],
  putSeeAllResults: ['payload'],
  pushSeeAllResults: ['payload'],
  getPostRecommendation: ['payload'],
  putPostRecommendation: ['payload'],
  postReactionFromSearch: ['payload'],
  removeReactionFromSearch: ['payload'],
  sharePostFromSearch: ['payload'],
  postReactionSuccessFromSearch: ['payload'],
  addShareCountFromSearch: ['payload'],
  removeReactionSuccessFromSearch: ['payload'],
  followUnfollowFromSearch: ['payload'],
});

export const SearchTypes = Types;
export default Creators;
