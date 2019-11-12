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
  { label: 'For 6 months ', value: '6month' },
  { label: 'For 1 year', value: '1year' },
  { label: 'For 2 year', value: '2year' },
  { label: 'For 5 years', value: '5year' },
  { label: 'For lifetime', value: 'lifetime' },
];


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ApplicationStyles.smokeBackground.color },
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
      amount: 0,
      frequency: '2year'
    };
    this.goNext = this.goNext.bind(this);
    this.descriptionRef = React.createRef();
  }

 

  updateTextInput(key, value) {
    this.setState({ [key]: value });
  }

  goNext(){
    const { amount, donate } = this.state;
    const { paymentMeta } = this.props.navigation.state.params;

    const validateForm = TextInput.validateForm(['amount'], this.state);
    if (validateForm) {
      this.setState({ errors: validateForm });
      return false;
    } else {
      this.setState({ errors: {} });
    }

    this.props.navigation.navigate('SelectPaymentMethod', { amount, paymentMeta: {...paymentMeta, donate} });
  }

  render() {
    const { navigation } = this.props;

    const { errors, donate } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} title="Donate" />
        <KeyboardAwareScrollView style={styles.subContainer}>
          <Dropdown dropDownLabel="Donate" default={donateOptions[0]} placeholder="Donate" options={donateOptions} onValueChange={(label, value) => this.setState({ donate: value })} />
          {donate !== 'once' && <Dropdown dropDownLabel="Frequency" default={frequencyOptions[0]} placeholder="Donate" options={frequencyOptions} onValueChange={(label, value) => this.setState({ frequency: value })}/>}
          <TextInput
            error={errors.amount}
            multiline
            numberOfLines={1}
            label="Amount"
            keyboardType={'number-pad'}
            placeholder="e.g. 500"
            returnKeyType="next"
            onChangeText={text => this.updateTextInput('amount', text)}
            onSubmitEditing={() => this.descriptionRef.current.focus()}
          />
          <Button
            style={styles.loginContainer}
            onPress={this.goNext}
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
