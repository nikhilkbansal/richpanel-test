const { generateOrderId } = require('../../../utils/universalFunctions');
const CashFree = require('./../../../services/cashFreeProviders');
const APIError = require('../../../utils/APIError');
const httpStatus = require('http-status');
const Transaction = require('./transaction.model');

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
    const {
      postId, orderId, txType, amount,
    } = req.body;

    const orderDetail = await CashFree.getOrderDetails({
      orderIdss: 34,
    });

    console.log('order', orderDetail);
    // details


    // order { details:
    //   { orderId: 'INCWYW1570021316',
    //     orderCurrency: 'INR',
    //     orderAmount: '500.00',
    //     orderNote: 'This is an order note',
    //     customerName: 'John',
    //     customerPhone: '1234561234',
    //     sellerPhone: '',
    //     orderStatus: 'ACTIVE',
    //     addedOn: '2019-10-02 18:31:58' },
    //  status: 'OK' }


    res.json();
    return;
    const transaction = await Transaction.add({
      senderId: '',
      receiverId: '',
      amount,
      txStatus: '',
      txData: {

      },
      txType: '',
    });
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

