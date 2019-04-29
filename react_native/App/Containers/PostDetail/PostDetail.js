import React, { Fragment, Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-checkbox';
import {
  Text, NavigationBar, TextInput, Button,
} from '../../Components';
import { Colors, FontSizes } from '../../Theme';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  subContainer: { flex: 1, paddingHorizontal: wp('4%') },
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
    marginTop: hp('4%'),
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
          <View style={styles.firstSection}>
            <Image
              style={{
              height: hp('30%'),
              width: null,
              flex: 1,
              justifyContent: 'center',
            }}
              source={require('../../Assets/Images/child.jpeg')}
            />
          </View>
          <View style={styles.secondSection}>

            <Button
              style={styles.loginContainer}
              titleStyle={styles.loginTitle}
              onPress={() => navigation.navigate('HomePage')}
              title="CONTINUE TO LOGIN"
            />
            <View style={styles.signUpLinkContainer}>
              <Text color="mediumDark" size="h3">Don't have an account? </Text>
              <Button
                style={styles.signUpContainer}
                titleStyle={styles.signUpButton}
                title="Sign Up"
                onPress={() => navigation.navigate('SignUp')}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default LoginScreen;
