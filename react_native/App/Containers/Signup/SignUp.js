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
import styles from './SignUpStyle';
import images from '../../Theme/Images';
import SmallButton from '../../Components/SmallButton';
import SpaceBar from '../../Components/SpaceBar';
import IsNgo from '../../Components/IsNgo';

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
      <Container>
        <View style={styles.logoContainer}>
          <Image source={images.logo} style={styles.logo} />
        </View>
        <View style={styles.subContainer}>
          <IsNgo onPress={() => this.setState({ isNgo: !isNgo })} checked={isNgo} />
          <SpaceBar />
          <Button color="#3b5998" icon="add-a-photo" mode="contained" onPress={() => this.setState(state => ({ visible: !state.visible }))}>
            Signup with facebook
          </Button>
          <SpaceBar />
          <Divider />
          <TextInput
            label="Email/username"
            mode="flat"
            value={email}
            onChangeText={text => this.setState({ email: text })}
          />
          <TextInput
            label="Password"
            mode="flat"
            value={password}
            onChangeText={text => this.setState({ password: text })}
          />
          <TextInput
            label="Email/username"
            mode="flat"
            value={email}
            onChangeText={text => this.setState({ email: text })}
          />
          <TextInput
            label="Email/username"
            mode="flat"
            value={email}
            onChangeText={text => this.setState({ email: text })}
          />
          <TextInput
            label="Email/username"
            mode="flat"
            value={email}
            onChangeText={text => this.setState({ email: text })}
          />
          <TextInput
            label="Email/username"
            mode="flat"
            value={email}
            onChangeText={text => this.setState({ email: text })}
          />
          <SpaceBar />
          <View style={{ flexDirection: 'row' }}>

            <Button icon="add-a-photo" mode="outlined" color={theme.colors.primary} style={styles.buttonStyle} onPress={() => goBack()}>
            Login
            </Button>
            <Button icon="add-a-photo" style={styles.buttonStyle} mode="contained">
            Signup
            </Button>
          </View>
          <SpaceBar />
          <SpaceBar />
          <SmallButton title="You are a ngo?" />
        </View>
      </Container>
    );
  }
}

export default withTheme(SignUpScreen);
