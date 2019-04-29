import React, { Component } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import {
  Text, NavigationBar, TextInput, Button,
} from '../../Components';
import { Colors, FontSizes } from '../../Theme';


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  subContainer: { flex: 1, paddingHorizontal: wp('4%') },
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
  submitTitle: { color: Colors.lightFont, textAlign: 'center', fontSize: FontSizes.h3 },

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
      password: '',
    };
  }

  render() {
    const { email, password } = this.state;
    const { theme, navigation } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} />
        <View style={styles.subContainer}>
          <View style={styles.firstSection}>
            <Text size="h1">Forgot Password?</Text>
            <Text size="h3" color="slightDark">
              { "Don't worry! just follow along" }
            </Text>
          </View>
          <View style={styles.secondSection}>
            <TextInput label="Email" />
            <Button
              style={styles.submitContainer}
              titleStyle={styles.submitTitle}
              title="SUBMIT"
            />
          </View>
        </View>
      </View>
    );
  }
}

export default ForgetPassword;