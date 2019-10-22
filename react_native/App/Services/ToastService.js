import Toast from 'react-native-tiny-toast';
import Colors from '../Theme/Colors';

export default (msg = '', duration = 1500) => {
  Toast.show(msg, { maskColor: Colors.font.shadyLady, duration });
};
