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
  Text, NavigationBar, TextInput, Button, ProgressiveImage,FileSelector, Swiper
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
  sectionContainer: {
    ...ApplicationStyles.elevationS,
    flex: 1,
    borderRadius: wp('2%'),
    overflow: 'hidden',
    marginTop: hp('3%'),
    paddingBottom: hp('1%'),
    backgroundColor: ApplicationStyles.lightBackground.color,
  },
});

class PoSlider extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    const { profile } = this.props;
    const files = profile.poInfo.carousel.map(o=>({ fileId:o, path: CommonFunctions.getFile(o)}));

    this.state = {
      errors: {}, 
      picture: null,
      files: files || [],
      ...profile,
    };
    this.updateProfile = this.updateProfile.bind(this);
    this.updateTextInput = this.updateTextInput.bind(this);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.confirmPasswordRef = React.createRef();
    this.userNameRef = React.createRef();
  }



  updateTextInput(key, value) {
    this.setState({ [key]: value });
  }

  async updateProfile() {
    const { updateUserInit, profile } = this.props;
    const {
      files
    } = this.state;
    
    let newFilesIndex = [];
    let newFiles = [];
    files.forEach((o,index)=>{
      if(!o.fileId){
        newFiles.push(o);
        newFilesIndex.push(index);
      }
    });
    let filesIds = [];
    if (newFiles.length > 0) {
      const filesUploaded = await UploadFiles(newFiles, { fileType: 'image' });
      newFilesIndex.forEach((o, index)=>{
        files[o] = { fileId:  filesUploaded[index]._id}
      });
      filesIds = files.map(o =>o.fileId);

    } else if(files.length === 0) {
      this.setState({ error: { files : 'Please choose atleast one image'}});
    }

    updateUserInit({
      poInfo: { ...profile.poInfo, carousel: filesIds }
    });
  }


  render() {
    const { navigation, profile } = this.props;
    console.log('CommonFunctions.getFile(profile.picture, true)', CommonFunctions.getFile(profile.picture, true));
    const {
      errors, files
    } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} title="Carousel"  />
        <ScrollView style={styles.subContainer}>
        <View style={styles.sectionContainer}>
            <Swiper isWholePath files={files.map(o=>o.path)} />
            <Text style={{textAlign: 'center', paddingTop: hp('0.5%')}}>Carousel preview</Text>
            </View>
            <FileSelector files={files} error={errors.files} label="Add images and videos (drag and drop to change order)" onChange={files => this.updateTextInput('files', files)} />
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
    updateUserInit: UserActions.updateUserInit
  },
)(PoSlider);
