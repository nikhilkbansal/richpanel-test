import { createActions } from 'reduxsauce';


const { Types, Creators } = createActions({
  eventCreate: ['payload'],
  putHomeEvents: ['payload'],
  getHomeEvents: null,
  eventReaction: ['payload'],
  removeEventReaction: ['payload'],
  eventReactionSuccess: ['payload'],
  removeEventReactionSuccess: ['payload'],
  shareEvent: ['payload'],
  addEventShareCount: ['payload'],
  followUnfollowEvent: ['payload'],
});

export const EventTypes = Types;
export default Creators;
