const fs = require('fs');
const sharp = require('sharp');
const moment = require('moment-timezone');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const resizeImage = (path, format, width, height) => {
  const readStream = fs.createReadStream(path);
  let transform = sharp();

  if (format) {
    transform = transform.toFormat(format);
  }

  if (width || height) {
    transform = transform.resize(width, height);
  }

  return readStream.pipe(transform);
};


const toFixTwoIfNeeds = num => Math.round(num * 100) / 100;


/**
 * Calculates in percent, the change between 2 numbers.
 * e.g from 1000 to 500 = 50%
 *
 * @param newNumber The value that changed
 * @param oldNumber The initial value
 */
const getDifferencePercentage = (newNumber, oldNumber) => {
  const decreaseValue = newNumber - oldNumber;
  const result = (decreaseValue / oldNumber) * 100;
  if (result === 0 || isNaN(result)) return '0%'; // eslint-disable-line no-restricted-globals
  return result > 0 ? `+${toFixTwoIfNeeds(result)}%` : `${toFixTwoIfNeeds(result)}%`;
};

function randomString(length = 4) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


const generateOrderId = () => `IN${randomString()}${moment().unix()}`;

module.exports = {
  getDifferencePercentage,
  resizeImage,
  toFixTwoIfNeeds,
  generateOrderId,
};
