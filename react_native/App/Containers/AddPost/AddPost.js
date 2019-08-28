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
    };
    this.addPost = this.addPost.bind(this);
    this.descriptionRef = React.createRef();
  }


  async addPost() {
    const {
      errors,
      title,
      description,
      files,
      campaignGoal,
      campaignStartDate,
      campaignEndDate,
    } = this.state;
    const { postCreate } = this.props;
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
    const { navigation } = this.props;

    const { errors } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} statusBarColor={Colors.background} title="ADD POST" containerStyle={{ paddingHorizontal: wp('2%') }} />
        <KeyboardAwareScrollView style={styles.subContainer}>
          <TextInput
            error={errors.title}
            multiline
            numberOfLines={1}
            label="Title"
            placeholder="e.g. Helping kids to get better education"
            returnKeyType="next"
            onChangeText={text => this.updateTextInput('title', text)}
            onSubmitEditing={() => this.descriptionRef.current.focus()}
          />
          <TextInput
            error={errors.description}
            multiline
            numberOfLines={4}
            label="Description"
            placeholder=""
            textInputRef={this.descriptionRef}
            returnKeyType="next"
            onChangeText={text => this.updateTextInput('description', text)}
            onSubmitEditing={() => this.passwordRef.current.focus()}
          />
          <FileSelector label="Add images and videos" onChange={files => this.updateTextInput('files', files)} />
          <HrLine />
          <Text style={{ ...ApplicationStyles.info3 }}>Fill below section if you are creating a campaign </Text>
          <TextInput
            error={errors.description}
            multiline
            numberOfLines={1}
            label="Campaign Goal"
            placeholder="e.g. 5000"
            keyboardType="number-pad"
            textInputRef={this.descriptionRef}
            returnKeyType="next"
            onChangeText={text => this.updateTextInput('campaignGoal', text)}
            onSubmitEditing={() => this.passwordRef.current.focus()}
          />
          <DatePicker label="Campaign Starts from" placeholder="xxxx/xx/xx xx:xx xx" onChange={text => this.updateTextInput('campaignStartDate', text)} />
          <DatePicker label="Campaign Ends on" placeholder="xxxx/xx/xx xx:xx xx" onChange={text => this.updateTextInput('campaignEndDate', text)} />
          <LocationSelector label="Location" placeholder="Select location" onChange={text => this.updateTextInput('starts', text)} />
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

export default connect(null, {
  postCreate: PostActions.postCreate,
})(AddPost);
