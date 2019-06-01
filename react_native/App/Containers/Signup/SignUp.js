import React, { Component } from 'react';
import {
  View, StyleSheet, ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Text, NavigationBar, TextInput, Button,
} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';
import UserActions from '../../Stores/User/Actions';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  subContainer: { flex: 1, paddingHorizontal: wp('7%') },
  firstSection: { flex: 1 },
  secondSection: { flex: 4 },
  tabularButton: {
    marginVertical: hp('4%'), flexDirection: 'row', borderRadius: wp('2%'), overflow: 'hidden', marginHorizontal: wp('2%'),
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
      errors: {},
    };
    TextInput.validateForm = TextInput.validateForm.bind(this);
    TextInput.updateTextInput = TextInput.updateTextInput.bind(this);
    this.passwordRef = React.createRef();
  }

  tabButtonsStyle(renderedUserType) {
    const { userType } = this.state;
    const activeStyle = { backgroundColor: ApplicationStyles.primaryColor.color };
    const deactiveStyle = { backgroundColor: '#F2F2F2' };
    const activeTitleStyle = { color: ApplicationStyles.lightColor.color };
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


  reegisterInit() {
    const { registerInit } = this.props;
    const { email, password } = this.state;
    if (!TextInput.validateForm(['password'])) return false;

    registerInit({ email, password });
  }


  render() {
    const {
      email, password, userType, errors,
    } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} />

        <ScrollView style={styles.subContainer}>
          <View style={styles.firstSection}>
            <Text style={ApplicationStyles.headline}>Signup</Text>
            <Text style={ApplicationStyles.subHeadline}>Let's take first step</Text>
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
            <TextInput
              error={errors.email}
              label="Email"
              returnKeyType="next"
              onChangeText={text => TextInput.updateTextInput('email', text)}
              onSubmitEditing={() => this.passwordRef.current.focus()}
            />
            <TextInput
              error={errors.email}
              label="Username"
              returnKeyType="next"
              onChangeText={text => TextInput.updateTextInput('email', text)}
              onSubmitEditing={() => this.passwordRef.current.focus()}
            />
            <TextInput
              error={errors.email}
              label="Password"
              returnKeyType="next"
              onChangeText={text => TextInput.updateTextInput('email', text)}
              onSubmitEditing={() => this.passwordRef.current.focus()}
            />
            <TextInput
              error={errors.email}
              label="Username or Email"
              returnKeyType="next"
              onChangeText={text => TextInput.updateTextInput('email', text)}
              onSubmitEditing={() => this.passwordRef.current.focus()}
            />
            <Button
              style={styles.submitContainer}
              titleStyle={styles.submitTitle}
              title="SUBMIT"
              onPress={() => navigation.goBack()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(null, {
  registerInit: UserActions.registerInit,
})(SignUpScreen);
