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
      email: null,
      password: '',
      isNgo: false,
    };
  }

  render() {
    const { email, password, isNgo } = this.state;
    const { theme, navigation: { goBack } } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <NavigationBar />

        <View style={{ flex: 1, paddingHorizontal: wp('4%') }}>
          <View style={{ flex: 1 }}>
            <Text size="h1">Signup</Text>
            <Text size="h3" color="slightDark">Lets start from here</Text>
          </View>
          <View style={{ flex: 4 }}>
            <View style={{
              flexDirection: 'row', borderRadius: wp('2%'), overflow: 'hidden', marginHorizontal: wp('2%'),
            }}
            >
              <Button
                style={{
                  backgroundColor: Colors.accent,
                  alignSelf: 'center',
                  height: hp('7%'),
                  flex: 1,
                }}
                titleStyle={{ color: Colors.lightFont, textAlign: 'center', fontSize: FontSizes.h3 }}
                title="User"
              />
              <Button
                style={{
                  flex: 1,

                  backgroundColor: Colors.primary,
                  alignSelf: 'center',
                  height: hp('7%'),
                }}
                titleStyle={{ color: Colors.lightFont, textAlign: 'center', fontSize: FontSizes.h3 }}
                title="NGO"
              />
            </View>
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

export default SignUpScreen;
