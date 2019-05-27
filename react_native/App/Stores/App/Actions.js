import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  isLoading: ['isLoading'],
});

export const AppTypes = Types;
export default Creators;
