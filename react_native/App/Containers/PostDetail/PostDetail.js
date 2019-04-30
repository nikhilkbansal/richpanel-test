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
import { Colors, FontSizes } from '../../Theme';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  subContainer: { flex: 1, paddingHorizontal: wp('2%') },
  firstSection: { flex: 1 },
  secondSection: { flex: 4 },
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
  loginTitle: { color: Colors.lightFont, textAlign: 'center', fontSize: FontSizes.h3 },
  signUpLinkContainer: {
    width: wp('80%'), marginVertical: hp('2%'), flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center',
  },
  signUpContainer: { alignSelf: 'center' },
  signUpButton: { color: Colors.primary, textAlign: 'center', fontSize: FontSizes.h3 },
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
        <View style={styles.subContainer}>
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
          <View style={{ paddingHorizontal: wp('2.5%') }}>
            <View style={{ paddingVertical: hp('2.5%') }}>
              <Text size="h3" color="slightDark">john abrahm added on 23 jan 2019</Text>
              <Text size="h2">Help the poor children and give them clothes </Text>
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
              <Text size="h3" color="slightDark">TOTAL RAISED</Text>
              <Text size="h3" color="slightDark">
            $1000
                <Text size="h2" color="primary"> $1500</Text>
              </Text>
            </View>
          </View>
          <View style={styles.secondSection}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text size="h3" color="mediumDark" style={{ textAlign: 'justify', paddingHorizontal: wp('2.5%'), paddingVertical: hp('1%') }}>
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
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

export default LoginScreen;
