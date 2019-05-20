import React, { Component } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import {
  Text, NavigationBar, TextInput, Button,
} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  subContainer: { flex: 1, paddingHorizontal: wp('4%') },
  firstSection: { flex: 1 },
  secondSection: { flex: 4 },
  tabularButton: {
    flexDirection: 'row', borderRadius: wp('2%'), overflow: 'hidden', marginHorizontal: wp('2%'),
  },
  tabButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignSelf: 'center',
    height: hp('7%'),
  },
  submitContainer: {
    marginTop: hp('4%'),
    borderRadius: wp('2%'),
    width: wp('80%'),
    alignSelf: 'center',
    height: hp('7%'),
  },
  submitTitle: { },
});


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
      userType: 'user',
    };
  }

  tabButtonsStyle(renderedUserType) {
    const { userType } = this.state;
    const activeStyle = { backgroundColor: Colors.primary };
    const deactiveStyle = { backgroundColor: Colors.accent };
    const activeTitleStyle = { color: Colors.lightFont };
    const deactiveTitleStyle = { color: Colors.darkFont };
    switch (renderedUserType) {
      case 'user':
        return userType === 'user'
          ? { container: activeStyle, title: activeTitleStyle }
          : { container: deactiveStyle, title: deactiveTitleStyle };
      case 'ngo':
        return userType === 'ngo'
          ? { container: activeStyle, title: activeTitleStyle }
          : { container: deactiveStyle, title: deactiveTitleStyle };
      default: return {};
    }
  }

  render() {
    const { email, password, userType } = this.state;
    const { theme, navigation } = this.props;
    const activeStyle = { backgroundColor: Colors.primary };
    const deactiveStyle = { backgroundColor: Colors.accent };

    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} />

        <View style={styles.subContainer}>
          <View style={styles.firstSection}>
            <Text size="h1">Signup</Text>
            <Text size="h3" color="slightDark">Lets start from here</Text>
          </View>
          <View style={styles.secondSection}>
            <View style={styles.tabularButton}>
              <Button
                style={[styles.tabButton, this.tabButtonsStyle('user').container]}
                titleStyle={[this.tabButtonsStyle('user').title]}
                title="AS USER"
                onPress={() => this.setState({ userType: 'user' })}
              />
              <Button
                style={[styles.tabButton, this.tabButtonsStyle('ngo').container]}
                titleStyle={[this.tabButtonsStyle('ngo').title]}
                title="AS NGO"
                onPress={() => this.setState({ userType: 'ngo' })}
              />
            </View>
            <TextInput label="Email" />
            <Button
              style={styles.submitContainer}
              titleStyle={styles.submitTitle}
              title="SUBMIT"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default SignUpScreen;
