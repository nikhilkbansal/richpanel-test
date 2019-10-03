const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');

const txTypes = [
  'userToPOCampaign', // user have sent money to a campaign
  'userToDirectPO', // user have sent money directly to ngo,npo etc
  'userToPOShop', // user have sent money to shop of PO
  'platformToPO', // PO=Philanthropy Organization; our platform have sent money to ngo,npo etc
];
const transactionSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId, // Always PO's id
    ref: 'User',
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId, // If money send for campaign
    ref: 'Post',
  },
  amount: Number,
  txStatus: String,
  txData: {},
  txType: {
    type: String,
    trim: true,
    enum: txTypes,
  },
}, {
  timestamps: true,
});

transactionSchema.statics = {
  txTypes,
  add(transaction) {
    return this.create({
      ...transaction,
    });
  },
};

module.exports = mongoose.model('Transaction', transactionSchema);
