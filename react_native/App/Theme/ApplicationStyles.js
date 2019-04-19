import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default {
  // deprecated
  screen: {
    container: {
      flex: 1,
    },
  },
  viewMarginHorizontal: wp('3%'),
  headerBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },

  // new
  iconSize: 35,

};
