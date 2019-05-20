import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, ScrollView, ActivityIndicator,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
// import CheckBox from 'react-native-checkbox';
import CheckBox from 'react-native-check-box';
import {
  Text, NavigationBar, TextInput, Button,
} from '../../Components';
import {
  Colors, FontSizes, Fonts, FontStyles, ApplicationStyles,
} from '../../Theme';
// const ItemCheckbox = require('react-native-item-checkbox');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  subContainer: { flex: 1, paddingHorizontal: wp('7%') },
  firstSection: { flex: 1 },
  secondSection: { flex: 4, marginTop: hp('4%') },
  remeberPassContainer: {
    marginVertical: hp('1%'),
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  remeberText: { ...ApplicationStyles.body },
  forgetButton: {
    ...ApplicationStyles.body,

  },
  forgetButtonContainer: { alignSelf: 'center' },
  loginContainer: {
    marginTop: hp('5%'),
    backgroundColor: Colors.primary,
    borderRadius: ApplicationStyles.commonBorderRadius(wp('80%')),
    width: wp('80%'),
    alignSelf: 'center',
    height: hp('7%'),
  },
  loginTitle: { },
  signUpLinkContainer: {
    width: wp('80%'), marginVertical: hp('2%'), flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center',
  },
  signUpContainer: { alignSelf: 'center' },
  signUpButton: {
    ...ApplicationStyles.info, ...ApplicationStyles.primaryColor,
  },
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
      isChecked: false,
    };
  }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView style={styles.container}>
        <NavigationBar {...navigation} showLeftSection />
        <View style={styles.subContainer}>
          <View style={styles.firstSection}>
            <Text style={ApplicationStyles.headline}>Login</Text>
            <Text style={ApplicationStyles.subHeadline}>Get started with your journey</Text>
          </View>
          <View style={styles.secondSection}>
            <TextInput label="Username or Email" />
            <TextInput label="Password" secureTextEntry />
            <View style={styles.remeberPassContainer}>
              <CheckBox
                style={{ flex: 1 }}
                onClick={() => {
                  this.setState({
                    isChecked: !this.state.isChecked,
                  });
                }}
                isChecked={this.state.isChecked}
                rightText="Remember Password"
                rightTextStyle={{ ...ApplicationStyles.body, textAlign: 'left' }}
                checkBoxColor={ApplicationStyles.primaryColor.color}
                uncheckedCheckBoxColor={ApplicationStyles.disabledColor.color}
              />

              <Button
                style={styles.forgetButtonContainer}
                titleStyle={styles.forgetButton}
                title="Forget Password"
                onPress={() => navigation.navigate('ForgetPassword')}
              />
            </View>
            <Button
              style={styles.loginContainer}
              titleStyle={styles.loginTitle}
              onPress={() => navigation.navigate('HomePage')}
              title="CONTINUE TO LOGIN"
            />
            <View style={styles.signUpLinkContainer}>
              <Text style={{ ...ApplicationStyles.info }}>Don't have an account? </Text>
              <Button
                style={styles.signUpContainer}
                titleStyle={styles.signUpButton}
                title="Sign Up"
                onPress={() => navigation.navigate('SignUp')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default LoginScreen;
