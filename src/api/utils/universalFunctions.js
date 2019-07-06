const fs = require('fs');
const sharp = require('sharp');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const resizeImage = (path, fileType, format, width, height) => {
  console.log('file format', format);
  console.log('path', path);
  const readStream = fs.createReadStream(path);
  const command = ffmpeg();
  if (fileType === 'video') {
    console.log('entered fileType video');
    const output1 = command.input(path);
    const output = readStream.pipe(output1);
    return output;
  }
  // let transform = sharp();
  // console.log('entered fileType video');

  // if (format) {
  //   transform = transform.toFormat(format);
  // }

  // if (width || height) {
  //   transform = transform.resize(width, height);
  // }

  // return readStream.pipe(transform);
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


module.exports = {
  getDifferencePercentage,
  resizeImage,
  toFixTwoIfNeeds,
};
