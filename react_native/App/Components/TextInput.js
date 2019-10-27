import * as React from 'react';
import { View, TextInput as RNTextInput, StyleSheet } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { flush } from 'redux-saga/effects';
import TextInputMask from 'react-native-text-input-mask';
import Button from './Button';
import Text from './Text';
import {
  Colors, ApplicationStyles, Fonts, FontSizes,
} from '../Theme';
import { Validations } from '../Utils';

class TextInput extends React.Component {
  // static validateForm(keys = ['email', 'password'],
  // [['required', 'email'], ['required', 'password', 'sameAs=confirmAddress']], state) {

  // }

  // Deprecated
  static validateForm(keys = [], state) {
    const {
      email, password, confirmPassword, userName, usernameOrEmail, name,
    } = state;
    let errors = {};

    // checking if fields are not empty
    // for custom message replace with if statement written after this function
    keys.forEach(o=>{
      if(!state[o]){
        errors = { ...errors, [o]: 'Enter a valid '+_.startCase(o) };
      }
    });

    if (keys.includes('usernameOrEmail') && !usernameOrEmail) {
      errors = { ...errors, usernameOrEmail: 'Enter a valid username or email' };
    }

    if (keys.includes('email') && !Validations.validateEmail(email)) {
      errors = { ...errors, email: 'Email must be valid' };
    }

    if (keys.includes('password') && !Validations.validatePassword(password)) {
      errors = { ...errors, password: 'Enter a valid password' };
    }

    if (password && keys.includes('confirmPassword') && !confirmPassword) {
      errors = { ...errors, confirmPassword: 'Enter a valid Confirm Password'};
    } else {
      errors = { ...errors, confirmPassword: null};
      delete errors.confirmPassword;
    }

    if (confirmPassword && keys.includes('confirmPassword') && confirmPassword !== password) {
      errors = { ...errors, confirmPassword: 'Both passwords are different' };
    }

    return Object.keys(errors).length === 0 ? false : errors;
  }

  constructor(props) {
    super(props);
    this.state = {
      showEyeIcon: props.secureTextEntry,
      secureTextEntry: false,
    };
    this.toggleSecureEntry = !this.toggleSecureEntry;
  }

  eyeButton(icon = 'ios-eye') {
    return (
      <Button style={{ position: 'absolute', right: 0, top: hp('3%') }} onClick={this.toggleSecureEntry}>
        <Icon name={icon} size={ApplicationStyles.iconSize} color={ApplicationStyles.disabledColor.color} />
      </Button>
    );
  }

  toggleSecureEntry() {
    const { secureTextEntry } = this.state;
    this.setState({ secureTextEntry: !secureTextEntry });
  }

  render() {
    const { showEyeIcon } = this.state;
    const {
      label, numberOfLines, multiline, secureTextEntry, error,
      placeholder, onChangeText, returnKeyType, textInputRef, onSubmitEditing,
      containerStyle, inputStyle,
      mask, optional,
      value, ...props
    } = this.props;
    return (
      <View style={[{ marginTop: hp('1%'), marginBottom: !error ? hp('1%') : 0 }, containerStyle]}>
        {label
        && (
        <Text style={[{ ...ApplicationStyles.textInputLabel }, { padding: 0 }]}>
          {label}
          {' '}
          { optional ? ' (optional)' : null}
        </Text>
        )}
        {mask
          ? (
            <TextInputMask
              multiline={multiline}
              numberOfLines={numberOfLines}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              onChangeText={onChangeText}
              returnKeyType={returnKeyType}
              enablesReturnKeyAutomatically
              ref={textInputRef}
              value={value || undefined}
              onSubmitEditing={onSubmitEditing}
              style={[{
                ...ApplicationStyles.textInputValue,
                paddingHorizontal: 0,
                paddingTop: hp('0.5%'),
                paddingBottom: hp('1.5%'),
                borderColor: 'transparent',
                margin: 0,
                borderBottomColor: ApplicationStyles.disabledColor.color,
                borderWidth: StyleSheet.hairlineWidth * 2,
              }, inputStyle]}
              placeholderTextColor={ApplicationStyles.disabledColor.color}
              underlineColorAndroid="transparent"
              mask={mask}
              {...props}

            />
          )

          : (
            <RNTextInput
              {...props}
              multiline={multiline}
              numberOfLines={numberOfLines}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              onChangeText={onChangeText}
              returnKeyType={returnKeyType}
              enablesReturnKeyAutomatically
              ref={textInputRef}
              value={value || undefined}
              onSubmitEditing={onSubmitEditing}
              style={[{
                ...ApplicationStyles.textInputValue,
                paddingHorizontal: 0,
                paddingTop: hp('0.5%'),
                paddingBottom: hp('1.5%'),
                borderColor: 'transparent',
                margin: 0,
                borderBottomColor: ApplicationStyles.disabledColor.color,
                borderWidth: StyleSheet.hairlineWidth ,
              }, inputStyle]}
              placeholderTextColor={ApplicationStyles.disabledColor.color}

              underlineColorAndroid="transparent"
            />
          )}
        {error && <Text style={[{ ...ApplicationStyles.textInputLabel }, { ...ApplicationStyles.warningColor }]}>{error}</Text>}
        {false && showEyeIcon && secureTextEntry && this.eyeButton('ios-eye') }
        {false && showEyeIcon && secureTextEntry && this.eyeButton('ios-eye-off') }

      </View>
    );
  }
}


TextInput.propTypes = {
  secureTextEntry: PropTypes.bool,
  label: PropTypes.string,
  numberOfLines: PropTypes.number,
  multiline: PropTypes.bool,
  returnKeyType: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChangeText: PropTypes.func,
  textInputRef: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  value: PropTypes.any,
  containerStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  mask: PropTypes.string,
  optional: PropTypes.bool,
};

TextInput.defaultProps = {
  secureTextEntry: false,
  label: null,
  numberOfLines: 1,
  multiline: false,
  value: '',
  placeholder: '',
  error: null,
  onChangeText: Function,
  returnKeyType: '',
  textInputRef: 'input',
  onSubmitEditing: Function,
  containerStyle: {},
  inputStyle: {},
  mask: null,
  optional: false,
};

export default TextInput;
