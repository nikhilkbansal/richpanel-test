import { createActions } from 'reduxsauce';


const { Types, Creators } = createActions({
  getNotifications: ['payload'],
  pushNotifications: ['payload'],
});

export const NotificationTypes = Types;
export default Creators;
