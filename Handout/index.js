/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
import {AppRegistry} from 'react-native';
import App from 'App/App';

AppRegistry.registerComponent(appName, () => App);
