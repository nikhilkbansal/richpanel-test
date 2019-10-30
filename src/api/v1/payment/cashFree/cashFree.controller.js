const { generateOrderId } = require('../../../utils/universalFunctions');
const CashFree = require('./../../../services/cashFreeProviders');
const Post = require('./../../post/post.model');
const APIError = require('../../../utils/APIError');
const httpStatus = require('http-status');
const _ = require('lodash');
const { Transaction, Beneficiary } = require('../transaction/transaction.model');

exports.getCfToken = async (req, res, next) => {
  try {
    const { orderAmount, orderCurrency } = req.query;
    const orderId = generateOrderId();
    const data = await CashFree.createCfToken({
      orderId,
      orderAmount,
      orderCurrency,
    });
    if (data.status === 'OK') {
      res.json({
        cfToken: data.cftoken,
        orderId,
      });
    } else {
      throw new APIError({ message: data.message });
    }
  } catch (error) {
    next(error);
  }
};


exports.saveTransaction = async (req, res, next) => {
  try {
    const { user } = req;
    const {
      postId, orderId, receiverId, txType, txData,
    } = req.body;

    const post = Post.findById(postId);
    const orderDetail = await CashFree.getOrderDetails({
      orderId,
    });

    if (txType === 'userToPOCampaign') {
      console.log('chlaa');
      await Post.updateRaisedMoney(postId, parseFloat(orderDetail.details.orderAmount));
    }

    await Transaction.add({
      senderId: user._id,
      postId: postId || null,
      receiverId: receiverId || post.userId,
      amount: parseFloat(orderDetail.details.orderAmount),
      txStatus: _.camelCase(orderDetail.details.orderStatus),
      txData: JSON.parse(txData),
      txType,
    });

    res.status(httpStatus.CREATED).json();
  } catch (error) {
    next(error);
  }
};


exports.createAndSubscribePlan = async (req, res, next) => {
  try {
    // const { user } = req;
    const {
      amount,
      intervalType,
      customerEmail,
      customerPhone,
      cardNumber,
      cardExpiryMonth,
      cardExpiryYear,
      cardCvv,
      cardHolder,
    } = req.query;
    const planId = generateOrderId();
    const subscriptionId = generateOrderId();

    await CashFree.createPlan({
      planId,
      planName: 'INID',
      // planName: `IN${user.id}ID`,
      amount,
      intervalType,
      intervals: 2,
      description: '',
    });

    await CashFree.createSubscriptions({
      subscriptionId,
      planId,
      customerEmail,
      customerPhone,
      paymentOption: 'card',
      card_number: cardNumber,
      card_expiryMonth: cardExpiryMonth,
      card_expiryYear: cardExpiryYear,
      card_cvv: cardCvv,
      card_holder: cardHolder,
    });

    res.json();
  } catch (error) {
    console.log('error', error);
    next(error);
  }
};


exports.addPayoutBeneficiary = async (req, res, next) => {
  try {
    const { user } = req;
    const {
      name,
      email,
      phone,
      bankAccount,
      ifsc,
      vpa,
      cardNo,
      address1,
      address2,
      city,
      state,
      pincode,
    } = req.body;
    const beneId = generateOrderId();
    const authorizePayout = await CashFree.authorizePayout();
    await CashFree.addBeneficiary({
      beneId,
      name,
      email,
      phone,
      bankAccount,
      ifsc,
      vpa,
      cardNo,
      address1,
      address2,
      city,
      state,
      pincode,
    }, {
      Authorization: `Bearer ${authorizePayout.data.token}`,
    });

    await Beneficiary.add({
      beneId,
      userId: user._id,
    });

    res.status(httpStatus.CREATED).json();
  } catch (error) {
    console.log('error', error);
    next(error);
  }
};
