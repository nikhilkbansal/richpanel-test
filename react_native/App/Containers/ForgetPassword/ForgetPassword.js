import React, { Component } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import {
  Text, NavigationBar, TextInput, Button,
} from '../../Components';
import { Colors, ApplicationStyles } from '../../Theme';
import UserActions from '../../Stores/User/Actions';


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  subContainer: { flex: 1, paddingHorizontal: wp('7%') },
  firstSection: { flex: 1 },
  secondSection: { flex: 4 },
  submitContainer: {
    marginTop: hp('4%'),
    backgroundColor: Colors.primary,
    borderRadius: wp('2%'),
    width: wp('80%'),
    alignSelf: 'center',
    height: hp('7%'),
  },
  submitTitle: {
  },

});

class ForgetPassword extends Component {
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
      errors: {},
    };
    this.forgotPassInit = this.forgotPassInit.bind(this);
    TextInput.validateForm = TextInput.validateForm.bind(this);
    TextInput.updateTextInput = TextInput.updateTextInput.bind(this);
  }

  forgotPassInit() {
    const { forgotPasswordInit } = this.props;
    const { email } = this.state;
    if (!TextInput.validateForm(['email'])) return false;

    forgotPasswordInit({ email });
  }

  render() {
    const { errors } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} />
        <View style={styles.subContainer}>
          <View style={styles.firstSection}>
            <Text style={ApplicationStyles.headline}>Forgot Password?</Text>
            <Text style={ApplicationStyles.subHeadline}>Don't worry! just follow along</Text>
          </View>
          <View style={styles.secondSection}>
            <TextInput
              error={errors.email}
              label="Email"
              returnKeyType="done"
              onChangeText={text => TextInput.updateTextInput('email', text)}
              onSubmitEditing={this.forgotPassInit}
            />
            <Button
              style={styles.submitContainer}
              titleStyle={styles.submitTitle}
              onPress={this.forgotPassInit}
              title="SUBMIT"
            />
          </View>
        </View>
      </View>
    );
  }
}

export default connect(null, {
  forgotPasswordInit: UserActions.forgotPasswordInit,
})(ForgetPassword);
