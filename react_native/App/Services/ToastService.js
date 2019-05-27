import Toast from 'react-native-tiny-toast';
import Colors from '../Theme/Colors';

export default (msg = '') => {
  Toast.show(msg, { maskColor: Colors.font.shadyLady });
};
