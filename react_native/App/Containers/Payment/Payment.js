import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView, horizontal, WebView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import Dialog, { DialogContent, SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import PaymentActions from 'App/Stores/Payment/Actions';
import CashfreePG from 'cashfreereactnativepg';
import Toast from '../../Services/ToastService';
import {
  Text, NavigationBar, Button, Icon,
} from '../../Components';
import { Config } from '../../Config';
import {
  Colors, FontSizes, ApplicationStyles,
} from '../../Theme';
import AxiosRequest from '../../Services/HttpRequestService';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ApplicationStyles.smokeBackground.color },
  subContainer: { flex: 1, paddingHorizontal: wp('5%') },
  loginContainer: {
    marginVertical: hp('1%'),
    backgroundColor: ApplicationStyles.primaryColor.color,
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


class Payment extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.func.isRequired,
    };
  }


  constructor(props) {
    super(props);
    const { orderAmount } = props.navigation.state.params.seamlessParams;
    console.log(props);
    this.state = {
      errors: {},
      title: '',
      description: '',
      files: [],
      orderId: null,
      cfToken: null,
      orderAmount,
      txSuccess: true,
      modalVisible: false,
    };
    this.addPost = this.addPost.bind(this);
    this.getCfToken = this.getCfToken.bind(this);
    this.saveTransaction = this.saveTransaction.bind(this);
    this.afterPaymentDone = this.afterPaymentDone.bind(this);
  }


  componentDidMount() {
    this.getCfToken();
    // this.createAndSubscribePlan();
    // console.log('data', data);
  }

  async getCfToken() {
    const { orderAmount } = this.state;
    try {
      const data = await AxiosRequest({
        method: 'get',
        params: {
          orderCurrency: 'INR',
          orderAmount,
        },
        url: 'payment/cashFree/getCfToken',
      });

      this.setState({ ...data });
    } catch (e) {
      Toast('Some error occured. Please try again later');
    }
  }


  async saveTransaction(txData) {
    const { orderId, orderAmount } = this.state;
    const { navigation: { state: { params: { paymentMeta } } } } = this.props;
    try {
      const data = await AxiosRequest({
        method: 'post',
        data: {
          receiverId: paymentMeta.poId,
          postId: paymentMeta._id,
          amount: orderAmount,
          orderId,
          txData,
          txType: paymentMeta.txType,
        },
        url: 'payment/cashFree/saveTransaction',
      });

      this.setState({ ...data });
    } catch (e) {
      console.log('e',e);
      Toast('Some error occured. Please try again later');
    }
  }


  async createAndSubscribePlan() {
    const { orderAmount } = this.state;
    try {
      const data = await AxiosRequest({
        method: 'post',
        data: {
          amount: orderAmount,
          intervalType: 'monthly',
          customerEmail: 'ab@ad.com',
          customerPhone: '+911234567890',
          cardNumber: 4444333322221111,
          cardExpiryMonth: '07',
          cardExpiryYear: '23',
          cardCvv: 123,
          cardHolder: 'Steve',
        },
        url: 'payment/cashFree/createAndSubscribePlan',
      });
      console.log('createAndSubscribePlan', data);
      // this.setState({ ...data });
    } catch (e) {
      // Toast('Some error occured. Please try again later');
    }
  }


  addPost() {
    const {
      errors, title, description, files,
    } = this.state;
    const { postCreate } = this.props;
    postCreate({ title, description, files });
  }

  afterPaymentDone() {
    this.setState({ modalVisible: false },
      () => this.props.navigation.navigate('HomePage'));
  }

  render() {
    const { navigation, navigation: { state: { params } } } = this.props;

    const {
      orderId, orderAmount, cfToken, txSuccess, modalVisible,
    } = this.state;
    console.log('orderId, orderAmount, cfToken', orderId, orderAmount, cfToken);
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} statusBarColor={ApplicationStyles.primaryColor.color} title="Donate" />
        <Dialog
          visible={modalVisible}
          dialogAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          onTouchOutside={this.afterPaymentDone}
        >
          <DialogContent style={{
            width: wp('50%'),
            maxHeight: hp('30%'),
            justifyContent: 'center',
            alignItems: 'center',
            justifyItems: 'center',
            alignContent: 'center',
            paddingTop: hp('3%'),
          }}
          >
            <Icon iconFamily="SimpleLineIcons" name="check" size={wp('20%')} color={ApplicationStyles.primaryColor.color} />
            <Text style={{ ...ApplicationStyles.button, marginTop: hp('1%'), ...ApplicationStyles.primaryColor }}>Payment Successful</Text>
            <Text style={{ ...ApplicationStyles.bodySubHeading, textAlign: 'center' }}>Thank you for helping the needies</Text>
          </DialogContent>
        </Dialog>
        {!txSuccess && (
        <View>
          <Button
            style={[styles.loginContainer, { marginTop: hp('27%') }]}
            titleStyle={styles.loginTitle}
            onPress={() => navigation.goBack()}
            title="Go Back"
          />
          <Button
            style={styles.loginContainer}
            titleStyle={styles.loginTitle}
            onPress={() => navigation.navigate('HomePage')}
            title="Go to Home"
          />
        </View>
        )}

        { orderId && (
        <CashfreePG
          appId={Config.CASHFREE_APP_ID}
          orderId={orderId}
          orderAmount={orderAmount}
          orderCurrency="INR"
          orderNote="This is an order note"
          source="reactsdk"
          customerName="John"
          customerEmail="abc@email.com"
          customerPhone="1234561234"
          notifyUrl="http://localhost:3000"
          paymentModes=""
          env="test" // blank for prod
          tokenData={cfToken}
          {...params.seamlessParams}
          callback={(eventData) => {
            const jsonEventData = JSON.parse(eventData);
            console.log('eventsdataeventsdata', eventData);
            // {"orderId":"INHWMM1569925455","referenceId":"169912",
            // "orderAmount":"100.00","txStatus":"SUCCESS",
            // "txMsg":"Transaction Successful","txTime":"2019-10-01 15:54:18",
            // "paymentMode":"CREDIT_CARD",
            // "signature":"Prk5z39jbI7BJxuvZ1F3g21+4Q1HGXsyVGU17xfDmkA="}
            if (jsonEventData.txStatus === 'SUCCESS') {
              this.saveTransaction(JSON.stringify(eventData));
              this.setState({ modalVisible: true });
              setTimeout(this.afterPaymentDone, 5000);
            } else {
              this.setState({ txSuccess: false });
              console.log('error came');
              Toast(jsonEventData.txMsg);
            }
          }}
        />
        ) }
      </View>
    );
  }
}

export default connect(null, {
  paymentInit: PaymentActions.paymentInit,
})(Payment);
