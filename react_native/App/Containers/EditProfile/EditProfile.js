import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, ScrollView, Platform,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import UserActions from 'App/Stores/User/Actions';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text, NavigationBar, TextInput, Button, ProgressiveImage,
} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';
import { CommonFunctions } from '../../Utils';

const options = {
  title: 'Select Profile Pic',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  subContainer: { flex: 1, paddingHorizontal: wp('5%') },
  loginContainer: {
    marginVertical: hp('4%'),
    backgroundColor: Colors.primary,
    borderRadius: wp('2%'),
    width: wp('80%'),
    alignSelf: 'center',
    height: hp('7%'),
  },
  loginTitle: { color: Colors.lightFont, textAlign: 'center', fontSize: FontSizes.h3 },
  imageItemContainer: { marginHorizontal: wp('1%') },
  imageButton: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('2.1%'),
    overflow: 'hidden',
    borderColor: Colors.primary,
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


  selectImage(item) {
    const { uploadProfilePic } = this.props;
    if (item.empty) {
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          uploadProfilePic({ file: response, body: { fileType: 'image' } });
        }
      });
    } else {
      this.setState({ picture: item });
    }
  }

  imageItem(item) {
    const { picture } = this.state;
    return (
      <View style={styles.imageItemContainer}>
        <Button
          onPress={() => this.selectImage(item)}
          style={[styles.imageButton, { borderWidth: item.empty ? 1 : 0 }]}
        >
          {!item.empty && item === picture ? (
            <Icon
              style={{
                position: 'absolute',
                elevation: 3,
                alignSelf: 'center',
              }}
              name="md-checkmark"
              color={Colors.primary}
              size={30}
            />) : null}

          {!item.empty ? (
            <ProgressiveImage
              resizeMode="cover"
              style={{
                elevation: 1,
                width: wp('22%'),
                height: wp('22%'),
              }}
              source={{ uri: CommonFunctions.getFile(item) }}
            />
          )
            : (
              <Icon
                style={{
                  borderColor: Colors.background,
                  borderRadius: wp('5%') / 2,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}
                name="md-add"
                color={Colors.primary}
                size={30}
              />

            )}


        </Button>
        {!item.empty && (
        <Button
          style={{
            backgroundColor: 'red',
            width: wp('5%'),
            height: wp('5%'),
            borderColor: Colors.background,
            borderRadius: wp('5%') / 2,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
            position: 'absolute',
            top: 0,
            padding: wp('1%'),
            right: -wp('1%'),
          }}
          onPress={() => navigation.navigate('HomePage')}
          icon="md-remove"
          iconColor={Colors.lightFont}
          iconSize={23}
        />
        )
    }
      </View>
    );
  }

  updateTextInput(key, value) {
    this.setState({ [key]: value });
  }

  updateProfile() {
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

    updateUserInit({
      email, ...isPasswordGivenObject, userName, name, picture,
    });
  }


  render() {
    const { navigation, profile } = this.props;
    const {
      errors, name, email, userName,
    } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} title="Edit Profile" containerStyle={{ paddingHorizontal: wp('2%') }} />
        <ScrollView style={styles.subContainer}>
          <FlatList
            data={[{ empty: true }, ...profile.pictures]}
            style={{ flex: 1 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.imageItem(item)}
            horizontal
          />

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
            label="Password"
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
