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
  loginTitle: {  textAlign: 'center', },
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
  signUpLinkContainer: {
      flex:1,
      marginBottom: hp('0.9%'), flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center',
  },
  signUpContainer: { alignSelf: 'center', flex:1 },
  signUpButton: { ...ApplicationStyles.fontStyles.button, ...ApplicationStyles.darkColor,
  },
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
    const { navigation: { state: { params: { paymentMeta } } } } = this.props;
    const isOnce = !paymentMeta.donate || paymentMeta.donate === 'once';
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
      isOnce,
      showEndScreen: isOnce,
      subscriptionAuthLink:''
    };
    this.getCfToken = this.getCfToken.bind(this);
    this.saveTransaction = this.saveTransaction.bind(this);
    this.createAndSubscribePlan = this.createAndSubscribePlan.bind(this);
    this.confirmSubscription = this.confirmSubscription.bind(this);
    this.afterPaymentDone = this.afterPaymentDone.bind(this);
  }


  componentDidMount() {
    const { isOnce } = this.state;
    if(isOnce){
      this.getCfToken();
    }else{
      this.createAndSubscribePlan();
    }
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
          receiverId: paymentMeta.poUserId,
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
    console.log('asdasdasd3ed3e', this.props.navigation.state)
    const { profile, navigation: { state: { params: { paymentMeta, seamlessParams } } } } = this.props;

    try {

      const data = await AxiosRequest({
        method: 'post',
        data: {
          poId: paymentMeta.poUserId,
          amount: orderAmount,
          intervalType: paymentMeta.donate,
          firstChargeDelay: moment(paymentMeta.startsFrom).diff(moment(), 'days'),
          customerEmail: profile.email,
          customerPhone: profile.phone || 23232,
          cardNumber: seamlessParams.card_number,
          cardExpiryMonth: seamlessParams.card_expiryMonth,
          cardExpiryYear: seamlessParams.card_expiryYear,
          cardCvv: seamlessParams.card_cvv,
          cardHolder: seamlessParams.card_holder,
        },
        url: 'payment/cashFree/createAndSubscribePlan',
      });
      this.setState({ ...data });
    } catch (e) {
      console.log('e',e)
      // Toast('Some error occured. Please try again later');
    }
  }

  async confirmSubscription(){
    const { subscriptionId } = this.state;
    try {
      const data = await AxiosRequest({
        method: 'post',
        data: { 
          _id:subscriptionId
        },
        url: 'payment/cashFree/verifySubscription',
      });

      if (data.status === 'INITIALIZED') {
        Toast('Have you authenticated your subscription above? If didn\'t please do');
      } else if(['ACTIVE', 'COMPLETED','BANK APPROVAL PENDING'].includes(data.status)) {
        this.setState({modalVisible: true});
      } else if(['ON_HOLD','CANCELLED'].includes(data.status)) {
        Toast('Payment is cancelled, deauthorized or some error happened. Please try again later.');
        this.setState({txSuccess: false, showEndScreen: true});
      }
    } catch (e) {
      console.log('e',e)
      // Toast('Some error occured. Please try again later');
    }
  }

   

  afterPaymentDone() {
    this.setState({ modalVisible: false },
      () => this.props.navigation.navigate('HomePage'));
  }

  render() {
    const { navigation, navigation: { state: { params } } } = this.props;

    const {
      orderId, profile, orderAmount, cfToken, txSuccess, modalVisible, isOnce, showEndScreen, subscriptionAuthLink
    } = this.state;
    console.log('orderId, orderAmount, cfToken', this.state);
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
            width: wp('60%'),
            maxHeight: hp('30%'),
            justifyContent: 'center',
            alignItems: 'center',
            justifyItems: 'center',
            alignContent: 'center',
            paddingTop: hp('3%'),
          }}
          >
            <Icon iconFamily="SimpleLineIcons" name="check" size={wp('20%')} color={ApplicationStyles.primaryColor.color} />
            <Text style={{ ...ApplicationStyles.fontStyles.title, marginTop: hp('1%'), ...ApplicationStyles.primaryColor }}>Payment Successful</Text>
            <Text style={{ ...ApplicationStyles.fontStyles.caption, textAlign: 'center' }}>Thank you for helping the needies</Text>
          </DialogContent>
        </Dialog>
        {showEndScreen && !txSuccess && (
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
        { !isOnce && !!subscriptionAuthLink && 
         <Fragment>
           <WebView
            source={{uri: subscriptionAuthLink}}
            style={{flex:1}}
          />
          <View style={{  height:hp('17%'), paddingTop: hp('1%')  }}>
            <Text style={{...ApplicationStyles.fontStyles.caption, textAlign: 'center'}}>If your subscription is authenticated, then click button below</Text>
            <Button title="NEXT" onPress={this.confirmSubscription} style={{flex:1}} style={styles.loginContainer}/>
            <View style={styles.signUpLinkContainer}>
                <Button
                  style={styles.signUpContainer}
                  titleStyle={styles.signUpButton}
                  buttonWrapperStyle={{flex:1}}
                  title="BACK TO HOME"
                  onPress={() => navigation.navigate('HomePage')}
                />
              </View>
            </View>
          </Fragment>
          }
          { isOnce && orderId && (
        <CashfreePG
          appId={Config.CASHFREE_APP_ID}
          orderId={orderId}
          orderAmount={orderAmount}
          orderCurrency="INR"
          orderNote={`donation by ${profile.id} for ${params.paymentMeta.poUserId}`}
          source="reactsdk"
          customerName={profile.name}
          customerEmail={profile.email}
          customerPhone={profile.phone || 3434343434}
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

export default connect(({ user: { profile } }) => ({
  profile,
}), {
  paymentInit: PaymentActions.paymentInit,
})(Payment);
