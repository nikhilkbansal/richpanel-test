const  { twitter } = require('../../services/twitterProviders');

exports.getUserInfo = async (req, res, next) => {
  try {
    const { user } = req;
    const data = await twitter({
      access_token: user.oauth_token,
      access_token_secret: user.oauth_token_secret,
    }).getUserInfo();
    let userInfo = {};
    if (data && data.data && data.data.name) {
      userInfo = { name: data.data.name };
    }
    return res.json(userInfo);
  } catch (error) {
    return next();
  }
};

exports.getTweets = async (req, res, next) => {
  try {
    const { user } = req;
    const data = await twitter({
      access_token: user.oauth_token,
      access_token_secret: user.oauth_token_secret,
    }).mentionTweets();
    return res.json(data.data);
  } catch (error) {
    return next();
  }
};

exports.postReplies = async (req, res, next) => {
  try {
    const { user } = req;
    const { status, inReplyToStatusId } = req.body;
    const data = await twitter({
      access_token: user.oauth_token,
      access_token_secret: user.oauth_token_secret,
    }).postReplies({ in_reply_to_status_id: inReplyToStatusId, status });

    return res.json(data.data);
  } catch (error) {
    return next();
  }
};
