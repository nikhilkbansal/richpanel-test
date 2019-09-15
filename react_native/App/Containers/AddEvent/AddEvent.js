import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView, horizontal,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import EventActions from 'App/Stores/Event/Actions';
import UploadFiles from '../../Services/UploadFilesService';
import {
  Text, NavigationBar, TextInput, Button, HrLine, DatePicker, LocationSelector, FileSelector,
} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ApplicationStyles.smokeBackground.color },
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

class AddEvent extends Component {
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
    this.addEvent = this.addEvent.bind(this);
    this.descriptionRef = React.createRef();
  }


  async addEvent() {
    const {
      errors,
      title,
      description,
      files,
      startTime,
      endTime,
    } = this.state;
    const { eventCreate } = this.props;

    const filesUploaded = await UploadFiles(files, { fileType: 'image' });
    const filesIds = filesUploaded.map(o => o._id);
    eventCreate({
      title,
      description,
      files: filesIds,
      startTime,
      endTime,
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
        <NavigationBar {...navigation} title="Add Event" />
        <KeyboardAwareScrollView style={styles.subContainer}>
          <TextInput
            error={errors.title}
            multiline
            numberOfLines={1}
            label="Title"
            placeholder="e.g. Marathon for generating fund for women education"
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
          <DatePicker label="Event Starts from" placeholder="xxxx/xx/xx xx:xx xx" onChange={text => this.updateTextInput('startTime', text)} />
          <DatePicker label="Event Ends on" placeholder="xxxx/xx/xx xx:xx xx" onChange={text => this.updateTextInput('endTime', text)} />
          <LocationSelector label="Location" placeholder="Select location" onChange={text => this.updateTextInput('starts', text)} />
          <Button
            style={styles.loginContainer}
            onPress={this.addEvent}
            title="ADD"
          />

        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default connect(null, {
  eventCreate: EventActions.eventCreate,
})(AddEvent);
