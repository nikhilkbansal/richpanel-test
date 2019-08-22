const httpStatus = require('http-status');
const Tag = require('./tag.model');


/**
 * Search tag
 */
exports.list = async (req, res, next) => {
  try {
    const { tag } = req.query;
    const tags = await Tag.list({ tag });
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

/**
 * Add tag
 */
exports.add = async (req, res, next) => {
  try {
    const { tag } = req.body;
    await Tag.add(tag);
    res.status(httpStatus.CREATED).json();
  } catch (error) {
    next(error);
  }
};

