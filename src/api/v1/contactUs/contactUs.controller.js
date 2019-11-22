const httpStatus = require('http-status');
const ContactUs = require('./contactUs.model');

exports.post = async (req, res, next) => {
  try {
    const { user } = req;

    const commentSaved = new ContactUs({ ...req.body, userId: user._id });
    await commentSaved.save();
    res.status(httpStatus.CREATED);
    res.json();
  } catch (error) {
    next(error);
  }
};
