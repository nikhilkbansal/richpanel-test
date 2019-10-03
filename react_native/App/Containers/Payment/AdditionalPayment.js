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
    marginTop: hp('5%'),
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


class AdditionalPayment extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      isCardSave: false,
      isRememberVpa: false,
      isCardsRequested: !!params.cards,
    };
    this.updateTextInput = this.updateTextInput.bind(this);
    this.passwordRef = React.createRef();
    this.continue = this.continue.bind(this);
  }

  updateTextInput(key, value) {
    this.setState({ [key]: value });
  }

  continue() {
    const { navigation: { navigate, state } } = this.props;
    const {
      isCardsRequested, vpa, cardHolderName, cardNumber, expiry, cvc, isCardSave,
    } = this.state;
    let seamlessParams = {};
    if (isCardsRequested) {
      seamlessParams = {
        paymentOption: 'card',
        card_number: cardNumber,
        card_holder: cardHolderName,
        card_cvv: cvc,
        card_expiryMonth: expiry.slice(0, 2),
        card_expiryYear: `20${expiry.slice(2, 4)}`,
        card_save: isCardSave ? 1 : 0,
      };
    } else {
      seamlessParams = {
        paymentOption: 'upi',
        upi_vpa: vpa,
      };
    }
    navigate('Payment', {
      paymentMeta: state.params.paymentMeta,
      seamlessParams: {
        orderAmount: state.params.orderAmount,
        ...seamlessParams,
      },
    });
  }


  render() {
    console.log('this.props', this.props);
    const { navigation } = this.props;
    const {
      errors, isCardSave, isRememberVpa, password, isCardsRequested,
    } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} statusBarColor={ApplicationStyles.primaryColor.color} title={isCardsRequested ? 'Add Card' : 'Enter VPA'} />

        <KeyboardAwareScrollView style={styles.subContainer}>
          {
          isCardsRequested
            ? (
              <View style={styles.secondSection}>
                <TextInput
                  label="Card holder's name"
                  returnKeyType="next"
                  onChangeText={text => this.updateTextInput('cardHolderName', text)}
                  onSubmitEditing={() => this.passwordRef.current.focus()}
                />
                <TextInput
                  label="Card number"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  mask="[0000] [0000] [0000] [0000]"
                  returnKeyType="next"
                  onChangeText={(formatted, extracted) => this.updateTextInput('cardNumber', extracted)}
                  onSubmitEditing={() => this.passwordRef.current.focus()}
                />
                <TextInput
                  label="Expiry Date"
                  placeholder="MM/YY"
                  mask="[00]/[00]"
                  returnKeyType="next"
                  onChangeText={(formatted, extracted) => this.updateTextInput('expiry', extracted)}
                  onSubmitEditing={() => this.passwordRef.current.focus()}
                />
                <TextInput
                  label="CVV/CVC"
                  textInputRef={this.passwordRef}
                  placeholder="XXX"
                  returnKeyType="done"
                  maxLength={3}
                  secureTextEntry
                  onChangeText={text => this.updateTextInput('cvc', text)}
                />
                <View style={styles.remeberPassContainer}>
                  <CheckBox
                    style={{ flex: 1 }}
                    onClick={() => {
                      this.setState({
                        isCardSave: !isCardSave,
                      });
                    }}
                    isChecked={isCardSave}
                    rightText="Save this card for future payments"
                    rightTextStyle={{ ...ApplicationStyles.body, textAlign: 'left' }}
                    checkBoxColor={ApplicationStyles.primaryColor.color}
                    uncheckedCheckBoxColor={ApplicationStyles.disabledColor.color}
                  />
                </View>
              </View>
            )

            : (
              <View style={styles.secondSection}>
                <TextInput
                  label="Enter VPA"
                  placeholder="username@upi"
                  returnKeyType="done"
                  onChangeText={text => this.updateTextInput('vpa', text)}
                />
                <View style={styles.remeberPassContainer}>
                  <CheckBox
                    style={{ flex: 1 }}
                    onClick={() => {
                      this.setState({
                        isRememberVpa: !isRememberVpa,
                      });
                    }}
                    isChecked={isRememberVpa}
                    rightText="Save my VPA for future payments"
                    rightTextStyle={{ ...ApplicationStyles.body, textAlign: 'left' }}
                    checkBoxColor={ApplicationStyles.primaryColor.color}
                    uncheckedCheckBoxColor={ApplicationStyles.disabledColor.color}
                  />
                </View>
              </View>
            )

        }

          <Button
            style={styles.loginContainer}
            titleStyle={styles.loginTitle}
            onPress={this.continue}
            title="CONTINUE"
          />

        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default connect(
  ({ user }) => ({ user }), {
  },
)(AdditionalPayment);
