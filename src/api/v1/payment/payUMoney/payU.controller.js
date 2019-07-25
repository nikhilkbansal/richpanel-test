const uuidv4 = require('uuid/v4');

const payUProvider = require('./../../../services/payUProviders');

// payUProvider.makePayment().then(s => console.log(s)).catch(s => console.log(s));
exports.makePayment = async (req, res, next) => {
  try {
    const txnid = uuidv4();
    // save the txnid to db for the particular user
    const url = await payUProvider.makePayment({ ...req.body, txnid });
    res.json({ url });
  } catch (error) {
    next(error);
  }
};

exports.paymentResponse = async (req, res, next) => {
  try {
    // get the txnid from the db using the user token
    const paymentResponse = await payUProvider.paymentResponse(req.body);
    console.log('paymentResponse', paymentResponse);
  } catch (error) {
    next(error);
  }
};

exports.refundPayment = async (req, res, next) => {
  try {
    const txnid = uuidv4();
    // get the paymentId from db and amount from frontend
    // save the txnid to db for the particular user
    const paymentResponse = await payUProvider.refundPayment(req.body);
    console.log('paymentResponse', paymentResponse);
  } catch (error) {
    next(error);
  }
};
exports.refundStatus = async (req, res, next) => {
  try {
    const txnid = uuidv4();
    // get the paymentId from db and amount from frontend
    // save the txnid to db for the particular user
    const paymentResponse = await payUProvider.refundStatus(req.body);
    console.log('paymentResponse', paymentResponse);
  } catch (error) {
    next(error);
  }
};
