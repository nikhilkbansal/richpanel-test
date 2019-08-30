import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  getSearch: ['payload'],
  putAutoCompleteResults: ['payload'],
  putSeeAllResults: ['payload'],
});

export const SearchTypes = Types;
export default Creators;
