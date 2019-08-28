import { createActions } from 'reduxsauce';


const { Types, Creators } = createActions({
  eventCreate: ['payload'],
  putHomeEvents: ['payload'],
  getHomeEvents: null,
});

export const EventTypes = Types;
export default Creators;
