import * as React from 'react'
import { View, TextInput as RNTextInput, StyleSheet } from 'react-native'
import _ from 'lodash'
import PropTypes from 'prop-types'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

import { flush } from 'redux-saga/effects'
import TextInputMask from 'react-native-text-input-mask'
import Button from './Button'
import Text from './Text'
import Icon from './Icon'
import { Colors, ApplicationStyles, Fonts, FontSizes } from '../Theme'
import { Validations } from '../Utils'
import AxiosRequest from '../Services/HttpRequestService'

async function checkIfUserExists(payload) {
  try {
    const data = await AxiosRequest(
      {
        method: 'get',
        params: payload,
        url: 'users/exists',
      },
      'default',
      false
    )
    return data.isExisted
  } catch (e) {
    console.log(e)
  }
}

let errors = {}
class TextInput extends React.Component {
  // static validateForm(keys = ['email', 'password'],
  // [['required', 'email'], ['required', 'password', 'sameAs=confirmAddress']], state) {

  // }

  // Deprecated
  static validateForm(keys = [], state) {
    const { email, password, confirmPassword, userName, usernameOrEmail, name, amount } = state
    let errors = { ...errors }

    // checking if fields are not empty
    // for custom message replace with if statement written after this function
    keys.forEach((o) => {
      if (!state[o] || (Array.isArray(state[o]) && state[o].length === 0)) {
        errors = {
          ...errors,
          [o]: Array.isArray(state[o])
            ? 'Enter valid ' + _.startCase(o)
            : 'Enter a valid ' + _.startCase(o),
        }
      }
    })

    if (keys.includes('usernameOrEmail') && !usernameOrEmail) {
      errors = { ...errors, usernameOrEmail: 'Enter a valid username or email' }
    }

    if (keys.includes('email') && !Validations.validateEmail(email)) {
      errors = { ...errors, email: 'Email must be valid' }
    }

    if (
      keys.includes('amount') &&
      (!amount || isNaN(amount) || Number(amount) < 10 || Number(amount) % 1 !== 0)
    ) {
      errors = { ...errors, amount: 'Amount must be valid whole number and above ₹10' }
    }

    if (keys.includes('password') && !Validations.validatePassword(password)) {
      errors = { ...errors, password: 'Enter a valid password' }
    }

    if (password && keys.includes('confirmPassword') && !confirmPassword) {
      errors = { ...errors, confirmPassword: 'Enter a valid Confirm Password' }
    } else {
      errors = { ...errors, confirmPassword: null }
      delete errors.confirmPassword
    }

    if (confirmPassword && keys.includes('confirmPassword') && confirmPassword !== password) {
      errors = { ...errors, confirmPassword: 'Both passwords are different' }
    }

    return Object.keys(errors).length === 0 ? false : errors
  }

  constructor(props) {
    super(props)
    this.state = {
      showEyeIcon: props.secureTextEntry,
      secureTextEntry: false,
      showUniqueError: false,
    }
    this.toggleSecureEntry = !this.toggleSecureEntry
    this.onChangeText = this.onChangeText.bind(this)
  }

  eyeButton(icon = 'ios-eye') {
    return (
      <Button
        style={{ position: 'absolute', right: 0, top: hp('3%') }}
        onPress={this.toggleSecureEntry}
      >
        <Icon
          name={icon}
          size={ApplicationStyles.iconSize}
          color={ApplicationStyles.disabledColor.color}
        />
      </Button>
    )
  }

  toggleSecureEntry() {
    const { secureTextEntry } = this.state
    this.setState({ secureTextEntry: !secureTextEntry })
  }

  async checkUnique(params) {
    const isExists = await checkIfUserExists(params)
    if (isExists) {
      const key = Object.keys(params)[0]
      errors = { [params[key]]: 'Please enter valid ' + _.startCase(key) }
    }
    this.setState({ showUniqueError: isExists })
  }

  async onChangeText(value) {
    const { onChangeText, unique } = this.props

    if (unique) {
      if (value.length > 3) {
        await this.checkUnique({ [unique]: value })
        const { showUniqueError } = this.state
        onChangeText(value, showUniqueError)
      } else {
        onChangeText(value, false)
      }
    } else {
      onChangeText(value)
    }
  }

  render() {
    const { showEyeIcon, showUniqueError } = this.state
    const {
      label,
      numberOfLines,
      multiline,
      secureTextEntry,
      error,
      placeholder,
      onChangeText,
      returnKeyType,
      textInputRef,
      onSubmitEditing,
      containerStyle,
      inputStyle,
      rightIcon,
      leftIcon,
      info,
      mask,
      optional,
      unique,
      value,
      ...props
    } = this.props
    let colorCondition =
      props.editable != undefined && !props.editable
        ? { color: ApplicationStyles.disabledColor.color }
        : {}

    return (
      <View style={[{ marginTop: hp('1%'), marginBottom: !error ? hp('1%') : 0 }, containerStyle]}>
        {label && (
          <Text style={[{ ...ApplicationStyles.fontStyles.body1 }, { padding: 0 }]}>
            {label} {optional ? ' (optional)' : null}
          </Text>
        )}
        {mask ? (
          <TextInputMask
            multiline={multiline}
            numberOfLines={numberOfLines}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            onChangeText={(formatted, extracted) => {
              console.log(formatted, extracted)
              this.onChangeText(extracted)
            }}
            returnKeyType={returnKeyType}
            enablesReturnKeyAutomatically
            refInput={(ref) => textInputRef(ref)}
            value={value || undefined}
            onSubmitEditing={onSubmitEditing ? onSubmitEditing : () => {}}
            style={[
              {
                ...ApplicationStyles.fontStyles.body2,
                ...colorCondition,
                paddingHorizontal: 0,
                paddingTop: hp('0.5%'),
                paddingBottom: hp('1.5%'),
                borderColor: 'transparent',
                margin: 0,
                borderBottomColor: ApplicationStyles.disabledColor.color,
                borderWidth: StyleSheet.hairlineWidth * 2,
              },
              inputStyle,
            ]}
            placeholderTextColor={ApplicationStyles.disabledColor.color}
            underlineColorAndroid="transparent"
            mask={mask}
            {...props}
          />
        ) : (
          <RNTextInput
            {...props}
            multiline={multiline}
            numberOfLines={numberOfLines}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            onChangeText={this.onChangeText}
            returnKeyType={returnKeyType}
            enablesReturnKeyAutomatically
            ref={textInputRef}
            value={value || undefined}
            onSubmitEditing={onSubmitEditing ? onSubmitEditing : () => {}}
            style={[
              {
                ...ApplicationStyles.fontStyles.body2,
                paddingHorizontal: 0,
                paddingTop: hp('0.5%'),
                paddingBottom: hp('1.5%'),
                borderColor: 'transparent',
                margin: 0,
                ...colorCondition,
                borderBottomColor: ApplicationStyles.disabledColor.color,
                borderWidth: StyleSheet.hairlineWidth,
              },
              inputStyle,
            ]}
            placeholderTextColor={ApplicationStyles.disabledColor.color}
            underlineColorAndroid="transparent"
          />
        )}
        {info &&
          !error && (
            <Text style={[{ ...ApplicationStyles.fontStyles.caption }, { marginTop: hp('0.2%') }]}>
              {info}
            </Text>
          )}
        {error && (
          <Text
            style={[
              { ...ApplicationStyles.fontStyles.caption },
              { ...ApplicationStyles.warningColor, marginTop: hp('0.2%') },
            ]}
          >
            {error}
          </Text>
        )}
        {showUniqueError && (
          <Text
            style={[
              { ...ApplicationStyles.fontStyles.caption },
              { ...ApplicationStyles.warningColor, marginTop: hp('0.2%') },
            ]}
          >{`${unique.toLowerCase()} is already exists`}</Text>
        )}
        {false && showEyeIcon && secureTextEntry && this.eyeButton('ios-eye')}
        {false && showEyeIcon && secureTextEntry && this.eyeButton('ios-eye-off')}
        {leftIcon &&
          leftIcon.name && (
            <Button
              style={{ position: 'absolute', left: wp('6%'), top: hp('1%') }}
              onPress={leftIcon.onPress}
            >
              <Icon
                name={leftIcon.name}
                iconFamily={leftIcon.family}
                size={leftIcon.size || ApplicationStyles.iconSize}
                color={ApplicationStyles.disabledColor.color}
              />
            </Button>
          )}
        {rightIcon &&
          rightIcon.name && (
            <Button
              style={{ position: 'absolute', right: wp('5%'), top: hp('1%') }}
              onPress={rightIcon.onPress}
            >
              <Icon
                name={rightIcon.name}
                iconFamily={rightIcon.family}
                size={rightIcon.size || ApplicationStyles.iconSize}
                color={ApplicationStyles.disabledColor.color}
              />
            </Button>
          )}
      </View>
    )
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
  rightIcon: PropTypes.object,
  leftIcon: PropTypes.object,
}

TextInput.defaultProps = {
  secureTextEntry: false,
  label: null,
  numberOfLines: 1,
  multiline: false,
  value: '',
  placeholder: '',
  error: null,
  onChangeText: () => {},
  returnKeyType: '',
  textInputRef: () => {},
  onSubmitEditing: () => {},
  containerStyle: {},
  rightIcon: {},
  leftIcon: {},
  inputStyle: {},
  mask: null,
  optional: false,
}

export default TextInput
