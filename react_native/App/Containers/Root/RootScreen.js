import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import NavigationService from 'App/Services/NavigationService';
import { View } from 'react-native';
import ExampleScreen from 'App/Containers/Example/ExampleScreen';
import LogIn from 'App/Containers/Account/LogIn';
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StartupActions from 'App/Stores/Startup/Actions';
import styles from './RootScreenStyle';

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const AppNav = createStackNavigator(
  {
    // Create the application routes here (the key is the route name,
    // the value is the target screen)
    // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
    SplashScreen,
    // The main application screen is our "ExampleScreen". Feel free to replace it with your
    // own screen and remove the example.
    MainScreen: LogIn,
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'MainScreen',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerMode: 'none',
  },
);

class RootScreen extends Component {
  componentDidMount() {
    // Run the startup saga when the application is starting
    const { startup } = this.props;
    startup();
  }

  render() {
    return (
      <View style={styles.container}>
        <AppNav
          // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup()),
});


RootScreen.propTypes = {
  startup: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootScreen);
