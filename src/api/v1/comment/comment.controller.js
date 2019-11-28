const httpStatus = require('http-status');
// const { omit } = require('lodash');
const Comment = require('./comment.model');
const User = require('../user/user.model');
const Post = require('../post/post.model');
const Event = require('../event/event.model');
const Reaction = require('../reaction/reaction.model');
const notification = require('../notification/notification.controller');
// const APIError = require('../../utils/APIError');
// const { sendMail } = require('../../services/mailProviders');
// const uuidv4 = require('uuid/v4');


exports.post = async (req, res, next) => {
  try {
    const { user } = req;
    const { repliedTo } = req.body;
    const commentSaved = new Comment({ ...req.body, userId: user._id });

    await commentSaved.save();
    const commentObject = commentSaved.toObject();

    const item = commentSaved.itemType === 'event'
      ? await Event.findOne({ _id: commentSaved.itemId })
      : await Post.findOne({ _id: commentSaved.itemId });

    await notification.sendNotification({
      type: repliedTo ? 'newCommentReply' : 'newComment',
      receiverId: item.userId,
      senderId: user._id,
      meta: {
        postId: commentSaved.itemType === 'post' ? commentSaved.itemId : undefined,
        eventId: commentSaved.itemType === 'event' ? commentSaved.itemId : undefined,
        commentId: commentObject._id,
      },
    });

    res.status(httpStatus.CREATED);
    res.json({
      ...commentObject,
      userId: { name: user.name, picture: user.picture, _id: user._id },
      isAvailbleReplies: false,
      howUserReacted: false,
    });
  } catch (error) {
    next(error);
  }
};


exports.likeUnlike = async (req, res, next) => {
  try {
    const { user } = req;
    const {
      _id,
      isLiked,
    } = req.body;

    await Reaction.addReaction({
      reaction: 'like', userId: user._id, itemId: _id, itemType: 'comment',
    });

    await Comment.updateLikes(
      _id,
      isLiked,
    );

    res.status(httpStatus.CREATED);
    res.json();
  } catch (error) {
    next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const { user } = req;
    const {
      itemId,
      repliedTo,
      itemType,
    } = req.query;
    let repliesResults = [];
    const repliedToCondition = repliedTo || { $exists: false };
    const commentList = await Comment.list({ ...req.query, repliedTo: repliedToCondition });
    const resultedComments = await Promise.map(commentList, async (comment) => {
      const howUserReacted = await Reaction.howUserReacted(user._id, comment._id, 'comment');
      let replies = [];
      let isAvailbleReplies = false;
      if (!repliedTo) {
        replies = await Comment.list({
          itemId,
          repliedTo: comment._id,
          itemType,
          perPage: 2,
        }, { createdAt: -1 });
        isAvailbleReplies = replies.length === 2;

        repliesResults = await Promise.map(replies.slice(0, 1), async (reply) => {
          const howUserReactedReply = await Reaction.howUserReacted(user._id, reply._id, 'comment');
          return {
            ...reply.toObject(),
            howUserReacted: howUserReactedReply,
          };
        });
      }
      return {
        replies: repliesResults,
        isAvailbleReplies,
        ...comment.toObject(),
        howUserReacted,
      };
    });

    res.json(resultedComments);
  } catch (error) {
    next(error);
  }
};


exports.remove = async (req, res, next) => {
  const { commentId } = req.query;
  const comment = await Comment.findById(commentId);
  comment.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(error => next(error));
};
