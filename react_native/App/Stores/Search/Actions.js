import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  getSearch: ['payload'],
  putAutoCompleteResults: ['payload'],
  putSeeAllResults: ['payload'],

  getPostRecommendation: ['payload'],
  putPostRecommendation: ['payload'],


});

export const SearchTypes = Types;
export default Creators;
