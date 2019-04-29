import React, { Fragment, Component } from 'react';
import { View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-checkbox';
import {
  Text, NavigationBar, TextInput, Button,
} from '../../Components';
import { Colors, FontSizes } from '../../Theme';


class LoginScreen extends Component {
  static get propTypes() {
    return {
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

        <View style={{ flex: 1, paddingHorizontal: wp('4%') }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text size="h1">APP LOGO</Text>
            <Text size="h3" color="slightDark">Busniss Tagline</Text>
            <Image
              style={{
                width: wp('100%'), alignSelf: 'center',
              }}
              source={require('../../Assets/Images/child.jpeg')}
            />

            <Button

              title="Get Started"
              titleStyle={{
                  color: '#fff',
                  FontSize: '25',
                }}
              buttonWrapperStyle={{
                  width: wp('60%'),
                  backgroundColor: Colors.primary,
                  borderRadius: wp('10%') / 2,
                  alignItems: 'center',
                  overflow: 'hidden',
                }}
            />

          </View>
          <View style={{ flex: 4 }} />
        </View>
      </View>
    );
  }
}

export default LoginScreen;
