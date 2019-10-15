import React, { Component } from 'react';
import {
  View, StyleSheet, ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Text, NavigationBar, TextInput, Button,
} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';
import UserActions from '../../Stores/User/Actions';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ApplicationStyles.lightBackground.color },
  subContainer: { flex: 1, paddingHorizontal: wp('7%') },
  firstSection: { flex: 1 },
  secondSection: { flex: 4, marginTop: hp('5%') },
  tabularButton: {
    marginVertical: hp('4%'),
    flexDirection: 'row',
    borderRadius: ApplicationStyles.commonBorderRadius(wp('80%')),
    overflow: 'hidden',
    width: wp('80%'),
  },
  tabButton: {
    flex: 1,
    alignSelf: 'center',
    height: hp('7%'),
  },
  submitContainer: {
    marginVertical: hp('5%'),
    backgroundColor: ApplicationStyles.primaryColor.color,
    borderRadius: ApplicationStyles.commonBorderRadius(wp('80%')),
    width: wp('80%'),
    alignSelf: 'center',
    height: hp('7%'),
  },
  submitTitle: { },
});


class SignUpScreen extends Component {
  static get propTypes() {
    return {
      theme: PropTypes.object.isRequired,
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: '',
      userType: 'user',
      errors: {},
    };
    this.updateTextInput = this.updateTextInput.bind(this);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.confirmPasswordRef = React.createRef();
    this.userNameRef = React.createRef();
  }

  updateTextInput(key, value) {
    this.setState({ [key]: value });
  }


  tabButtonsStyle(renderedUserType) {
    const { userType } = this.state;
    const activeStyle = { backgroundColor: ApplicationStyles.primaryColor.color };
    const deactiveStyle = { backgroundColor: ApplicationStyles. smokeBackground.color };
    const activeTitleStyle = { color: ApplicationStyles.lightColor.color };
    const deactiveTitleStyle = { color: ApplicationStyles.darkColor.color };
    switch (renderedUserType) {
      case 'user':
        return userType === 'user'
          ? { container: activeStyle, title: activeTitleStyle }
          : { container: deactiveStyle, title: deactiveTitleStyle };
      case 'ngo':
        return userType === 'ngo'
          ? { container: activeStyle, title: activeTitleStyle }
          : { container: deactiveStyle, title: deactiveTitleStyle };
      default: return {};
    }
  }


  signUpInit() {
    const { registerInit } = this.props;
    const {
      email, password, userName, name,
    } = this.state;
    const validateForm = TextInput.validateForm(['name', 'password', 'confirmPassword', 'email', 'userName'], this.state);
    if (validateForm) {
      this.setState({ errors: validateForm });
      return false;
    }

    registerInit({
      email, password, userName, name,
    });
    return true;
  }


  render() {
    const {
      email, password, userType, errors,
    } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} showLeftSection iconsColor={ApplicationStyles.darkColor.color} containerStyle={{ backgroundColor: ApplicationStyles.lightBackground.color, elevation: 0 }} statusBarColor={ApplicationStyles.lightBackground .color} statusBarStyle='dark-content' />
        <KeyboardAwareScrollView style={styles.subContainer}>
          <View style={styles.firstSection}>
            <Text style={ApplicationStyles.headline}>Signup</Text>
            <Text style={ApplicationStyles.subHeadline}>Let's take first step</Text>
          </View>
          <View style={styles.secondSection}>
            <View style={styles.tabularButton}>
              <Button
                style={[styles.tabButton, this.tabButtonsStyle('user').container]}
                titleStyle={[this.tabButtonsStyle('user').title]}
                title="AS USER"
                onPress={() => this.setState({ userType: 'user' })}
              />
              <Button
                style={[styles.tabButton, this.tabButtonsStyle('ngo').container]}
                titleStyle={[this.tabButtonsStyle('ngo').title]}
                title="AS NGO"
                onPress={() => this.setState({ userType: 'ngo' })}
              />
            </View>
            <TextInput
              error={errors.name}
              label="Full Name"
              returnKeyType="next"
              onChangeText={text => this.updateTextInput('name', text)}
              onSubmitEditing={() => this.emailRef.current.focus()}
            />
            <TextInput
              error={errors.email}
              label="Email"
              textInputRef={this.emailRef}
              returnKeyType="next"
              onChangeText={text => this.updateTextInput('email', text)}
              onSubmitEditing={() => this.userNameRef.current.focus()}
            />
            <TextInput
              error={errors.userName}
              label="Username"
              returnKeyType="next"
              textInputRef={this.userNameRef}
              onChangeText={text => this.updateTextInput('userName', text)}
              onSubmitEditing={() => this.passwordRef.current.focus()}
            />
            <TextInput
              error={errors.password}
              label="Password"
              returnKeyType="next"
              textInputRef={this.passwordRef}
              secureTextEntry
              onChangeText={text => this.updateTextInput('password', text)}
              onSubmitEditing={() => this.confirmPasswordRef.current.focus()}
            />
            <TextInput
              error={errors.confirmPassword}
              label="Confirm Password"
              returnKeyType="done"
              secureTextEntry
              textInputRef={this.confirmPasswordRef}
              onChangeText={text => this.updateTextInput('confirmPassword', text)}
              onSubmitEditing={() => this.signUpInit()}
            />
            <Button
              style={styles.submitContainer}
              titleStyle={styles.submitTitle}
              title="SUBMIT"
              onPress={() => this.signUpInit()}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default connect(null, {
  registerInit: UserActions.registerInit,
})(SignUpScreen);
