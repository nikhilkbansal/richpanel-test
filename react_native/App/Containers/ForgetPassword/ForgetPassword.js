import React, { Component } from 'react';
import {
  View, Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import {
  Text, NavigationBar, TextInput, Button,
} from '../../Components';
import { Colors, FontSizes } from '../../Theme';

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
      password: '',
    };
  }

  render() {
    const { email, password } = this.state;
    const { theme, navigation: { goBack } } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <NavigationBar />

        <View style={{ flex: 1, paddingHorizontal: wp('4%') }}>
          <View style={{ flex: 1 }}>
            <Text size="h1">Forgot Password?</Text>
            <Text size="h3" color="slightDark">Don't worry! just follow along</Text>
          </View>
          <View style={{ flex: 4 }}>
            <TextInput label="Email" />

            <Button
              style={{
                marginTop: hp('4%'),
                backgroundColor: Colors.primary,
                borderRadius: wp('2%'),
                width: wp('80%'),
                alignSelf: 'center',
                height: hp('7%'),
              }}
              titleStyle={{ color: Colors.lightFont, textAlign: 'center', fontSize: FontSizes.h3 }}
              title="SUBMIT"
            />
          </View>
        </View>
      </View>
    );
  }
}

export default ForgetPassword;
