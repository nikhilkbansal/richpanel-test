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
  Dropdown, NavigationBar, TextInput, Button, Text, DatePicker, LocationSelector, FileSelector,
} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';

const donateOptions = [
  { label: 'Once', value: 'once' },
  { label: 'Monthly', value: 'month' },
  { label: 'Yearly', value: 'year' },
];

const endsAfterOptions = [
  { label: '3 months', value: '3month' },
  { label: '6 months ', value: '6month' },
  { label: '1 year', value: '1years' },
  { label: '2 years', value: '2years' },
  { label: '5 years', value: '5years' },
  { label: 'lifetime', value: 'lifetime' },
];

const endsAfterOptionsForYears = [
  { label: '1 year', value: '1years' },
  { label: '2 years', value: '2years' },
  { label: '5 years', value: '5years' },
  { label: '10 years', value: '10years' },
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
      endsAfter: '5years',
      startsFrom: new Date()
    };
    this.goNext = this.goNext.bind(this);
    this.descriptionRef = React.createRef();
  }

 

  updateTextInput(key, value) {
    this.setState({ [key]: value });
  }

  goNext(){
    const { amount, donate, startsFrom, endsAfter } = this.state;
    const { paymentMeta } = this.props.navigation.state.params;

    const validateForm = TextInput.validateForm(['amount'], this.state);
    if (validateForm) {
      this.setState({ errors: validateForm });
      return false;
    } else {
      this.setState({ errors: {} });
    }

    this.props.navigation.navigate('SelectPaymentMethod', { amount, paymentMeta: {...paymentMeta, donate, startsFrom, endsAfter} });
  }

  render() {
    const { navigation } = this.props;

    const { errors, donate, startsFrom, endsAfter } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} title="Donate" />
        <KeyboardAwareScrollView style={styles.subContainer}>
          <Dropdown dropDownLabel="Donate" default={donateOptions[0]} title="Donate" value={donate} options={donateOptions} onValueChange={(label, value) => this.setState({ donate: value })} />
          {donate !== 'once' && <Text style={ApplicationStyles.fontStyles.caption}>You can cancel this anytime you want from recurring payment section</Text>}
          {donate !== 'once' && <DatePicker onlyDate label="Starts From"  value={endsAfter}  placeholder="Starts From"  onChange={(data) => this.setState({ startsFrom: data })}/>}
          {donate !== 'once' && <Dropdown dropDownLabel="Ends after" value={endsAfter} title="Ends after" options={donate==='month'?endsAfterOptions:endsAfterOptionsForYears} onValueChange={(label, value) => this.setState({ endsAfter: value })}/>}
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
