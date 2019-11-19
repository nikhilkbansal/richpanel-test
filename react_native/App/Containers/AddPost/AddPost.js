import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView, horizontal,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import PostActions from 'App/Stores/Post/Actions';
import UploadFiles from '../../Services/UploadFilesService';
import {
  Text, NavigationBar, TextInput, Button, HrLine, DatePicker, LocationSelector, FileSelector,
} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';
import CheckBox from 'react-native-check-box';

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
});

class AddPost extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      title: '',
      description: '',
      files: [],
      isCampaign: false
    };
    this.addPost = this.addPost.bind(this);
    this.resetCampaign = this.resetCampaign.bind(this);
    this.descriptionRef = React.createRef();
    this.campaignGoalRef = React.createRef();
  }

  resetCampaign(isNotCampaign){
    if(isNotCampaign)
    this.setState({ title: '', campaignGoal:'', campaignEndDate:  null, campaignStartDate:null, })
  }

  async addPost() {
    const {
      errors,
      title,
      description,
      files,
      isCampaign,
      campaignGoal,
      campaignStartDate,
      campaignEndDate,
    } = this.state;
    const { postCreate } = this.props;

    let keysToValidate = ['description', 'files'];
    if(isCampaign){
      keysToValidate = keysToValidate.concat(['title', 'campaignGoal', 'campaignStartDate', 'campaignEndDate'])
    }
    const validateForm = TextInput.validateForm(keysToValidate, this.state)
    if (validateForm) {
      this.setState({ errors: validateForm });
      return false;
    }
   

    const filesUploaded = await UploadFiles(files, { fileType: 'image' });
    const filesIds = filesUploaded.map(o => o._id);
    postCreate({
      title,
      description,
      files: filesIds,
      campaignGoal,
      campaignStartDate,
      campaignEndDate,
    });
  }

  updateTextInput(key, value) {
    this.setState({ [key]: value });
  }

  render() {
    const { navigation, profile } = this.props;

    const { errors, isCampaign } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} title="Add Post" />
        <KeyboardAwareScrollView style={styles.subContainer}>
          <TextInput
            error={errors.description}
            multiline
            numberOfLines={4}
            label="About"
            placeholder="Write here about this post/campaign"
            inputStyle={ApplicationStyles.body}
            textInputRef={this.descriptionRef}
            returnKeyType="next"
            onChangeText={text => this.updateTextInput('description', text)}
            onSubmitEditing={() => this.passwordRef.current.focus()}
          />
          <FileSelector error={errors.files} label="Add images and videos (drag and drop to reorder)" onChange={files => this.updateTextInput('files', files)} />
          <HrLine />
          { profile.role ==='ngo' && <CheckBox
                style={{ flex: 1 }}
                onClick={() => {
                  this.setState({
                    isCampaign: !isCampaign,
                  });
                  this.resetCampaign(isCampaign);
                }}
                isChecked={isCampaign}
                rightText="Switch to Campaign"
                rightTextStyle={{ ...ApplicationStyles.button2, textAlign: 'left' }}
                checkBoxColor={ApplicationStyles.primaryColor.color}
                uncheckedCheckBoxColor={ApplicationStyles.disabledColor.color}
              />}
          {/* <Text style={{ ...ApplicationStyles.info3 }}>Fill below section if you are creating a campaign </Text> */}
          {isCampaign && <Fragment>
          <TextInput
            error={errors.title}
            multiline
            numberOfLines={1}
            label="Title"
            placeholder="e.g. Helping kids to get better education"
            returnKeyType="next"
            onChangeText={text => this.updateTextInput('title', text)}
            onSubmitEditing={() => this.campaignGoalRef.current.focus()}
          />
          <TextInput
            error={errors.campaignGoal}
            multiline
            numberOfLines={1}
            label="Campaign Goal"
            placeholder="e.g. 5000"
            keyboardType="number-pad"
            textInputRef={this.campaignGoalRef}
            returnKeyType="done"
            onSubmitEditing={()=>{}}
            onChangeText={text => this.updateTextInput('campaignGoal', text)}
          />
          <DatePicker error={errors.campaignStartDate} label="Campaign Starts from" placeholder="xxxx/xx/xx xx:xx xx" onChange={text => this.updateTextInput('campaignStartDate', text)} />
          <DatePicker error={errors.campaignEndDate} label="Campaign Ends on" placeholder="xxxx/xx/xx xx:xx xx" onChange={text => this.updateTextInput('campaignEndDate', text)} />
          </Fragment>
          }
          {/* <LocationSelector label="Location" placeholder="Select location" onChange={text => this.updateTextInput('starts', text)} /> */}
          <Button
            style={styles.loginContainer}
            onPress={this.addPost}
            title="ADD"
          />

        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default connect(({ post: { homePosts }, user: {profile} }) => ({ homePosts, profile }), {
  postCreate: PostActions.postCreate,
})(AddPost);
