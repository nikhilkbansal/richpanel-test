import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, Image, ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-checkbox';
import {
  Text, NavigationBar, TextInput, Button,
} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  subContainer: { flex: 1, paddingHorizontal: wp('3%') },
  firstSection: { flex: 1 },
  secondSection: { flex: 4, paddingHorizontal: wp('1%') },
  remeberPassContainer: {
    marginVertical: hp('1%'),
    width: wp('92%'),
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  remeberText: { justifyContent: 'flex-start' },
  forgetButton: { color: Colors.mediumDarkFont, textAlign: 'center', fontSize: FontSizes.h3 },
  forgetButtonContainer: { alignSelf: 'center' },
  loginContainer: {
    marginVertical: hp('2%'),
    backgroundColor: Colors.primary,
    borderRadius: wp('2%'),
    width: wp('80%'),
    alignSelf: 'center',
    height: hp('7%'),
  },
  loginTitle: { },
  signUpLinkContainer: {
    width: wp('80%'), marginVertical: hp('2%'), flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center',
  },
  signUpContainer: { alignSelf: 'center' },
  signUpButton: { color: Colors.primary, textAlign: 'center', fontSize: FontSizes.h3 },
  totalRaised: {
    flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: hp('1%'),
  },
  raisedMoney: { ...ApplicationStyles.info2, alignContent: 'center', justifyContent: 'center' },

});

class LoginScreen extends Component {
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

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} />
        <ScrollView style={styles.subContainer}>
          <Image
            style={{
              width: null,
              height: hp('30%'),
              borderRadius: hp('1.5%'),
              justifyContent: 'center',
            }}
            resizeMode="cover"
            source={require('../../Assets/Images/child.jpeg')}
          />
          <View style={{ paddingHorizontal: wp('4%') }}>
            <View style={{ paddingVertical: hp('2.5%') }}>
              <Text style={ApplicationStyles.subHeadline2}>John Abrahm added on 23 jan 2019</Text>
              <Text style={ApplicationStyles.headline2}>Help the poor children and give them clothes </Text>
            </View>
            <View style={{ backgroundColor: Colors.accent, height: hp('0.2%') }}>
              <View style={{ backgroundColor: Colors.primary, width: '56%', height: hp('0.2%') }} />
            </View>


            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: hp('1%'),
            }}
            >
              <Text style={ApplicationStyles.bodySubHeading}>TOTAL RAISED</Text>
              <Text style={styles.raisedMoney}>
            $1000
                <Text style={ApplicationStyles.primaryInfo}> $1500</Text>
              </Text>
            </View>
          </View>
          <View style={styles.secondSection}>
            <Text style={{
              ...ApplicationStyles.body3, textAlign: 'justify', paddingHorizontal: wp('2.5%'), paddingVertical: hp('1%'),
            }}
            >
              We need your help. We are doing good job. We need your help. We are doing good job.
               We need your help. We are doing good job. We need your help. We are doing good job.
               We need your help. We are doing good job. We need your help. We are doing good job.
               We need your help. We are doing good job. We need your help. We are doing good job.
               We need your help. We are doing good job. We need your help. We are doing good job.
               We need your help. We are doing good job. We need your help. We are doing good job.
               We need your help. We are doing good job. We need your help.  We need your help. We are doing good job. We need your help. We are doing good job.
               We need your help. We are doing good job. We need your help. We are doing good job.
               We need your help. We are doing good job. We need your help. We are doing good job.
               We need your help. We are doing good job. We need your help. We are doing good job.
               We need your help. We are doing good job. We need your help. We are doing good job.
               We need your help. We are doing good job. We need your help. We are doing good job.
               We need your help. We are doing good job. We need your help. We are doing good job.
               We need your help. We are doing good job. We need your help. We are doing good job.
            </Text>
            <Button
              style={styles.loginContainer}
              titleStyle={styles.loginTitle}
              onPress={() => navigation.navigate('HomePage')}
              title="DONATE"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default LoginScreen;
