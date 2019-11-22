import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, ScrollView, ActivityIndicator, Alert
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
import Toast from '../../Services/ToastService';
import {
  Colors, FontSizes, Fonts, ApplicationStyles,
} from '../../Theme';
import AxiosRequest from '../../Services/HttpRequestService';

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
  remeberText: { ...ApplicationStyles.body },
  forgetButton: {
    ...ApplicationStyles.body,

  },
  forgetButtonContainer: { alignSelf: 'center' },
  loginContainer: {
    marginVertical: hp('5%'),
    backgroundColor: ApplicationStyles.primaryColor.color,
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
  sectionContainer: {
    backgroundColor: ApplicationStyles.lightBackground.color,
    ...ApplicationStyles.elevationS,
    borderRadius: wp('2%'),
    marginTop: hp('3%'),
    marginHorizontal: wp('2%'),
    paddingHorizontal: wp('6%'),
    paddingVertical: wp('3%'),
    // flex:1,
  }
});


class ContactUs extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    const { profile } = props;
    this.state = {
      name: profile.name || '',
      email: profile.email ||'',
      errors: {},
      savedBankDetails: null
    };
    this.updateTextInput = this.updateTextInput.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.emailRef = React.createRef();
    this.msgRef = React.createRef();
 }
  
  updateTextInput(key, value) {
    this.setState({ [key]: value });
  }

  async sendMessage() {
    const {
      message,
      email, 
      name } = this.state
    
    const validateForm = TextInput.validateForm(['name', 'email', 'message'], this.state);
    if (validateForm) {
      this.setState({ errors: validateForm });
      return false;
    } else {
      this.setState({ errors: {} });
    }


    await AxiosRequest({
      method: 'post',
      data: {
        message,
        email, 
        name
      },
      url: 'contactUs',
    });
    Toast('Message sent successfully');
    
  }

 
  
 
  render() {
    const { navigation } = this.props;
    const {
      name, email, message, errors, savedBankDetails
    } = this.state;
    return (
      <View style={[styles.container, {backgroundColor: savedBankDetails ? ApplicationStyles.smokeBackground.color: ApplicationStyles.lightBackground.color}]}>
        <NavigationBar {...navigation} statusBarColor={ApplicationStyles.primaryColor.color} title="Contact Us" />
       <KeyboardAwareScrollView style={styles.subContainer}>
          <View style={styles.secondSection}>
            <TextInput
              label="Name"
              returnKeyType="next"
              error={errors.name}
              onSubmitEditing={() => this.emailRef.current.focus()}
              value={name}
              onChangeText={text => this.updateTextInput('name', text)}
            />
            <TextInput
              label="Email"
              value={email}
              error={errors.email}
              returnKeyType="next"
              textInputRef={this.emailRef}
              onSubmitEditing={() => this.msgRef.current.focus()}
              onChangeText={text => this.updateTextInput('email', text)}
            />
            <TextInput
              label="Message"
              returnKeyType="next"
              placeholder=''
              value={message}
              multiline
              error={errors.message}
              numberOfLines={4}
              textInputRef={this.msgRef}
              onSubmitEditing={() => this.sendMessage()}
              onChangeText={text => this.updateTextInput('message', text)}
            />
          </View>
          <Button
            style={styles.loginContainer}
            titleStyle={styles.loginTitle}
            onPress={this.sendMessage}
            title="Send"
          />
         
        </KeyboardAwareScrollView>
      
      </View>
    );
  }
}

export default connect(({ user: { profile } }) => ({
  profile,
}), {
})(ContactUs);
