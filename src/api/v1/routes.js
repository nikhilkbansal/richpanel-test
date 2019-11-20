const express = require('express');
const userRoutes = require('./user/user.route');
const postRoutes = require('./post/post.route');
const eventRoutes = require('./event/event.route');
const authRoutes = require('./auth/auth.route');
const followRoutes = require('./follow/follow.route');
const fileRoutes = require('./files/files.route');
const commentRoutes = require('./comment/comment.route');
const searchRoutes = require('./search/search.route');
const reactionRoutes = require('./reaction/reaction.route');
const payURoutes = require('./payment/payUMoney/payU.route');
const transactionRoutes = require('./payment/transaction/transaction.route');
const cashFreeRoutes = require('./payment/cashFree/cashFree.route');
const subscriptionRoutes = require('./payment/subscription/subscription.route');
const tagRoutes = require('./tag/tag.route');
const shareRoutes = require('./share/share.route');
const contactUsRoutes = require('./contactUs/contactUs.route');


const router = express.Router();

/**
 * GET v1/status
 */
router.get(
  '/status',


  (req, res) => res.send('OK'),
);

router.get('/v2/:params', (req, res, n) => { console.log('req', req.headers.host, req.url, req.method); n(); });

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/share', shareRoutes);
router.use('/auth', authRoutes);
router.use('/post', postRoutes);
router.use('/event', eventRoutes);
router.use('/follow', followRoutes);
router.use('/files', fileRoutes);
router.use('/comment', commentRoutes);
router.use('/reaction', reactionRoutes);
router.use('/payment/payU', payURoutes);
router.use('/payment/cashFree', cashFreeRoutes);
router.use('/payment/transaction', transactionRoutes);
router.use('/payment/subscription', subscriptionRoutes);
router.use('/search', searchRoutes);
router.use('/tag', tagRoutes);
router.use('/contactUs', contactUsRoutes);

module.exports = router;
