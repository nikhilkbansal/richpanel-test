import React, { Fragment, Component } from 'react'
import { View, StyleSheet, FlatList, Image, ScrollView, horizontal } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import EventActions from 'App/Stores/Event/Actions'
import UploadFiles from '../../Services/UploadFilesService'
import {
  Text,
  NavigationBar,
  TextInput,
  Button,
  HrLine,
  DatePicker,
  LocationSelector,
  FileSelector,
} from '../../Components'
import { Colors, FontSizes, ApplicationStyles } from '../../Theme'

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
  loginTitle: {
    color: ApplicationStyles.lightColor.color,
    textAlign: 'center',
    fontSize: FontSizes.h3,
  },
})

class AddEvent extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.func.isRequired,
    }
  }

  constructor(props) {
    super(props)
    const { params } = props.navigation.state

    this.state = {
      errors: {},
      title: '',
      description: '',
      files: [],
      isRepost: params && params.isRepost,
    }
    this.addEvent = this.addEvent.bind(this)
    this.descriptionRef = React.createRef()
  }

  async addEvent() {
    const { errors, title, description, files, startTime, endTime, isRepost } = this.state
    const { eventCreate, navigation: { state: { params: { itemId } } } } = this.props
    if (isRepost) {
      eventCreate({
        repostOf: itemId,
        isRepost: true,
        description,
      })
    }
    let keysToValidate = ['title', 'description', 'files', 'startTime', 'endTime']
    const validateForm = TextInput.validateForm(keysToValidate, this.state)
    if (validateForm) {
      this.setState({ errors: validateForm })
      return false
    }

    const filesUploaded = await UploadFiles(files, { fileType: 'image' })
    const filesIds = filesUploaded.map((o) => o._id)
    eventCreate({
      title,
      description,
      files: filesIds,
      startTime,
      endTime,
    })
  }

  updateTextInput(key, value) {
    this.setState({ [key]: value })
  }

  render() {
    const { navigation } = this.props

    const { errors, isRepost } = this.state
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} title="Add Event" />
        <KeyboardAwareScrollView style={styles.subContainer}>
          {!isRepost && (
            <TextInput
              error={errors.title}
              multiline
              numberOfLines={1}
              label="Title"
              placeholder="e.g. Marathon for generating fund for women education"
              returnKeyType="next"
              onChangeText={(text) => this.updateTextInput('title', text)}
              onSubmitEditing={() => this.descriptionRef.current.focus()}
            />
          )}
          <TextInput
            error={errors.description}
            multiline
            numberOfLines={4}
            inputStyle={ApplicationStyles.body}
            label="About"
            placeholder="Write something about this event"
            textInputRef={this.descriptionRef}
            returnKeyType="next"
            onChangeText={(text) => this.updateTextInput('description', text)}
            onSubmitEditing={() => this.passwordRef.current.focus()}
          />
          {!isRepost && (
            <Fragment>
              <FileSelector
                error={errors.files}
                label="Add images and videos (drag and drop to reorder)"
                onChange={(files) => this.updateTextInput('files', files)}
              />
              <DatePicker
                error={errors.startTime}
                label="Event Starts from"
                placeholder="xxxx/xx/xx xx:xx xx"
                onChange={(text) => this.updateTextInput('startTime', text)}
              />
              <DatePicker
                error={errors.endTime}
                label="Event Ends on"
                placeholder="xxxx/xx/xx xx:xx xx"
                onChange={(text) => this.updateTextInput('endTime', text)}
              />
              {/* <LocationSelector
                error={errors.location}
                label="Location"
                placeholder="Select location"
                onChange={(text) => this.updateTextInput('starts', text)}
              /> */}
            </Fragment>
          )}
          <Button style={styles.loginContainer} onPress={this.addEvent} title="ADD" />
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

export default connect(null, {
  eventCreate: EventActions.eventCreate,
})(AddEvent)
