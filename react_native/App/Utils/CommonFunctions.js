import { Platform } from 'react-native';
import { Config } from '../Config';
import HttpClient from '../Sagas/HttpClient';

export default {
  httpClient: HttpClient,
  getPaddedZero(num) {
    return num < 10 ? `0${num}` : num;
  },

  getHoursIn12(num) {
    const hours = num > 12 ? num - 12 : num;
    return { hours, noonStatus: num > 12 ? 'PM' : 'AM' };
  },

  getFile(id) {
    console.log(`${Config.API_URL}files/${id}`);
    return `${Config.API_URL}files/${id}`;
  },
  createFormData(photo, fileKeyName, body) {
    const data = new FormData();

    data.append(fileKeyName, {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  },
};
