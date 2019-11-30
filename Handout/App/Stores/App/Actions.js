import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  isLoading: ['isLoading'],
  startUp: null,
});

export const AppTypes = Types;
export default Creators;
