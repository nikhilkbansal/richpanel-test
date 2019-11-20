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
  secondSection: { flex: 4, marginTop: hp('5%'), marginBottom: hp('7%') },
  tabularButton: {
    marginVertical: hp('1%'),
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
    marginTop: hp('5%'),
    backgroundColor: ApplicationStyles.primaryColor.color,
    borderRadius: ApplicationStyles.commonBorderRadius(wp('80%')),
    width: wp('80%'),
    alignSelf: 'center',
    height: hp('7%'),
  },
  submitTitle: { },
  signUpLinkContainer: {
    width: wp('80%'),   flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center',
  },
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
      name: '',
      email: '',
      phone: '',
      userName: '',
      password: '',
      userType: 'user',
      errors: {},
      inputError:[],
    };
    this.updateTextInput = this.updateTextInput.bind(this);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.confirmPasswordRef = React.createRef();
    this.userNameRef = React.createRef();
  }

  updateTextInput(key, value, error = false) {
    const { inputError } = this.state;
    if(error){
      inputError.push(key);
    } else {
      const index = inputError.findIndex(o=>o===key);
      if(index > -1){
        inputError.splice(index, 1);
      }
    }
    this.setState({ [key]: value, inputError });
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
      email, password, userName, name, userType, inputError, phone
    } = this.state;
    const validateForm = TextInput.validateForm(['name', 'password', 'confirmPassword', 'phone', 'email', 'userName'], this.state);
    if (validateForm || inputError.length > 0) {
      this.setState({ errors: validateForm });
      return false;
    } else {
      this.setState({ errors: {} });
    }

    registerInit({
      email, password, userName, name, role: userType, phone 
    });
    return true;
  }


  render() {
    const {
      email, password, userType, errors,
    } = this.state;
    const { navigation } = this.props;
console.log('this.phoneRef',this.phoneRef);
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} showLeftSection iconsColor={ApplicationStyles.darkColor.color} containerStyle={{ backgroundColor: ApplicationStyles.lightBackground.color, elevation: 0 }} statusBarColor={ApplicationStyles.lightBackground .color} statusBarStyle='dark-content' />
        <KeyboardAwareScrollView style={styles.subContainer}>
          <View style={styles.firstSection}>
            <Text style={ApplicationStyles.fontStyles.headline}>Signup</Text>
            <Text style={ApplicationStyles.fontStyles.subheading}>Let's take first step</Text>
          </View>
          <View style={styles.secondSection}>
            <View style={styles.signUpLinkContainer}>
              <Text style={{ ...ApplicationStyles.fontStyles.caption }}>Signup as a</Text>
            </View>
            <View style={styles.tabularButton}>
              <Button
                style={[styles.tabButton, this.tabButtonsStyle('user').container]}
                titleStyle={[this.tabButtonsStyle('user').title]}
                title="USER"
                onPress={() => this.setState({ userType: 'user' })}
              />
              <Button
                style={[styles.tabButton, this.tabButtonsStyle('ngo').container]}
                titleStyle={[this.tabButtonsStyle('ngo').title]}
                title="PO"
                onPress={() => this.setState({ userType: 'ngo' })}
              />
            </View>
            <View style={{...styles.signUpLinkContainer, marginBottom: hp('4%')}}>
              <Text style={{ ...ApplicationStyles.fontStyles.caption }}>PO: Philanthropy Organizations (NGO, NPO etc)</Text>
             </View>
            <View>
            <TextInput
              error={errors.name}
              label={userType === 'ngo' ? "PO Name": "Name"}
              returnKeyType="next"
              placeholder={userType === 'ngo' ? 'Philanthropy organization name' :'Name'}
              onChangeText={text => this.updateTextInput('name', text)}
              onSubmitEditing={() => this.userNameRef.current.focus()}
            />
            <TextInput
              error={errors.userName}
              label="Username"
              returnKeyType="next"
              placeholder='Username'
              unique='userName'
              textInputRef={this.userNameRef}
              onChangeText={(text, error) => this.updateTextInput('userName', text, error)}
              onSubmitEditing={() => this.emailRef.current.focus()}
            />
            <TextInput
              error={errors.email}
              label="Email"
              placeholder='Email address'
              textInputRef={this.emailRef}
              returnKeyType="next"
              keyboardType='email-address'
              onChangeText={text => this.updateTextInput('email', text)}
              onSubmitEditing={() => this.phoneRef.focus()}
            />
            <TextInput
              error={errors.phone}
              label="Phone no."
              placeholder='Phone no. with country code e.g. 91 9xxxxxxx8'
              unique='phone'
              keyboardType='phone-pad'
              mask='{+}[99] [99999] [9999999999]'
              textInputRef={(ref)=>this.phoneRef=ref}
              returnKeyType="next"
              onChangeText={(text, error) => this.updateTextInput('phone', text, error)}
              onSubmitEditing={() => this.passwordRef.current.focus()}
            />
            <TextInput
              error={errors.password}
              label="Password"
              returnKeyType="next"
              textInputRef={this.passwordRef}
              placeholder='Enter between 6 to 18 characters'
              secureTextEntry
              onChangeText={text => this.updateTextInput('password', text)}
              onSubmitEditing={() => this.confirmPasswordRef.current.focus()}
            />
            <TextInput
              error={errors.confirmPassword}
              label="Confirm Password"
              returnKeyType="done"
              secureTextEntry
              placeholder='Confirm Password'
              textInputRef={this.confirmPasswordRef}
              onChangeText={text => this.updateTextInput('confirmPassword', text)}
              onSubmitEditing={() => this.signUpInit()}
            />
            </View>

            <Button
              style={styles.submitContainer}
              titleStyle={styles.submitTitle}
              title="SUBMIT"
              onPress={() => this.signUpInit()}
            />
            { userType ==='ngo' && <View style={{...styles.signUpLinkContainer, width: '100%', marginTop: hp('0.5%') }}>
                <Text style={{  ...ApplicationStyles.fontStyles.caption, textAlign:'center', }}>Note: As soon as we will get your request, we will start verifification process. Once you verified we will notify you and then you will be able to login</Text>
            </View>}
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default connect(null, {
  registerInit: UserActions.registerInit,
})(SignUpScreen);
