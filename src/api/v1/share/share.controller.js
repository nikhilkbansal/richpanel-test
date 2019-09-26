const httpStatus = require('http-status');
const Share = require('./share.model');


/**
 * Add share to database.
 * @public
 */
exports.add = async (req, res, next) => {
  try {
    const { user } = req;
    const { itemId, itemType } = req.body;
    await Share.addShare({
      itemType,
      itemId,
      userId: user._id,
    });
    res.status(httpStatus.CREATED);
    res.json();
  } catch (error) {
    next(error);
  }
};

