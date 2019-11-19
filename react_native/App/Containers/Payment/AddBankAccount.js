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
});


class AddBankAccount extends Component {
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
      email: profile.email || '',
      phone: profile.phone || '',
      errors: {},
    };
    this.updateTextInput = this.updateTextInput.bind(this);
    this.passwordRef = React.createRef();
    this.addBeneficiaryAccouont = this.addBeneficiaryAccouont.bind(this);

    this.emailRef = React.createRef();
    this.phoneRef = React.createRef();
    this.bankAccountRef = React.createRef();
    this.ifscRef = React.createRef();
    this.address1Ref = React.createRef();
    this.address2Ref = React.createRef();
    this.cityRef = React.createRef();
    this.stateRef = React.createRef();
    this.pincodeRef = React.createRef();
  }

  updateTextInput(key, value) {
    this.setState({ [key]: value });
  }


  async addBeneficiaryAccouont() {
    // console.log({ ...this.state });
    const validateForm = TextInput.validateForm(['name', 'email', 'phone', 'bankAccount', 'ifsc', 'address1'], this.state);
    if (validateForm) {
      this.setState({ errors: validateForm });
      return false;
    }

    await AxiosRequest({
      method: 'post',
      data: {
        ...this.state,
      },
      url: 'payment/cashFree/addPayoutBeneficiary',
    });
  }

  render() {
    const { navigation } = this.props;
    const {
      name, email, phone, errors
    } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} statusBarColor={ApplicationStyles.primaryColor.color} title="Bank Account" />
        <KeyboardAwareScrollView style={styles.subContainer}>
          <View style={styles.secondSection}>
            <TextInput
              label="Name"
              returnKeyType="next"
              onSubmitEditing={() => this.emailRef.current.focus()}
              value={name}
              onChangeText={text => this.updateTextInput('name', text)}
            />
            <TextInput
              label="Email"
              value={email}
              error={errors.name}
              returnKeyType="next"
              textInputRef={this.emailRef}
              onSubmitEditing={() => this.phoneRef.current.focus()}
              onChangeText={text => this.updateTextInput('email', text)}
            />
            <TextInput
              label="Phone"
              value={phone}
              error={errors.phone}
              returnKeyType="next"
              textInputRef={this.phoneRef}
              onSubmitEditing={() => this.bankAccountRef.current.focus()}
              onChangeText={text => this.updateTextInput('phone', text)}
            />
            <TextInput
              label="Bank account number"
              returnKeyType="next"
              error={errors.bankAccount}
              textInputRef={this.bankAccountRef}
              onSubmitEditing={() => this.ifscRef.current.focus()}
              onChangeText={text => this.updateTextInput('bankAccount', text)}
            />
            <TextInput
              label="IFSC"
              returnKeyType="next"
              textInputRef={this.ifscRef}
              error={errors.ifsc}
              onSubmitEditing={() => this.address1Ref.current.focus()}
              onChangeText={text => this.updateTextInput('ifsc', text)}
            />
            <TextInput
              label="Address line 1"
              returnKeyType="next"
              error={errors.address1}
              textInputRef={this.address1Ref}
              onSubmitEditing={() => this.address2Ref.current.focus()}
              onChangeText={text => this.updateTextInput('address1', text)}
            />
            <TextInput
              label="Address line 2"
              optional
              returnKeyType="next"
              textInputRef={this.address2Ref}
              onSubmitEditing={() => this.cityRef.current.focus()}
              onChangeText={text => this.updateTextInput('address2', text)}
            />
            <TextInput
              label="City"
              optional
              returnKeyType="next"
              textInputRef={this.cityRef}
              onSubmitEditing={() => this.stateRef.current.focus()}
              onChangeText={text => this.updateTextInput('city', text)}
            />
            <TextInput
              label="State"
              optional
              returnKeyType="next"
              textInputRef={this.stateRef}
              onSubmitEditing={() => this.pincodeRef.current.focus()}
              onChangeText={text => this.updateTextInput('state', text)}
            />
            <TextInput
              label="Pincode"
              optional
              returnKeyType="done"
              textInputRef={this.pincodeRef}
              onSubmitEditing={this.addBeneficiaryAccouont}
              onChangeText={text => this.updateTextInput('pincode', text)}
            />
          </View>
          <Button
            style={styles.loginContainer}
            titleStyle={styles.loginTitle}
            onPress={this.addBeneficiaryAccouont}
            title="SAVE"
          />

        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default connect(({ user: { profile } }) => ({
  profile,
}), {
})(AddBankAccount);
