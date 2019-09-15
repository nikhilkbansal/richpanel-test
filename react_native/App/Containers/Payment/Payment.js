import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView, horizontal, WebView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

import PaymentActions from 'App/Stores/Payment/Actions';
import { call, put } from 'redux-saga/effects';
import CashfreePG from 'cashfreereactnativepg';
import {
  Text, NavigationBar, TextInput, Button, HrLine, DatePicker, LocationSelector, FileSelector,
} from '../../Components';
import { Colors, FontSizes } from '../../Theme';
import { CommonFunctions } from '../../Utils';
import AxiosRequest from '../../Services/HttpRequestService';

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


class Payment extends Component {
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
      uri: '',
    };
    this.addPost = this.addPost.bind(this);
    this.descriptionRef = React.createRef();
  }


  async componentDidMount() {
    const data = await AxiosRequest({
      method: 'post',
      data: {
        email: 'rahul@gmail.com',
        amount: 100,
        productinfo: 'Donation - Goonj - 2323232',
        firstname: 'Rahul',
        phone: '919999199199',
        lastname: 'Saini',
      },
      url: 'payment/payU/makePayment',
    });
    this.setState({ uri: data.url });
    console.log('data', data);
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

    const { errors, uri } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} statusBarColor={Colors.background} title="Donate" />
        {/*
        <CashfreePG
          appId="275432e3853bd165afbf5272"
          orderId="Order0003987654321Order0003987654321"
          orderAmount="1"
          orderCurrency="INR"
          orderNote="This is an order note"
          source="reactsdk"
          customerName="John"
          customerEmail="abc@email.com"
          customerPhone="1234561234"
          notifyUrl="http://localhost:3000"
          paymentModes=""
          env="test" // blank for prod
          tokenData="Yj9JCN4MzUIJiOicGbhJCLiQ1VKJiOiAXe0Jye.ZB9JSYwADNkRmZ2UTM3QWNiojI0xWYz9lIsUjM5ADMzAzN1EjOiAHelJCLiIlTJJiOik3YuVmcyV3QyVGZy9mIsEjOiQnb19WbBJXZkJ3biwiIxIzM0UjN3gTOzADMwIXZkJ3TxIzM0UjN3gTOzADMwIXZkJ3TiojIklkclRmcvJye.tBz_0Wd9voi25g1E-wx2WJ9bjuXeWvmAbfLbw-tLxXza7hsv4joXZSJxvKYF5rZjA9"
          callback={(eventData) => {
            console.log('eventsdata', eventData);
            /*
                callback function that will be executed once the transaction has been completed
                */
          }
        {/* }
        /> */}

        {!!uri && (
        <WebView
          source={{ uri }}
          onNavigationStateChange={(q) => {
            if (q.url.includes('http://localhost:3000/')) {
              alert('failed');
            }
          }}
        />
        )}
      </View>
    );
  }
}

export default connect(null, {
  paymentInit: PaymentActions.paymentInit,
})(Payment);
