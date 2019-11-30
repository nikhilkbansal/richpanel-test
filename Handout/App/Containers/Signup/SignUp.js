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
import Toast from '../../Services/ToastService';
import AxiosRequest from '../../Services/HttpRequestService';
import Dialog, { DialogContent, SlideAnimation, DialogTitle } from 'react-native-popup-dialog';

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
  signUpContainer: { alignSelf: 'center' },
  signUpButton: { ...ApplicationStyles.fontStyles.button, ...ApplicationStyles.primaryColor,}

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
      otpModalVisible: false,
      orgOtp:'',
      resendTimer:0
    };
    this.updateTextInput = this.updateTextInput.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.sendOtp = this.sendOtp.bind(this);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.confirmPasswordRef = React.createRef();
    this.userNameRef = React.createRef();
  }

  componentWillUnmount(){
    clearInterval(this.timerInterval)
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

  async sendOtp() {
    const { phone } = this.state;
    try {
      const data = await AxiosRequest({
        method: 'get',
        params: {
          phone
        },
        url: 'users/sendOtp',
      });
      this.setState({ orgOtp: data.otp, otpModalVisible: true, resendTimer: 30 }, ()=>{
        this.startTimer();
      });
    } catch (e) {
      Toast('Some error occured. Please try again later');
    }
  }

  startTimer(){
    this.timerInterval = setInterval(()=>{
      const { resendTimer } = this.state;
      if(resendTimer > 0){
        this.setState({resendTimer: resendTimer - 1})
      }else{
        clearInterval(this.timerInterval)
      }
    },1000)
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

    this.sendOtp();

  }

  signUpComplete() {
    const { registerInit } = this.props;
    const {
      email, password, userName, name, userType, phone, otp, orgOtp
    } = this.state;

    if(otp != orgOtp){
      Toast('Incorrect OTP!');
      return;
    }
    this.setState({   otpModalVisible: false });

    registerInit({
      email, password, userName, name, role: userType, phone 
    });
    return true;
  }

  render() {
    const {
      email, password, otpModalVisible, userType, errors, resendTimer
    } = this.state;
    const { navigation } = this.props;
// console.log('this.phoneRef',this.phoneRef);
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} showLeftSection iconsColor={ApplicationStyles.darkColor.color} containerStyle={{ backgroundColor: ApplicationStyles.lightBackground.color, elevation: 0 }} statusBarColor={ApplicationStyles.lightBackground .color} statusBarStyle='dark-content' />
        
        <Dialog
          visible={otpModalVisible}
          dialogAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          onTouchOutside={()=>this.setState({otpModalVisible:false})}
        >
          <DialogContent style={{
            width: wp('70%'),
            maxHeight: hp('70%'),
            justifyContent: 'center',
            alignItems: 'center',
            justifyItems: 'center',
            alignContent: 'center',
            paddingTop: hp('3%'),
          }}
          >
             <TextInput
              error={errors.name}
              label={"Enter OTP"}
              returnKeyType="done"
              mask='[9] [9] [9]  [9] [9] [9]'
              keyboardType='number-pad'
              placeholder='X X X X X X'
              containerStyle={{ width:'100%'}}
              onChangeText={(text, error) => this.updateTextInput('otp', text, error)}
            />

            <Button
              style={[styles.submitContainer, { width: '90%', marginTop: hp('3%')}]}
              titleStyle={styles.submitTitle}
              title="NEXT"
              onPress={() => this.signUpComplete()}
            />
            <View style={[styles.signUpLinkContainer,{marginTop: hp('0.9%')}]}>
        <Text style={{ ...ApplicationStyles.fontStyles.body1 }}>{resendTimer > 0 ? "You can resend in "+resendTimer+" sec" : "Didn't get any otp?"}</Text>
              <Button
                style={styles.signUpContainer}
                titleStyle={styles.signUpButton}
                title={resendTimer > 0 ? "" :" Resend"}
                onPress={() =>resendTimer < 1 && this.sendOtp()}
              />
            </View>
          </DialogContent>
        </Dialog>
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
              unique='email'
              returnKeyType="next"
              keyboardType='email-address'
              onChangeText={(text, error)  => this.updateTextInput('email', text, error)}
              onSubmitEditing={() => this.phoneRef.focus()}
            />
            <TextInput
              error={errors.phone}
              label="Phone no."
              placeholder='Phone no.'
              unique='phone'
              keyboardType='phone-pad'
              mask='{+91} [99999] [9999999999]'
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
