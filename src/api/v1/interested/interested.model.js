const mongoose = require('mongoose');
const APIError = require('../../utils/APIError');
const httpStatus = require('http-status');

/**
 * Interested Schema
 * @private
 */
const interestedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true,
});

interestedSchema.statics = {
  // interested
  async add(userId, eventId) {
    const event = await this.findOne({ userId, eventId, isActive: true });
    if (event) {
      throw new APIError({
        message: 'User is already marked as "interested in"',
      });
    }

    return this.create({ userId, eventId });
  },
  // not interested
  async remove(userId, eventId) {
    const event = await this.findOne({ userId, eventId, isActive: true });
    if (!event) {
      throw new APIError({
        message: 'User is already marked as "not interested in"',
        status: httpStatus.NOT_FOUND,
      });
    }

    event.isActive = false;
    const updatedEvent = await event.save();
    return updatedEvent;
  },
};

/**
 * @typedef Interested
 */
const Interested = mongoose.model('Interested', interestedSchema);
module.exports = Interested;
