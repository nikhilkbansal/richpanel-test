import React, { Fragment, Component } from 'react';
import { View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-checkbox';
import {
 Text, NavigationBar, TextInput, Button 
} from '../../Components';
import { Colors, FontSizes } from '../../Theme';


class LoginScreen extends Component {
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
      checked: false,
    };
  }

  render() {
    const { navigation: { navigate } } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <NavigationBar />

        <View style={{ flex: 1, paddingHorizontal: wp('4%') }}>
          <View style={{ flex: 1 }}>
            <Text size="h1">Login</Text>
            <Text size="h3" color="slightDark">Get started with your journey</Text>
          </View>
          <View style={{ flex: 4 }}>
            <TextInput label="Email" />
            <TextInput label="Password" secureTextEntry />
            <View style={{
              marginVertical: hp('1%'),
              width: wp('92%'),
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'space-between',
            }}
            >

              <Text style={{ justifyContent: 'flex-start' }} color="mediumDark" size="h3">Remember Password </Text>
              <Button
                style={{ alignSelf: 'center' }}
                titleStyle={{ color: Colors.mediumDarkFont, textAlign: 'center', fontSize: FontSizes.h3 }}
                title="Forget Password"
              />
            </View>
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
              title="CONTINUE TO LOGIN"
            />
            <View style={{
              width: wp('80%'), marginVertical: hp('2%'), flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center',
            }}
            >
              <Text color="mediumDark" size="h3">Don't have an account? </Text>
              <Button
                style={{ alignSelf: 'center' }}
                titleStyle={{ color: Colors.primary, textAlign: 'center', fontSize: FontSizes.h3 }}
                title="Sign Up"
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default LoginScreen;
