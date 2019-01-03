const express = require('express');
const userRoutes = require('./user/user.route');
const postRoutes = require('./post/post.route');
const eventRoutes = require('./event/event.route');
const authRoutes = require('./auth/auth.route');
const followRoutes = require('./follow/follow.route');


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

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/post', postRoutes);
router.use('/event', eventRoutes);
router.use('/follow', followRoutes);


module.exports = router;
