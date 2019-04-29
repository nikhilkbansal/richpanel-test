import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import NavigationService from 'App/Services/NavigationService';
import { View } from 'react-native';
// import ExampleScreen from 'App/Containers/Example/ExampleScreen';
import LogIn from 'App/Containers/Login/LogIn';
import SignUp from 'App/Containers/Signup/SignUp';
import HomePage from 'App/Containers/HomePage/HomePage';
import ForgetPassword from 'App/Containers/ForgetPassword/ForgetPassword';
import GetStarted from 'App/Containers/GetStarted/GetStarted';
import PostDetail from 'App/Containers/PostDetail/PostDetail';
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StartupActions from 'App/Stores/Startup/Actions';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './RootScreenStyle';
import Colors from '../../Theme/Colors';
import Fonts from '../../Theme/Fonts';
import FontSizes from '../../Theme/FontSizes';
/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const AppNav = createStackNavigator(
  {
    SplashScreen,
    LogIn,
    SignUp,
    ForgetPassword,
    HomePage,
    GetStarted,
    PostDetail,
  },
  {
    // By default the application will show the this screen
    initialRouteName: 'LogIn',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerMode: 'none',
  },
);

/**
 * Theme configuraion
 */
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...Colors,
  },
  fonts: {
    ...DefaultTheme.fonts,
    ...Fonts,
  },
  fontSizes: {
    ...FontSizes,
  },
};
class RootScreen extends Component {
  componentDidMount() {
    // Run the startup saga when the application is starting
    const { startup } = this.props;
    startup();
  }

  render() {
    return (
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <AppNav
          // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </View>
      </PaperProvider>
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
