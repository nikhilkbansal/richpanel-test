import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, ScrollView, Platform,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import UserActions from 'App/Stores/User/Actions';
import { connect } from 'react-redux';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text, NavigationBar, TextInput, Button, ProgressiveImage,
} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';
import { CommonFunctions } from '../../Utils';
import UploadFiles from '../../Services/UploadFilesService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const options = {
  title: 'Select Profile Pic',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ApplicationStyles.lightBackground.color },
  subContainer: { flex: 1, paddingHorizontal: wp('5%') },
  loginContainer: {
    marginVertical: hp('4%'),
    backgroundColor: ApplicationStyles.primaryColor.color,
    borderRadius: wp('2%'),
    width: wp('80%'),
    alignSelf: 'center',
    height: hp('7%'),
  },
  loginTitle: { color: ApplicationStyles.lightColor.color, textAlign: 'center', fontSize: FontSizes.h3 },
  imageItemContainer: { marginHorizontal: wp('1%') },
  imageButton: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('20%') / 2,
    overflow: 'hidden',
    borderColor: ApplicationStyles.primaryColor.color,
    justifyContent: 'center',
    marginVertical: wp('2%'),
  },
});

class OrgInfo extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    const { profile } = this.props;
    console.log(profile);
    this.state = {
      errors: {},
      selectedProfilePic: {},
      picture: null,
      founded: "",
      publicPhone: "",
      publicEmail: "",
      website: "",
      causeSupported: "",
      about: "",
      ...profile,
      ...profile.poInfo
    };
    this.updateProfile = this.updateProfile.bind(this);
    this.updateTextInput = this.updateTextInput.bind(this);
    this.foundedRef = React.createRef();
    this.publicEmailRef = React.createRef();
    this.publicPhoneRef = React.createRef();
    this.websiteRef = React.createRef();
    this.causeSupportedRef = React.createRef();
    this.aboutRef = React.createRef();
  }

  updateTextInput(key, value) {
    this.setState({ [key]: value });
  }

  async updateProfile() {
    const { updateUserInit, profile } = this.props;
    const {
      founded, publicPhone, publicEmail, website, causeSupported, about
    } = this.state;
    const validateForm = TextInput.validateForm(['founded', 'publicPhone', 'publicEmail', 'causeSupported', 'about'], this.state);
    if (validateForm) {
      this.setState({ errors: validateForm });
      return false;
    }

    updateUserInit({
      poInfo: {...profile.poInfo, founded, publicPhone, publicEmail, website, causeSupported, about} 
    });
  }


  render() {
    const { navigation, profile} = this.props;
    console.log('CommonFunctions.getFile(profile.picture, true)', CommonFunctions.getFile(profile.picture, true));
    const {
      errors, founded, publicPhone, publicEmail, website, causeSupported, about
    } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} title="Organization Info"  />
        <KeyboardAwareScrollView style={styles.subContainer}>
          <TextInput
            error={errors.founded}
            label="Founded"
            returnKeyType="next"
            value={founded}
            mask="[0000]"
            keyboardType={'number-pad'}
            placeholder="e.g. 1995"
            onChangeText={text => this.updateTextInput('founded', text)}
            onSubmitEditing={() => this.publicEmailRef.current.focus()}
          />
          <TextInput
            error={errors.publicEmail}
            label="Public email"
            returnKeyType="next"
            value={publicEmail}
            keyboardType='email-address'
            placeholder=""
            textInputRef={this.publicEmailRef}
            onChangeText={text => this.updateTextInput('publicEmail', text)}
            onSubmitEditing={() => this.publicPhoneRef.current.focus()}
          />
          <TextInput
            error={errors.publicPhone}
            label="Public phone number (with country code)"
            returnKeyType="next"
            value={publicPhone}
            keyboardType='phone-pad'
            placeholder="e.g. +9111111111"
            textInputRef={this.publicPhoneRef}
            onChangeText={text => this.updateTextInput('publicPhone', text)}
            onSubmitEditing={() => this.websiteRef.current.focus()}
          />
          <TextInput
            label="Website"
            optional
            placeholder='e.g. www.example.com'
            returnKeyType="next"
            value={website}
            textInputRef={this.websiteRef}
            onChangeText={text => this.updateTextInput('website', text)}
            onSubmitEditing={() => this.causeSupportedRef.current.focus()}
          /> 
          <TextInput
            error={errors.causeSupported}
            label="Cause supported (comma separated)"
            returnKeyType="next"
            multiline
            value={causeSupported}
            numberOfLines={2}
            placeholder="e.g. Child education, woman empowerment"
            textInputRef={this.causeSupportedRef}
            onChangeText={text => this.updateTextInput('causeSupported', text)}
            onSubmitEditing={() => this.aboutRef.current.focus()}
          />
          <TextInput
            error={errors.about}
            label="About" 
            multiline
            value={about}
            inputStyle={ApplicationStyles.body}
            numberOfLines={3}
            textInputRef={this.aboutRef}
            returnKeyType="done"
            placeholder="Sumary about organization's work, goal or other important aspects"
            onChangeText={text => this.updateTextInput('about', text)}
            onSubmitEditing={() => this.updateProfile()}
          />
          <Button
            style={styles.loginContainer}
            onPress={() => this.updateProfile()}
            title="UPDATE"
          />

        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default connect(
  ({ user: { profile } }) => ({ profile }), {
    updateUserInit: UserActions.updateUserInit
  },
)(OrgInfo);
