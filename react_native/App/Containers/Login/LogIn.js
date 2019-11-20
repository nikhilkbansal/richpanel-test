import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, ScrollView, ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
// import CheckBox from 'react-native-checkbox';
import CheckBox from 'react-native-check-box';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Text, NavigationBar, TextInput, Button,
} from '../../Components';
import {
  Colors, FontSizes, Fonts, ApplicationStyles,
} from '../../Theme';
import UserActions from '../../Stores/User/Actions';
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ApplicationStyles.lightBackground.color },
  subContainer: { flex: 1, paddingHorizontal: wp('7%') },
  firstSection: { flex: 1 },
  secondSection: { flex: 4, marginTop: hp('5%') },
  remeberPassContainer: {
    marginVertical: hp('1%'),
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  remeberText: { ...ApplicationStyles.fontStyles.button },
  forgetButton: { ...ApplicationStyles.fontStyles.button

  },
  forgetButtonContainer: { alignSelf: 'center' },
  loginContainer: {
    marginTop: hp('5%'),
    backgroundColor: ApplicationStyles.primaryBackground.color,
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
  signUpButton: { ...ApplicationStyles.fontStyles.button, ...ApplicationStyles.primaryColor,
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
    const { user: { rememberMe } } = props;
    this.state = {
      usernameOrEmail: rememberMe ? rememberMe.userName : '',
      password: rememberMe ? rememberMe.password : '',
      isRememberMe: !!rememberMe,
      errors: {},
    };
    this.loginInit = this.loginInit.bind(this);
    this.updateTextInput = this.updateTextInput.bind(this);
    this.passwordRef = React.createRef();
  }

  updateTextInput(key, value) {
    this.setState({ [key]: value });
  }

  loginInit() {
    const { loginInit } = this.props;
    const { usernameOrEmail, password, isRememberMe } = this.state;
    const validateForm = TextInput.validateForm(['usernameOrEmail', 'password'], this.state);
    if (validateForm) {
      this.setState({ errors: validateForm });
      return false;
    } else {
      this.setState({ errors: {} });
    }

    loginInit({ userName: usernameOrEmail, password, isRememberMe });
  }


  render() {
    console.log('this.props', this.props);
    const { navigation } = this.props;
    const {
      errors, isRememberMe, usernameOrEmail, password,
    } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} showLeftSection iconsColor={ApplicationStyles.darkColor.color} containerStyle={{ backgroundColor: ApplicationStyles.lightBackground.color, elevation: 0 }} statusBarColor={ApplicationStyles.lightBackground.color} statusBarStyle="dark-content" />
        <KeyboardAwareScrollView style={styles.subContainer}>
          <View style={styles.firstSection}>
            <Text style={[ApplicationStyles.fontStyles.headline]}>Login</Text>
            <Text style={ApplicationStyles.fontStyles.subheading}>Get started with your journey</Text>
          </View>
          <View style={styles.secondSection}>
            <TextInput
              error={errors.usernameOrEmail}
              label="Username or Email"
              returnKeyType="next"
              value={usernameOrEmail}
              onChangeText={text => this.updateTextInput('usernameOrEmail', text)}
              onSubmitEditing={() => this.passwordRef.current.focus()}
            />
            <TextInput
              error={errors.password}
              label="Password"
              textInputRef={this.passwordRef}
              returnKeyType="done"
              secureTextEntry
              value={password}
              onSubmitEditing={this.loginInit}
              onChangeText={text => this.updateTextInput('password', text)}
              placeholder="Enter between 6 to 18 characters"
            />
            <View style={styles.remeberPassContainer}>
              <CheckBox
                style={{ flex: 1 }}
                onClick={() => {
                  this.setState({
                    isRememberMe: !isRememberMe,
                  });
                }}
                isChecked={isRememberMe}
                rightText="Remember me"
                rightTextStyle={{ ...ApplicationStyles.fontStyles.button, textAlign: 'left' }}
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
              onPress={this.loginInit}
              title="CONTINUE TO LOGIN"
            />
            <View style={styles.signUpLinkContainer}>
              <Text style={{ ...ApplicationStyles.fontStyles.body1 }}>Don't have an account? </Text>
              <Button
                style={styles.signUpContainer}
                titleStyle={styles.signUpButton}
                title="Sign Up"
                onPress={() => navigation.navigate('SignUp')}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default connect(
  ({ user }) => ({ user }), {
    loginInit: UserActions.loginInit,
  },
)(LoginScreen);
