import { Platform } from 'react-native';
import { Config } from '../Config';

const getFileNameFromUrl = url => url.substring(url.lastIndexOf('/') + 1);
const toFixTwoIfNeeds = num => Math.round(num * 100) / 100;

export default {
  getFileNameFromUrl,
  getPluralString(string, number) {
    if (number > 1) {
      return `${string}s`;
    }
    return string;
  },
  topThreeReactions(allReactions) {
    const sortedAllReactions = Object.keys(allReactions).sort((a, b) => allReactions[a] - allReactions[b]);
    const topThreeReactions = [];
    sortedAllReactions.forEach((o) => {
      if (allReactions[o] !== 0 && topThreeReactions.length < 3) {
        topThreeReactions.push(o.replace('Count', ''));
      }
    });
    return topThreeReactions;
  },
  numberToReadable(labelValue) {
    if (!labelValue) {
      return 0;
    }
    // Nine Zeroes for Billions
    if (Math.abs(Number(labelValue)) >= 1.0e+9) {
      return `${toFixTwoIfNeeds(Math.abs(Number(labelValue)) / 1.0e+9)}B`;
    }

    // Six Zeroes for Millions
    if (Math.abs(Number(labelValue)) >= 1.0e+6) {
      return `${toFixTwoIfNeeds(Math.abs(Number(labelValue)) / 1.0e+6)}M`;
    }

    // Three Zeroes for Thousands
    if (Math.abs(Number(labelValue)) >= 1.0e+3) {
      return `${toFixTwoIfNeeds(Math.abs(Number(labelValue)) / 1.0e+3)}K`;
    }

    return toFixTwoIfNeeds(Math.abs(Number(labelValue)));
  },
  isFileVideo: name => name.includes('__vv'),
  getPaddedZero(num) {
    return num < 10 ? `0${num}` : num;
  },

  getHoursIn12(num) {
    const hours = num > 12 ? num - 12 : num;
    return { hours, noonStatus: num > 12 ? 'PM' : 'AM' };
  },

  getFile(id, type = '', forceRefresh = false) {
    let params = '';
    switch (type) {
      case 'avatar':
        params = 'width=200&height=200';
        break;

      default:
        break;
    }

    if (forceRefresh) {
      return encodeURI(`${Config.API_URL}files/${id}?${params}&r=${Math.random() * 100 * Math.random()}`);
    }
    return encodeURI(`${Config.API_URL}files/${id}?${params}`);
  },

  createFormData(photo, fileKeyName, body) {
    const data = new FormData();

    // For multiple files
    if (Array.isArray(photo)) {
      photo.forEach((item) => {
        // [] = For making it for multiple files upload
        data.append(`${fileKeyName}[]`, {
          name: getFileNameFromUrl(item.path),
          type: item.mime,
          uri:
            Platform.OS === 'android' ? item.path : item.path.replace('file://', ''),
        });
      });

    // For single file
    } else {
      data.append(fileKeyName, {
        name: getFileNameFromUrl(photo.path),
        type: photo.mime,
        uri:
          Platform.OS === 'android' ? photo.path : photo.path.replace('file://', ''),
      });
    }

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  },
};
