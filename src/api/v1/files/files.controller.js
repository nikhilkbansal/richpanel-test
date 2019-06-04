const httpStatus = require('http-status');
const Files = require('./files.model');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const universalFunctions = require('../../utils/universalFunctions');
const ffmpeg = require('fluent-ffmpeg');

const command = ffmpeg();


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
    console.log('req.body', req.body);
    let fileType;
    req.pipe(busboy); // Pipe it through busboy
    req.busboy.on('field', (fieldName, value) => {
      console.log('req.body fieldName', fieldName, value);
      if (fieldName === 'fileType') {
        fileType = value;
      }
    });
    busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
      const userData = req.user;
      const folderPath = path.join(__dirname, `../../../../cdn/${userData.id}`);
      console.log('filename', filename);
      let extension = path.extname(filename); // i.e. .png
      extension = extension || '.png';
      const mongoObjectId = mongoose.Types.ObjectId();
      const customeFileName = mongoObjectId + extension;

      await mkDir(path.join(__dirname, '../../../../cdn/')); // make cdn folder if not exists
      await mkDir(folderPath); // make user id based folder in cdn folder if not exist
      const filePath = path.join(folderPath, customeFileName);
      // Create a write` stream of the new file
      let fstream = fs.createWriteStream(filePath);
      console.log('fstream before compressing', fstream, fileType);

      // Pipe it trough
      file.pipe(fstream);

      // On finish of the upload
      fstream.on('close', async () => {
        if (fileType === 'video') {
          fstream = command.input(filePath);
          console.log('fstream after compressing', fstream);
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
          fileExtension: extension,
          isVideo: false,
        });
        await addFile.save();

        res.status(httpStatus.CREATED);
        res.json(addFile);
      });
    });
  } catch (e) {
    next(e);
  }
};

exports.getImage = async (req, res, next) => {
  try {
    const { query: { width, height, format } } = req;
    const { params: { _id } } = req;

    const file = await Files.findOne({ _id });
    console.log('file********** & format', file, format, width, height);
    const imagePath = `../../../../cdn/${file.userId}/${file._id}${file.fileExtension}`;

    // Set the content-type of the response
    res.type(`image/${format || 'png'}`);

    const filePath = path.join(__dirname, imagePath);
    // Get the re sized image
    universalFunctions.resizeImage(filePath, format, Number(width), Number(height)).pipe(res);
  } catch (e) {
    next(e);
  }
};
