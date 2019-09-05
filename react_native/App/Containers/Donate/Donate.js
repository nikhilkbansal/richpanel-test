import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView, horizontal, Picker,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

import PostActions from 'App/Stores/Post/Actions';
import {
  Dropdown, NavigationBar, TextInput, Button, HrLine, DatePicker, LocationSelector, FileSelector,
} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';

const donateOptions = [
  { label: 'Once', value: 'once' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
];

const frequencyOptions = [
  { label: 'For 3 months', value: '3month' },
  { label: 'For 6 months ', value: 'monthly' },
  { label: 'For 1 year', value: 'yearly' },
  { label: 'For 5 years', value: 'yearly' },
  { label: 'For 10 years', value: 'yearly' },
  { label: 'For lifetime', value: 'yearly' },
];


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


class Donate extends Component {
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
      donate: 'once',
      files: [],
    };
    this.addPost = this.addPost.bind(this);
    this.descriptionRef = React.createRef();
  }

  addPost() {
    const {
      errors, title, description, files,
    } = this.state;
    const { postCreate } = this.props;
    postCreate({ title, description, files });
  }

  updateTextInput(key, value) {
    this.setState({ [key]: value });
  }


  render() {
    const { navigation } = this.props;

    const { errors, donate } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} title="Donate" />
        <KeyboardAwareScrollView style={styles.subContainer}>
          <Dropdown dropDownLabel="Donate" default={donateOptions[0]} placeholder="Donate" options={donateOptions} onValueChange={(label, value) => this.setState({ donate: value })} />
          {donate !== 'once' && <Dropdown dropDownLabel="Frequency" default={frequencyOptions[0]} placeholder="Donate" options={frequencyOptions} />}
          <TextInput
            error={errors.title}
            multiline
            numberOfLines={1}
            label="Amount"
            placeholder="e.g. 500"
            returnKeyType="next"
            onChangeText={text => this.updateTextInput('title', text)}
            onSubmitEditing={() => this.descriptionRef.current.focus()}
          />
          <Button
            style={styles.loginContainer}
            onPress={() => {
              navigation.navigate('Payment');
            }}
            title="NEXT"
          />

        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default connect(null, {
  postCreate: PostActions.postCreate,
})(Donate);
