// const env = require('../env');
// const config = require('../config/appConfig');
// const stripe = require('stripe')(config[env.instance].stripeKey);

// module.exports = {
//   createCustomer: async req =>
//     await stripe.customers.create({
//       description: req.description,
//       email: req.email,
//     }), // Creating stripe customer

//   addCard: async req =>
//     await stripe.customers.createSource(req.customer_id, { source: req.token }),

//   setDefaultCard: async (req) => {
//     console.log('isnide set default card service', req);
//     return await stripe.customers.update(req.customer_id, {
//       default_source: req.card_id,
//     });
//   },

//   deleteCard: async req =>
//     await stripe.customers.deleteCard(req.customer_id, req.card_id),

//   uploadFileOnStripe: async req => await stripe.fileUploads.create(req),

//   createCustomAccount: async req => await stripe.accounts.create(req),

//   updateCustomAccount: async (account_id, updateObj) =>
//     await stripe.accounts.update(account_id, updateObj),

//   retrieveAccountDetails: async account_id => await stripe.accounts.retrieve(account_id),

//   createCharge: async req => await stripe.charges.create(req),

//   createPlan: async req => await stripe.plans.create(req),

//   createTransfers: async req => await stripe.transfers.create(req),

//   createSubscriptions: async req => await stripe.subscriptions.create(req),

//   retrieveInvoice: async req => await stripe.invoices.retrieve(req),

//   retrieveSubscription: async req => await stripe.subscriptions.retrieve(req),

//   retrieveCharge: async req => await stripe.charges.retrieve(req),
// };
