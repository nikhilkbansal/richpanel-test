const express = require('express');
const authRoutes = require('./auth/auth.route');
const twitterRoutes = require('./twitter/twitter.route');


const router = express.Router();

/**
 * GET v1/status
 */
router.get(
  '/status',
  (req, res) => res.send('OK'),
);


/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/auth', authRoutes);
router.use('/twitter', twitterRoutes);

module.exports = router;
