import { createActions } from 'reduxsauce';


const { Types, Creators } = createActions({
  postCreate: ['payload'],
});

export const PostTypes = Types;
export default Creators;
