import React, { Component } from 'react';
import {
  View, Text, Image,
} from 'react-native';
import {
  Button, HelperText, Divider, withTheme,
} from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import Container from '../../Components/Container';
import TextInput from '../../Components/TextInput';
import styles from './ForgetPasswordStyle';
import images from '../../Theme/Images';
import SmallButton from '../../Components/SmallButton';
import SpaceBar from '../../Components/SpaceBar';
import commonStyle from '../../Theme/ApplicationStyles';

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
      <Container>
        <View style={styles.logoContainer}>
          <Image source={images.logo} style={styles.logo} />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            label="Email/username"
            mode="flat"
            value={email}
            onChangeText={text => this.setState({ email: text })}
          />
          <HelperText
            type="error"
            visible={email !== null && !email.includes('@')}
          >
          Email address is invalid!
          </HelperText>
          <View style={{ flexDirection: 'row' }}>
            <Button icon="add-a-photo" color={theme.colors.primary} mode="contained" style={styles.buttonStyle} onPress={() => this.setState(state => ({ visible: !state.visible }))}>
            Forgot Password
            </Button>
          </View>
          <SpaceBar />
          <Button mode="text" onPress={() => goBack()}>
            Back
          </Button>
        </View>
      </Container>
    );
  }
}

export default withTheme(ForgetPassword);
