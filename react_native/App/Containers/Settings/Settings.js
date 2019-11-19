import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView, StatusBar,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import UserActions from 'App/Stores/User/Actions';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {
  Text, NavigationBar, TextInput, Button, ProgressiveImage, MenuItem
} from '../../Components';
import {
  Colors, FontSizes, Fonts, ApplicationStyles,
} from '../../Theme';
import CommonFunctions from '../../Utils/CommonFunctions';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ApplicationStyles.smokeBackground.color },
  subContainer: { flex: 1, paddingHorizontal: wp('5%') },
  loginContainer: {
    marginVertical: hp('4%'),
    backgroundColor: ApplicationStyles.primaryColor.color,
    borderRadius: wp('2%'),
    width: wp('80%'),
    alignSelf: 'center',
    height: hp('7%'),
  },
  loginTitle: { color: ApplicationStyles.lightColor.color, textAlign: 'center', fontSize: FontSizes.h3 },
  sectionContainer: {
    backgroundColor: ApplicationStyles.lightBackground.color,
    ...ApplicationStyles.elevationS,
    flex: 1,
    borderRadius: wp('2%'),
    overflow: 'hidden',
    marginTop: hp('1.5%'),
  },
  userInfo: {
    padding: wp('2%'),
    borderRadius: wp('2%'),
    marginTop: -hp('1%'),
    backgroundColor: ApplicationStyles.lightBackground.color,

  },
  imageButton: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('20%') / 2,
    overflow: 'hidden',
    borderColor: ApplicationStyles.primaryColor.color,
    marginLeft: wp('4%'),
    justifyContent: 'center',
    marginVertical: wp('2%'),
  },
  nameDetail: { paddingHorizontal: wp('2%'), flex: 1, flexDirection: 'row' },
  info: { padding: wp('1%'), margin: wp('1%'), ...ApplicationStyles.info3 },
});

class Settings extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: '',
      checked: false,
    };
  }

  componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(ApplicationStyles.primaryColor.color);
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }


  render() {
    const { navigation, profile, logoutInit } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} rightButtonAction={() => navigation.navigate('EditProfile')} title="Settings" />

        <ScrollView style={styles.subContainer}>
           {/* <View style={[styles.sectionContainer, ]}>
            <MenuItem rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} leftLabel='Notifications' />
          </View> */}
          {profile && profile.role === 'ngo' && <View style={[styles.sectionContainer, ]}>
            <MenuItem onPress={()=>navigation.navigate('AddBankAccount')} rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} leftLabel='Bank Account' />
          </View>}

          <View style={[styles.sectionContainer, ]}>
            <MenuItem rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} leftLabel='FAQs' />
          </View>
          <View style={[styles.sectionContainer, ]}>
            <MenuItem rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} leftLabel='About us' />
          </View>
          <View style={[styles.sectionContainer, ]}>
            <MenuItem rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} leftLabel='Contact us' />
          </View>
          <View style={[styles.sectionContainer, ]}>
            <MenuItem leftLabel='Logout' onPress={logoutInit}/>
          </View>

          
        </ScrollView>
        <View style={{position:'absolute',width:'100%',  justifyContent:'center', bottom: hp('2%')}}>
          <Text style={ApplicationStyles.tabLabelStyle, {textAlign: 'center'}}> Handout Version 1.0 </Text>
        </View>

      </View>
    );
  }
}
export default connect(
  ({ user: { profile } }) => ({ profile }), {
    logoutInit: UserActions.logoutInit,
  },
)(Settings);
