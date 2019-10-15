import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView, horizontal, WebView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import CheckBox from 'react-native-check-box';

import PaymentActions from 'App/Stores/Payment/Actions';
import { call, put } from 'redux-saga/effects';
import CashfreePG from 'cashfreereactnativepg';
import {
  Text, NavigationBar, TextInput, Button, HrLine, DatePicker, LocationSelector, MenuDropdown, Icon,
} from '../../Components';
import {
  Colors, FontSizes, ApplicationStyles, Files,
} from '../../Theme';
import { CommonFunctions } from '../../Utils';
import AxiosRequest from '../../Services/HttpRequestService';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ApplicationStyles.smokeBackground.color },
  subContainer: { flex: 1, paddingHorizontal: wp('5%') },
  loginContainer: {
    marginVertical: hp('4%'),
    backgroundColor:ApplicationStyles.primaryColor.color,
    borderRadius: wp('2%'),
    width: wp('80%'),
    alignSelf: 'center',
    height: hp('7%'),
  },
  loginTitle: { color: ApplicationStyles.lightColor.color, textAlign: 'center', fontSize: FontSizes.h3 },
  menuContainer: {
    ...ApplicationStyles.elevationS,
    marginVertical: hp('0.2%'),
    backgroundColor: ApplicationStyles.lightBackground.color,
    paddingHorizontal: wp('4%'),
    justifyContent: 'center',
    // ...dynamicStyle,
    flex: 1,
    // height: hp('10%'),

  },
  menuSubFirst: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: hp('10%'),

  },
  mainMenu: { flex: 3, flexDirection: 'row', alignItems: 'center' },
  menuLabel: { marginLeft: wp('2%'), ...ApplicationStyles.button, color: ApplicationStyles.disabledColor.color },
  menuRightSide: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end',
  },
  menuRightLabel: { marginHorizontal: wp('2%'), color: ApplicationStyles.primaryColor.color },
});

const banks = [{ label: 'Allahabad Bank', value: '3001' }, { label: 'Andhra Bank', value: '3002' }, { label: 'Axis Bank', value: '3003' }, { label: 'Bank of Baroda - Corporate', value: '3060' }, { label: 'Bank of Baroda - Retail', value: '3005' }, { label: 'Bank of India', value: '3006' }, { label: 'Bank of Maharashtra', value: '3007' }, { label: 'Canara Bank', value: '3009' }, { label: 'Catholic Syrian Bank', value: '3010' }, { label: 'Central Bank of India', value: '3011' }, { label: 'City Union Bank', value: '3012' }, { label: 'Corporation Bank', value: '3013' }, { label: 'DBS Bank Ltd', value: '3017' }, { label: 'DCB Bank - Corporate', value: '3062' }, { label: 'DCB Bank - Personal', value: '3018' }, { label: 'Deutsche Bank', value: '3016' }, { label: 'Dhanlakshmi Bank', value: '3019' }, { label: 'Federal Bank', value: '3020' }, { label: 'HDFC Bank', value: '3021' }, { label: 'ICICI Bank', value: '3022' }, { label: 'IDBI Bank', value: '3023' }, { label: 'Indian Bank', value: '3026' }, { label: 'Indian Overseas Bank', value: '3027' }, { label: 'IndusInd Bank', value: '3028' }, { label: 'Jammu and Kashmir Bank', value: '3029' }, { label: 'Karnataka Bank Ltd', value: '3030' }, { label: 'Karur Vysya Bank', value: '3031' }, { label: 'Kotak Mahindra Bank', value: '3032' }, { label: 'Laxmi Vilas Bank', value: '3033' }, { label: 'Oriental Bank of Commerce', value: '3035' }, { label: 'Punjab & Sind Bank', value: '3037' }, { label: 'Punjab National Bank - Corporate', value: '3065' }, { label: 'Punjab National Bank - Retail', value: '3038' }, { label: 'Saraswat Bank', value: '3040' }, { label: 'South Indian Bank', value: '3042' }, { label: 'Standard Chartered Bank', value: '3043' }, { label: 'State Bank Of India', value: '3044' }, { label: 'Tamilnad Mercantile Bank Ltd', value: '3052' }, { label: 'UCO Bank', value: '3054' }, { label: 'Union Bank of India', value: '3055' }, { label: 'United Bank of India', value: '3056' }, { label: 'Vijaya Bank', value: '3057' }, { label: 'Yes Bank Ltd', value: '3058' }, { label: 'TEST Bank', value: '3333' }];
const wallets = [{ label: 'FreeCharge', value: '4001' }, { label: 'MobiKwik', value: '4002' }, { label: 'OLA Money', value: '4003' }, { label: 'Reliance Jio Money', value: '4004' }, { label: 'Airtel money', value: '4006' }, { label: 'Paytm', value: '4007' }, { label: 'Amazon Pay', value: '4008' }, { label: 'Phonepe', value: '4009' }];
const paymentCodeShortcuts = {
  SBI: 3044,
  'HDFC Bank': 3021,
  'Axis Bank': 3003,
  'Amazon Pay': 4008,
  Paytm: 4007,
  PhonePe: 4009,

};

class SelectPaymentMethod extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.func.isRequired,
    };
  }


  constructor(props) {
    super(props);
    const { amount } = props.navigation.state.params;
    this.state = {
      amount,
    };
    this.addPaymentFunc = this.addPaymentFunc.bind(this);
  }


  async componentDidMount() {
  }

  updateTextInput(key, value) {
    this.setState({ [key]: value });
  }

  addPaymentFunc(array, type) {
    const { navigation: { navigate, state: { params: { paymentMeta } } } } = this.props;
    const { amount } = this.state;
    let paymentOption;
    if (type === 'banks') {
      paymentOption = 'nb';
    } else {
      paymentOption = 'wallet';
    }
    return array.map(o => ({
      ...o,
      func: () => navigate('Payment', {
        paymentMeta,
        seamlessParams: {
          orderAmount: amount,
          paymentOption,
          paymentCode: o.value,
        },
      }),
    }));
  }

  subMenuItems({ iconName, label }, parentLabel) {
    const { navigation: { navigate, state: { params: { paymentMeta } } } } = this.props;
    const { amount } = this.state;

    return (
      <Button
        style={{
          flex: 1,
        }}
        onPress={() => navigate('Payment', {
          paymentMeta,
          seamlessParams: {
            orderAmount: amount,
            paymentOption: parentLabel === 'Wallet' ? 'wallet' : 'nb',
            paymentCode: paymentCodeShortcuts[label],
          },
        })}
      >
        <View style={{
          ...ApplicationStyles.elevationS,
          borderRadius: wp('12%'),
          padding: wp('1%'),
          alignSelf: 'center',
          borderWidth: 0,
          overflow: 'hidden',
        }}
        >
          <Image style={{ width: wp('14%'), height: wp('14%') }} resizeMode="contain" source={Files[iconName]} />
        </View>
        <Text style={{ textAlign: 'center', paddingVertical: hp('0.5%'), paddingBottom: hp('2%') }}>{label}</Text>
      </Button>
    );
  }

  menuItem(label, leftIcon, subMenus) {
    const isSubMenu = !['Cards', 'UPI'].includes(label);
    return (
      <View style={styles.menuContainer}>
        <View style={styles.menuSubFirst}>
          <View style={styles.mainMenu}>
            <Icon name={leftIcon.name} iconFamily={leftIcon.family} size={leftIcon.size} color={ApplicationStyles.disabledColor.color} />
            <Text style={styles.menuLabel}>{label}</Text>
          </View>
          <View style={{ ...styles.menuRightSide, flex: 2 }}>
            <MenuDropdown
              menuTitle={label === 'Wallet' ? 'Select wallet' : 'Select bank'}
              modalStyle={{
                width: wp('65%'),
              }}
              menuItemStyle={{ ...ApplicationStyles.body, textAlign: 'left' }}
              buttonStyle={[styles.moreWrapperStyle]}
              menus={label === 'Wallet' ? this.addPaymentFunc(wallets, 'wallets') : this.addPaymentFunc(banks, 'banks')}
            >
              <Text style={{
                textAlign: 'right', marginTop: hp('0.6%'), marginLeft: wp('3.5%'), ...styles.menuRightLabel,
              }}
              >
              See more
              </Text>
            </MenuDropdown>
            <Icon color={ApplicationStyles.primaryColor.color} name="ios-arrow-down" />
          </View>
        </View>

        { isSubMenu && (
        <View style={{
          justifyContent: 'center',
          justifyItems: 'center',
          alignContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          flex: 1,
          height: hp('12%'),
          paddingBottom: hp('0.7%'),
        }}
        >
          {
            subMenus.map(o => this.subMenuItems(o, label))
          }

        </View>
        )}
      </View>
    );
  }

  getCards() {
    return (
      <View style={{
        flex: 1, flexDirection: 'row', alignItems: 'center',
      }}
      >
        <Icon name="credit-card" size={wp('4.5%')} iconFamily="Octicons" color={ApplicationStyles.disabledColor.color} />
        <CheckBox
          style={{ flex: 1 }}
          onClick={() => {
            this.setState({
              isRememberMe: !'isRememberMe',
            });
          }}
          isChecked={false}
          rightText=""
          leftText="  4101-XXXXXXXX-1222"
          rightTextStyle={{ ...ApplicationStyles.body, textAlign: 'left' }}
          checkBoxColor={ApplicationStyles.primaryColor.color}
          uncheckedCheckBoxColor={ApplicationStyles.disabledColor.color}
        />
      </View>
    );
  }

  render() {
    const { navigation } = this.props;

    const { amount } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} statusBarColor={ApplicationStyles.primaryColor.color} title="Donate" />
        <ScrollView style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: ApplicationStyles.smokeBackground.color,
        }}
        >
          <View style={styles.menuContainer}>
            <View style={styles.menuSubFirst}>
              <View style={styles.mainMenu}>
                <Icon name="credit-card" iconFamily="Octicons" color={ApplicationStyles.disabledColor.color} />
                <Text style={styles.menuLabel}>Cards</Text>
              </View>
              <Button
                buttonWrapperStyle={styles.menuRightSide}
                onPress={() => navigation.navigate('AdditionalPayment', { cards: true, orderAmount: amount })}
              >
                <Text style={styles.menuRightLabel}>Enter new</Text>
                <Icon color={ApplicationStyles.primaryColor.color} name="ios-arrow-forward" />
              </Button>
            </View>
            {false && (
            <View style={{ paddingBottom: hp('1%') }}>
              {this.getCards()}
              {this.getCards()}
              {this.getCards()}
              {this.getCards()}
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <TextInput
                  label="CVV"
                  returnKeyType="done"
                  secureTextEntry
                  placeholder="Enter CVV number"
                />
                <Button
                  title="Submit"
                  titleStyle={{ color: ApplicationStyles.primaryColor.color }}
                  buttonWrapperStyle={{
                    height: hp('5%'),
                  }}
                />
              </View>

            </View>
            )}
          </View>

          <View style={styles.menuContainer}>
            <View style={styles.menuSubFirst}>
              <View style={styles.mainMenu}>
                <Icon name="rupee" iconFamily="FontAwesome" color={ApplicationStyles.disabledColor.color} size={wp('6.5%')} />
                <Text style={styles.menuLabel}>UPI</Text>
              </View>
              <Button
                buttonWrapperStyle={styles.menuRightSide}
                onPress={() => navigation.navigate('AdditionalPayment', { upi: true, orderAmount: amount })}
              >
                <Text style={styles.menuRightLabel}>Enter VPA</Text>
                <Icon color={ApplicationStyles.primaryColor.color} name="ios-arrow-forward" />
              </Button>
            </View>
          </View>

          {this.menuItem('Net Banking', { name: 'bank', family: 'MaterialCommunityIcons' }, [{ iconName: 'sbiLogo', label: 'SBI' }, { iconName: 'hdfcLogo', label: 'HDFC Bank' }, { iconName: 'axisLogo', label: 'Axis Bank' }])}
          {this.menuItem('Wallet', { name: 'wallet', family: 'SimpleLineIcons' }, [{ iconName: 'amazonPayLogo', label: 'Amazon Pay' }, { iconName: 'paytmLogo', label: 'Paytm' }, { iconName: 'phonepeLogo', label: 'PhonePe' }])}
        </ScrollView>
      </View>
    );
  }
}

export default connect(null, {
  paymentInit: PaymentActions.paymentInit,
})(SelectPaymentMethod);
