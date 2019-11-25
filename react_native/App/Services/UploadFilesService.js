import httpClient from './HttpRequestService';
import CommonFunctions from '../Utils/CommonFunctions';


/**
 * Upload files without saga
 *
 * @param {*} files array of files or single file object
 * @param {*} extra extra fileds send to file upload api
 */
async function UploadFiles(files, extra = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = CommonFunctions.createFormData(files, 'file', extra);
      const result = await httpClient({
        method: 'post',
        data: formData,
        url: 'files',
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

export default UploadFiles;
