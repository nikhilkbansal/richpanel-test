const httpStatus = require('http-status');
const Files = require('./files.model');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const universalFunctions = require('../../utils/universalFunctions');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);


const asyncFsMkdir = Promise.promisify(fs.mkdir);


async function mkDir(folderPath) {
  if (!fs.existsSync(folderPath)) {
    await asyncFsMkdir(folderPath, { mode: '0777', recursive: true });
  }
}

/**
 * Add new file
 *
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const { busboy, user: { id } } = req;
    const recommendVideoExtension = '.mp4';
    const files = [];
    let currentUploadingFile;
    req.pipe(busboy); // Pipe it through busboy
    // req.busboy.on('field', (fieldName, value) => {
    //   console.log('req.body fieldName', fieldName, value);
    //   if (fieldName === 'fileType') {
    //     fileType = value;
    //   }
    // });

    busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
      const fileType = mimetype.includes('video/') ? 'video' : 'image';
      const userData = req.user;
      const folderPath = path.join(__dirname, `../../../../cdn/${userData.id}`);
      console.log('filename', filename);
      let extension = path.extname(filename); // i.e. .png
      extension = extension || '.png';
      const mongoObjectId = `${mongoose.Types.ObjectId()}__${fileType === 'video' ? 'vv' : 'ii'}`;
      currentUploadingFile = mongoObjectId;

      const customeFileName = mongoObjectId + extension;

      await mkDir(path.join(__dirname, '../../../../cdn/')); // make cdn folder if not exists
      await mkDir(folderPath); // make user id based folder in cdn folder if not exist

      const filePath = path.join(folderPath, customeFileName);
      const recommendVideoPath = path.join(folderPath, mongoObjectId + recommendVideoExtension);
      // Create a write` stream of the new file
      const fstream = fs.createWriteStream(filePath);
      // console.log('fstream before compressing', fstream, fileType);

      // Pipe it trough
      file.pipe(fstream);

      // On finish of the upload
      fstream.on('close', async () => {
        console.log('fstream close event has been called');

        if (fileType === 'video') {
          ffmpeg(filePath)
            .size('720x480')
            .on('error', (err) => {
              console.log(`An error occurred: ${err.message}`);
            })
            .on('end', () => {
              fs.unlinkSync(filePath);
              console.log('Processing finished !');
            })
            .save(recommendVideoPath);

          ffmpeg(recommendVideoPath).screenshots({
            timestamps: ['10%'],
            filename: `${mongoObjectId}_thumb.png`,
            folder: folderPath,
          });
        }

        console.log(`'${filename}' is successfully uploaded as ${customeFileName} in ${folderPath}`);

        const addFile = new Files({
          _id: mongoObjectId,
          userId: id,
          isTemp: false,
          // tmpLocation: { type: String },
          fileOriginalName: filename,
          fileType,
          fileSize: 0,
          fileMimeType: mimetype,
          fileExtension: fileType === 'video' ? recommendVideoExtension : extension,
          isVideo: false,
        });
        await addFile.save();
        files.push(addFile);

        // should be run after last file precessed
        if (currentUploadingFile === mongoObjectId) {
          res.status(httpStatus.CREATED);
          res.json(files);
        }
      });


      // busboy.on('finish', () => {
      //   console.log('finish event has been called');
      //   res.status(httpStatus.CREATED);
      //   res.json(files);
      // });
    });
  } catch (e) {
    next(e);
  }
};

exports.getFile = async (req, res, next) => {
  try {
    const {
      query: {
        width, height, format, videoThumb,
      },
    } = req;
    const { params: { _id } } = req;
    const file = await Files.findOne({ _id });
    if (!file) {
      res.type('image/png');
      fs.createReadStream(path.join(__dirname, '../../../../assets/default/defaultImage.jpg')).pipe(res);
    } else {
      let fileFolderWithPath = `../../../../cdn/${file.userId}/${file._id}${file.fileExtension}`;
      if (videoThumb && file.fileType !== 'image') {
        fileFolderWithPath = `../../../../cdn/${file.userId}/${file._id}_thumb.png`;
      }

      const filePath = path.join(__dirname, fileFolderWithPath);

      if (!fs.existsSync(filePath)) {
        res.type('image/png');
        fs.createReadStream(path.join(__dirname, '../../../../assets/default/defaultImage.jpg')).pipe(res);
        return;
      }

      if (file.fileType === 'image') {
      // Set the content-type of the response
        res.type(`image/${format || 'png'}`);

        // Get the re sized image
        universalFunctions.resizeImage(filePath, format, Number(width), Number(height)).pipe(res);
      } else {
      // handle video. see here to know more https://medium.com/@daspinola/video-stream-with-node-js-and-html5-320b3191a6b6
        const stat = fs.statSync(filePath);
        const fileSize = stat.size;
        const { range } = req.headers;
        console.log('range', range);
        if (range) {
          const parts = range.replace(/bytes=/, '').split('-');
          const start = parseInt(parts[0], 10);
          const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1;

          const chunksize = (end - start) + 1;
          const fileStream = fs.createReadStream(filePath, { start, end });
          const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
          };

          res.writeHead(206, head);
          fileStream.pipe(res);
        } else { // first time
          const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
          };
          res.writeHead(200, head);
          fs.createReadStream(filePath).pipe(res);
        }
      }
    }
  } catch (e) {
    next(e);
  }
};


exports.getVideo = async (req, res, next) => {
  try {
    const { query: { width, height, format } } = req;
    const { params: { _id } } = req;

    // const file = await Files.findOne({ _id });
    // console.log('file********** & format', file, format, width, height);
    // const imagePath = `../../../../cdn/${file.userId}/${file._id}${file.fileExtension}`;

    // // Set the content-type of the response
    // res.type(`image/${format || 'png'}`);

    // const filePath = path.join(__dirname, imagePath);
    // // Get the re sized image
    // universalFunctions.resizeImage(filePath, format, Number(width), Number(height)).pipe(res);

    const video = await Files.findOne({ _id });
    const videoPath = `../../../../cdn/${video.userId}/${video._id}${video.fileExtension}`;
    console.log('videoPath', videoPath);
    const filePath = path.join(__dirname, videoPath);

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const { range } = req.headers;
    console.log('range', range);
    if (range) {
      console.log('running if');

      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize - 1;

      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      console.log('running else');
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  } catch (e) {
    next(e);
  }
};

