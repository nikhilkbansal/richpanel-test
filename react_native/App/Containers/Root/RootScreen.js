import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import NavigationService from 'App/Services/NavigationService';
import { View, StatusBar } from 'react-native';
// import ExampleScreen from 'App/Containers/Example/ExampleScreen';
import LogIn from 'App/Containers/Login/LogIn';
import SignUp from 'App/Containers/Signup/SignUp';
import HomePage from 'App/Containers/HomePage/HomePage';
import ForgetPassword from 'App/Containers/ForgetPassword/ForgetPassword';
import GetStarted from 'App/Containers/GetStarted/GetStarted';
import EditProfile from 'App/Containers/EditProfile/EditProfile';
import MyDonations from 'App/Containers/MyDonations/MyDonations';
import RecurringDonations from 'App/Containers/RecurringDonations/RecurringDonations';
import AddPost from 'App/Containers/AddPost/AddPost';
import AddEvent from 'App/Containers/AddEvent/AddEvent';
import Payment from 'App/Containers/Payment/Payment';
import SelectPaymentMethod from 'App/Containers/Payment/SelectPaymentMethod';
import Donate from 'App/Containers/Donate/Donate';
import SeeAllSearch from 'App/Containers/SeeAllSearch/SeeAllSearch';
import Comment from 'App/Containers/Comment/Comment';
import NgoProfile from 'App/Containers/NgoProfile/NgoProfile';
import Profile from 'App/Containers/Profile/Profile';
import SingleDonation  from 'App/Containers/MyDonations/SingleDonation';
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen';
import StyleGuide from 'App/Containers/StyleGuide/StyleGuide';
import AdditionalPayment from 'App/Containers/Payment/AdditionalPayment';
import AddBankAccount from 'App/Containers/Payment/AddBankAccount';
import OrgInfo from 'App/Containers/PoPages/OrgInfo';
import ContactUs from 'App/Containers/ContactUs/ContactUs';
import PoSlider from 'App/Containers/PoPages/PoSlider';
import Followings from 'App/Containers/Followings/Followings';
import Settings from 'App/Containers/Settings/Settings';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppActions from 'App/Stores/App/Actions';
import Loader from '../../Components/Loader';
import styles from './RootScreenStyle';
import Colors from '../../Theme/Colors';
import Fonts from '../../Theme/Fonts';
import FontSizes from '../../Theme/FontSizes';
/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const AppNav = createAppContainer(createStackNavigator(
  {
    SplashScreen,
    LogIn,
    SignUp,
    ForgetPassword,
    HomePage,
    GetStarted,
    EditProfile,
    MyDonations,
    AddPost,
    AddEvent,
    StyleGuide,
    Payment,
    AdditionalPayment,
    Comment,
    SelectPaymentMethod,
    Donate,
    SeeAllSearch,
    NgoProfile,
    Profile,
    AddBankAccount,
    OrgInfo,
    Followings,
    RecurringDonations,
    PoSlider,
    Settings,
    ContactUs,
    SingleDonation
  },
  {
    // By default the application will show the this screen
    initialRouteName: 'LogIn',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerMode: 'none',
  },
));

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
    const { startUp } = this.props;
    startUp();
  }

  render() {
    return (
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Loader />
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


RootScreen.propTypes = {
  startUp: PropTypes.PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  {
    startUp: AppActions.startUp,
  },
)(RootScreen);
