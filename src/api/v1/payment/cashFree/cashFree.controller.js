const { generateOrderId } = require('../../../utils/universalFunctions');
const CashFree = require('./../../../services/cashFreeProviders');
const Post = require('./../../post/post.model');
const Subscription = require('./../subscription/subscription.model');
const APIError = require('../../../utils/APIError');
const httpStatus = require('http-status');
const _ = require('lodash');
const moment = require('moment');
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
    const { user } = req;
    const {
      poId,
      amount,
      intervalType,
      expiresOn,
      firstChargeDelay,
      customerEmail,
      customerPhone,
      cardNumber,
      cardExpiryMonth,
      cardExpiryYear,
      cardCvv,
      cardHolder,
    } = req.body;
    const planId = generateOrderId();
    const subscriptionId = generateOrderId();

    const planParams = {
      planId,
      planName: `IN${user.id}ID`,
      amount,
      intervalType,
      intervals: 2,
      description: '',
      type: 'PERIODIC',
    };
    await CashFree.createPlan(planParams);
    const subscriptionParams = {
      subscriptionId,
      planId,
      customerEmail,
      customerPhone,
      firstChargeDelay,
      expiresOn: moment(expiresOn).format('YYYY-MM-DD hh:mm:ss'),
      paymentOption: 'card',
      card_number: cardNumber,
      card_expiryMonth: cardExpiryMonth,
      card_expiryYear: cardExpiryYear,
      card_cvv: cardCvv,
      card_holder: cardHolder,
    };

    const subscriptionResponse = await CashFree.createSubscriptions(subscriptionParams);

    const subscription = new Subscription({
      senderId: user.id,
      receiverId: poId,
      plan: { ...planParams, planType: planParams.type },
      subscription: {
        ...subscriptionParams,
        subReferenceId: subscriptionResponse.subReferenceId,
      },
    });
    await subscription.save();
    res.json({
      subscriptionAuthLink: subscriptionResponse.authLink,
      subscriptionId: subscription._id,
    });
  } catch (error) {
    next(error);
  }
};

exports.verifySubscription = async (req, res, next) => {
  try {
    const { user } = req;
    const {
      _id,
    } = req.body;
    const subscription = await Subscription.findById(_id);
    if (!subscription) {
      throw new APIError({ message: 'Subscription not found' });
    }
    const subDetails = await CashFree.getSubscription(subscription.subscription.subReferenceId);
    subscription.subscription.status = subDetails.subscription.status;
    await subscription.save();

    res.status(httpStatus.CREATED).json({ status: subDetails.subscription.status });
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
      accountDetails: {
        maskedAccountNumber: `xxxxxxxxxx${String(bankAccount).slice(String(bankAccount).length - 4)}`,
        maskedIfscCode: `xx${String(ifsc).slice(String(ifsc).length - 3)}`,
      },
    });

    res.status(httpStatus.CREATED).json();
  } catch (error) {
    console.log('error', error);
    next(error);
  }
};
