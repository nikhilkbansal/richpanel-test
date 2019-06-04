import * as React from 'react';
import { View, TextInput as RNTextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { flush } from 'redux-saga/effects';
import Button from './Button';
import Text from './Text';
import {
  Colors, ApplicationStyles, Fonts, FontSizes, FontStyles,
} from '../Theme';
import { Validations } from '../Utils';

class TextInput extends React.Component {
  static validateForm(keys = [], state) {
    const {
      email, password, confirmPassword, username, usernameOrEmail,
    } = state;
    let errors = {};

    if (keys.includes('usernameOrEmail') && !usernameOrEmail) {
      errors = { ...errors, usernameOrEmail: 'Enter a valid username or email' };
    }

    if (keys.includes('username') && !username) {
      errors = { ...errors, username: 'Enter a valid username' };
    }

    if (keys.includes('email') && !Validations.validateEmail(email)) {
      errors = { ...errors, email: 'Email must be valid' };
    }

    if (keys.includes('password') && !Validations.validatePassword(password)) {
      errors = { ...errors, password: 'Enter a valid password' };
    }

    if (keys.includes('confirmPassword') && confirmPassword !== password) {
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
        <Icon name={icon} size={ApplicationStyles.iconSize} color={Colors.mediumDarkFont} />
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
      value,
    } = this.props;
    return (
      <View style={{ marginTop: hp('1%'), marginBottom: !error ? hp('1%') : 0 }}>
        <Text style={[{ ...ApplicationStyles.textInputLabel }, { padding: 0 }]}>{label}</Text>
        <RNTextInput
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
          style={{
            ...ApplicationStyles.textInputValue,
            paddingHorizontal: 0,
            paddingTop: hp('0.5%'),
            paddingBottom: hp('1.5%'),
            borderColor: 'transparent',
            margin: 0,
            borderBottomColor: Colors.mediumDarkFont,
            borderWidth: StyleSheet.hairlineWidth * 2,
          }}
          underlineColorAndroid="transparent"
        />
        {error && <Text style={[{ ...ApplicationStyles.textInputLabel }, { ...ApplicationStyles.warningColor }]}>{error}</Text>}

        {false && showEyeIcon && secureTextEntry && this.eyeButton('ios-eye') }
        {false && showEyeIcon && secureTextEntry && this.eyeButton('ios-eye-off') }

      </View>
    );
  }
}

// const TextInput = ({ secureTextEntry, label }) => (
//   <View style={{ marginVertical: hp('2%') }}>
//     <Text size="h3" color="mediumDark">{label}</Text>
//     <RNTextInput
//       secureTextEntry={secureTextEntry}
//       style={{ paddingHorizontal: 0, margin: 0 }}
//       underlineColorAndroid={Colors.primary}
//     />
//     {secureTextEntry && <Icon style={{ position: 'absolute', right: 0, top: hp('3%') }} name="ios-eye" size={ApplicationStyles.iconSize} color={Colors.mediumDarkFont} />}

//   </View>
// );

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
};

TextInput.defaultProps = {
  secureTextEntry: false,
  label: '',
  numberOfLines: 1,
  multiline: false,
  value: '',
  placeholder: '',
  error: null,
  onChangeText: Function,
  returnKeyType: '',
  textInputRef: 'input',
  onSubmitEditing: Function,
};

export default TextInput;
