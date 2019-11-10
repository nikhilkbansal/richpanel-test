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
  Text, NavigationBar, TextInput, Button, ProgressiveImage, AvatarImage
} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';
import { CommonFunctions } from '../../Utils';
import UploadFiles from '../../Services/UploadFilesService';

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

class EditProfile extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    const { profile } = this.props;
    this.state = {
      errors: {},
      selectedProfilePic: {},
      picture: null,
      ...profile,
    };
    this.updateProfile = this.updateProfile.bind(this);
    this.updateTextInput = this.updateTextInput.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.confirmPasswordRef = React.createRef();
    this.userNameRef = React.createRef();
  }


  selectImage() {
    ImagePicker.openPicker({
      // cropping: true,
    }).then((images) => {
      this.setState({ picture: images });
    });
  }


  updateTextInput(key, value) {
    this.setState({ [key]: value });
  }

  async updateProfile() {
    const { updateUserInit } = this.props;
    const {
      email, password, userName, name, picture,
    } = this.state;
    const isPasswordGivenArray = password ? ['password'] : [];
    const validateForm = TextInput.validateForm(['name', ...isPasswordGivenArray, 'confirmPassword', 'email', 'userName'], this.state);
    if (validateForm) {
      this.setState({ errors: validateForm });
      return false;
    }
    
    const isPasswordGivenObject = password ? { password } : {};
    console.log('isPasswordGivenArray',isPasswordGivenArray)

    let pictureCondition;
    if (picture) {
      const filesUploaded = await UploadFiles([picture], { fileType: 'image' });
      const filesIds = filesUploaded.map(o => o._id);
      pictureCondition = { picture: filesIds[0] };
    }
    console.log('pictureCondition',pictureCondition)

    updateUserInit({
      email, ...isPasswordGivenObject, userName, name, ...pictureCondition,
    });
  }


  render() {
    const { navigation, profile } = this.props;
    console.log('CommonFunctions.getFile(profile.picture, true)', CommonFunctions.getFile(profile.picture, true));
    const {
      errors, name, email, userName, picture,
    } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} title="Edit Profile"  />
        <ScrollView style={styles.subContainer}>
          <View style={{
            flex: 1, alignItems: 'center', alignContent: 'center', justifyContent: 'center',
          }}
          >
            <Button
              onPress={() => this.selectImage()}
              style={[styles.imageButton, { justifyContent: 'center', alignContent: 'center', alignItems: 'center' }]}
            >
              <AvatarImage
              size={wp('20%')}
              source={{ uri: picture && picture.path ? picture.path : CommonFunctions.getFile(profile.picture, 'avatar', true) }}
              />
              {/* <ProgressiveImage
                resizeMode="cover"
                style={{
                  ...ApplicationStyles.elevationS,
                  width: wp('22%'),
                  height: wp('22%'),
                }}
                source={{ uri: picture && picture.path ? picture.path : CommonFunctions.getFile(profile.picture, 'avatar', true) }}
              /> */}
              <Icon
                name="md-create"
                size={ApplicationStyles.iconSize}
                color={ApplicationStyles.darkColor.color}
                style={{
                  position: 'absolute',
                  top: hp('6.5%'),
                  left: 0,
                  backgroundColor: ApplicationStyles. smokeBackground.color,
                  opacity: 0.7,
                  bottom: 0,
                  right: 0,
                  alignSelf: 'center',
                  textAlign: 'center',
                }}
              />
            </Button>
          </View>


          <TextInput
            error={errors.fullName}
            label="Full Name"
            value={name}
            returnKeyType="next"
            onChangeText={text => this.updateTextInput('name', text)}
            onSubmitEditing={() => this.emailRef.current.focus()}
          />

          <TextInput
            error={errors.email}
            label="Email"
            returnKeyType="next"
            value={email}
            textInputRef={this.emailRef}
            onChangeText={text => this.updateTextInput('email', text)}
            onSubmitEditing={() => this.userNameRef.current.focus()}
          />
          <TextInput
            error={errors.userName}
            label="Username"
            value={userName}
            returnKeyType="next"
            textInputRef={this.userNameRef}
            onChangeText={text => this.updateTextInput('userName', text)}
            onSubmitEditing={() => this.passwordRef.current.focus()}
          />

          <TextInput
            error={errors.password}
            label="New Password"
            returnKeyType="next"
            placeholder="Only enter if you want to change; 6 to 18 chars"
            textInputRef={this.passwordRef}
            secureTextEntry
            onChangeText={text => this.updateTextInput('password', text)}
            onSubmitEditing={() => this.confirmPasswordRef.current.focus()}
          />
          <TextInput
            error={errors.confirmPassword}
            label="Confirm Password"
            returnKeyType="done"
            secureTextEntry
            textInputRef={this.confirmPasswordRef}
            onChangeText={text => this.updateTextInput('confirmPassword', text)}
            onSubmitEditing={this.updateProfile}
          />

          <Button
            style={styles.loginContainer}
            onPress={() => this.updateProfile()}
            title="UPDATE"
          />

        </ScrollView>
      </View>
    );
  }
}

export default connect(
  ({ user: { profile } }) => ({ profile }), {
    updateUserInit: UserActions.updateUserInit,
    uploadProfilePic: UserActions.uploadProfilePic,
  },
)(EditProfile);
