const httpStatus = require('http-status');
const User = require('../user/user.model');
const Event = require('../event/event.model');
const Interested = require('./interested.model');
const APIError = require('../../utils/APIError');


/**
 * Mark 'interested in' or 'not interested in' for a event
 */
exports.toggleInterested = async (req, res, next) => {
  try {
    const { isInterested, eventId } = req.body;
    const { user } = req;

    const event = await Event.findOne(eventId);

    if (!event) {
      throw new APIError({ message: 'No event found' });
    }

    if (isInterested) {
      event.interestedIn += 1;
      Interested.add(user.id, eventId);
    } else {
      event.interestedIn -= 1;
      Interested.remove(user.id, eventId);
    }
    await event.save();

    res.status(httpStatus.OK);
    return res.json();
  } catch (error) {
    return next(User.checkDuplicateEmail(error));
  }
};

