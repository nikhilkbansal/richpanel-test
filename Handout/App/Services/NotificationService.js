import { AppState } from 'react-native';
import FCM, { FCMEvent } from 'react-native-fcm';
import userActions from '../Stores/User/Actions';

let notificationListener,
  refreshTokenListener;
let appState = AppState.currentState;


/**
 * Initiliazing push notification
 */

export function pushNotificationInit(store) {
  // Listen to the applciation state changes.
  AppState.addEventListener('change', (nextAppState) => {
    appState = nextAppState;
  });

  FCM.requestPermissions(); // for iOS
  // FCM token on intial app load.
  FCM.getFCMToken().then((token) => {
    if (token) {
      store.dispatch(userActions.patchUserInfo({ deviceToken: token}));
    }
  });

  // Receive Notification in kill state, inactive state or bankground state.
  FCM.getInitialNotification().then((res) => {
    console.log('getInitialNotification', res);
  });

  // Receive Notification in forground
  notificationListener = FCM.on(FCMEvent.Notification, async (res) => {
    console.log('res on notification', res);
  });

  // Fcm token may not be available on first load, catch it here
  refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
    if (token) {
      store.dispatch(userActions.patchUserInfo({ deviceToken: token}));
    }
  });
}

/**
 * Redirection on Notification Tap.
 */

export function onNotificationRedirection(res, store) {

}

/**
 * Stop listening push notification events
 */

export function pushNotificationRemove(store) {
  notificationListener.remove();
  refreshTokenListener.remove();
  // Remove to the applciation state changes listener.
  AppState.removeEventListener('change', (nextAppState) => {
    appState = nextAppState;
  });
}


// import { AppState } from 'react-native';
// import FCM, { FCMEvent } from 'react-native-fcm';
// import _ from 'lodash';
// import Idx from './Idx';
// import * as userActions from '../redux/modules/user';
// import Constants from '../constants';
// import * as navigationActions from '../redux/modules/nav';

// let notificationListener,
//   refreshTokenListener;
// let appState = AppState.currentState;


// /**
//  * Initiliazing push notification
//  */

// export function pushNotificationInit(store, notificationRef) {
//   // Listen to the applciation state changes.
//   AppState.addEventListener('change', (nextAppState) => {
//     appState = nextAppState;
//   });

//   FCM.requestPermissions(); // for iOS
//   // FCM token on intial app load.
//   FCM.getFCMToken().then((token) => {
//     if (token) {
//       store.dispatch(userActions.setDeviceToken(token));
//     }
//   });

//   // Receive Notification in kill state, inactive state or bankground state.
//   FCM.getInitialNotification().then((res) => {
//     if (Idx(res, _ => _.fcm.action)) {
//       setTimeout(() => {
//         onNotificationRedirection(res, store);
//       }, 500);
//     }
//   });

//   // Receive Notification in forground
//   notificationListener = FCM.on(FCMEvent.Notification, async (res) => {
//     // If current state is active show local notification.
//     if (appState === 'active') {
//       notificationRef.show({
//         title: res.fcm.title, // Notification Title
//         message: res.fcm.body, // Notification Message
//         onPress: () => onNotificationRedirection(res, store), // On Press Event.
//         icon: Constants.Images.loginLogo,
//         vibrate: true,
//       });
//     }
//     if (res.opened_from_tray) {
//       setTimeout(() => {
//         onNotificationRedirection(res, store);
//       }, 500);
//     }
//   });

//   // Fcm token may not be available on first load, catch it here
//   refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
//     if (token) {
//       store.dispatch(userActions.setDeviceToken(token));
//     }
//   });
// }

// /**
//  * Redirection on Notification Tap.
//  */

// export function onNotificationRedirection(res, store) {
//   if (Idx(store.getState().user, _ => _.userDetails)) {
//     const { dispatch } = store;
//     const { business } = store.getState().user.userDetails; // 0 Consumer , 1 Business
//     let myOrders = '',
//       myFavFollowers = 'Favourite';

//     if (parseInt(res.activeRole) === 1) {
//       myOrders = business.type === 'Chef' ? 'ChefOrders' : 'DriverOrders';
//     } else {
//       myOrders = 'MyOrders';
//     }
//     if (Idx(res, _ => _.action)) {
//       myFavFollowers = res.action === 'follow' ? 'Followers' : 'Notifications';
//     }

//     // Check  If Consumer is in NF Delivery Order Process & Stop Push Navigation.
//     if (Idx(store.getState().order, _ => _.currentOrder)) {
//       if (_.isFunction(res.finish)) {
//         res.finish();
//       }
//       return;
//     }

//     // Navigate user based on their role.
//     switch (parseInt(res.type)) {
//       case 2: // Takes user to My Fav / My Followers.
//         if (store.getState().nav.routes[store.getState().nav.routes.length - 1].routeName !== myFavFollowers) {
//           dispatch(navigationActions.goTo({ route: myFavFollowers, params: null }));
//         }
//         break;
//       case 3: // Takes user to Orders.
//         if (res.action && res.action === 'ratings') {
//           if (store.getState().nav.routes[store.getState().nav.routes.length - 1].routeName !== 'Review') {
//             dispatch(navigationActions.goTo({ route: 'Review', params: null }));
//           }
//         } else if (store.getState().nav.routes[store.getState().nav.routes.length - 1].routeName !== myOrders) {
//           dispatch(navigationActions.goTo({ route: myOrders, params: null }));
//         }
//         break;
//       case 6: // Takes user to Chat Page.
//         if (store.getState().nav.routes[store.getState().nav.routes.length - 1].routeName !== 'ChatRoom') {
//           dispatch(navigationActions.goTo({ route: 'ChatRoom', params: { user: JSON.parse(res.user) } }));
//         }
//         break;
//       default:
//         // In Case Of Any Other Notification Take User to Notifications Page.
//         if (store.getState().nav.routes[store.getState().nav.routes.length - 1].routeName !== 'Notifications') {
//           dispatch(navigationActions.goTo({ route: 'Notifications', params: null }));
//         }
//         break;
//     }
//   }
//   // Finish Notification
//   if (_.isFunction(res.finish)) {
//     res.finish();
//   }
// }

// /**
//  * Stop listening push notification events
//  */

// export function pushNotificationRemove(store) {
//   notificationListener.remove();
//   refreshTokenListener.remove();
//   // Remove to the applciation state changes listener.
//   AppState.removeEventListener('change', (nextAppState) => {
//     appState = nextAppState;
//   });
// }
