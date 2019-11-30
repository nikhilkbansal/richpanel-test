const { generateOrderId } = require('../../../utils/universalFunctions');
const CashFree = require('./../../../services/cashFreeProviders');
const Post = require('./../../post/post.model');
const Subscription = require('./../subscription/subscription.model');
const APIError = require('../../../utils/APIError');
const httpStatus = require('http-status');
const _ = require('lodash');
const moment = require('moment');
const { Transaction, Beneficiary } = require('../transaction/transaction.model');
const notification = require('../../notification/notification.controller');

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

    const post = await Post.findById(postId);
    const orderDetail = await CashFree.getOrderDetails({
      orderId,
    });

    if (txType === 'userToPOCampaign') {
      console.log('chlaa');
      await Post.updateRaisedMoney(postId, parseFloat(orderDetail.details.orderAmount));
    }

    const txn = await Transaction.add({
      senderId: user._id,
      postId: postId || null,
      receiverId: receiverId || post.userId,
      amount: parseFloat(orderDetail.details.orderAmount),
      txStatus: _.camelCase(orderDetail.details.orderStatus),
      txData: JSON.parse(JSON.parse(txData)),
      txType,
    });

    await notification.sendNotification({
      type: 'newDonation',
      receiverId: receiverId || post.userId,
      senderId: user._id,
      donationAmount: parseFloat(orderDetail.details.orderAmount),
      meta: {
        transactionId: txn._id,
        postId: postId || null,
      },
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

    await notification.sendNotification({
      type: 'newRecurringDonation',
      receiverId: poId,
      senderId: user._id,
      donationAmount: parseFloat(amount),
      meta: {
        paymentSubscriptionId: subscription._id,
      },
    });

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

exports.getPayoutBeneficiary = async (req, res, next) => {
  try {
    const { user } = req;
    const bank = await Beneficiary.findOne({
      userId: user._id,
      status: 'active',
    });

    if (!bank) {
      res.json(null);
      return;
    }
    const authorizePayout = await CashFree.authorizePayout();

    const beneficiary = await CashFree.getBeneficiary(bank.beneId, {
      Authorization: `Bearer ${authorizePayout.data.token}`,
    });

    bank.bankStatus = beneficiary.status;
    await bank.save();

    res.json(bank);
  } catch (error) {
    console.log('error', error);
    next(error);
  }
};

exports.removePayoutBeneficiary = async (req, res, next) => {
  try {
    const { bankId } = req.body;

    const bank = await Beneficiary.findOne({
      _id: bankId,
      status: 'active',
    });
    if (!bank) {
      throw new APIError({ message: 'Bank not found' });
    }

    const authorizePayout = await CashFree.authorizePayout();

    await CashFree.removeBeneficiary({ beneId: bank.beneId }, {
      Authorization: `Bearer ${authorizePayout.data.token}`,
    });

    bank.status = 'inactive';
    await bank.save();
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

    const bank = await Beneficiary.add({
      beneId,
      userId: user._id,
      accountDetails: {
        maskedAccountNumber: `xxxxxxxxxx${String(bankAccount).slice(String(bankAccount).length - 4)}`,
        maskedIfscCode: `xx${String(ifsc).slice(String(ifsc).length - 3)}`,
      },
      bankStatus: 'PENDING',
    });

    res.status(httpStatus.CREATED).json(bank);
  } catch (error) {
    console.log('error', error);
    next(error);
  }
};


exports.requestTransfer = async (req, res, next) => {
  try {
    const { user } = req;
    const { amount } = req.body;
    const bene = await Beneficiary.findOne({ userId: user.id, status: 'active' });
    const authorizePayout = await CashFree.authorizePayout();
    const transferId = generateOrderId();

    const response = await CashFree.requestTransfer({
      beneId: bene.beneId,
      amount,
      transferId,
      remarks: `${user.id} amount ${amount}`,
    }, {
      Authorization: `Bearer ${authorizePayout.data.token}`,
    });

    const txn = await Transaction.add({
      receiverId: user._id,
      amount: parseFloat(amount),
      txStatus: response.status,
      txData: JSON.parse(JSON.parse(response)),
      txType: 'platformToPO',
    });
    res.json(txn);
  } catch (error) {
    console.log('error', error);
    next(error);
  }
};
