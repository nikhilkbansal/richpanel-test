import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from './Colors';
import FontSizes from './FontSizes';
import Fonts from './Fonts';

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

  commonBorderRadius: width => width / 33,
  primaryColor: {
    color: Colors.font.summerSky,
  },
  warningColor: {
    color: Colors.font.cinnabar,
  },
  disabledColor: {
    color: Colors.font.shadyLady,
  },
  headline: {
    color: Colors.font.blackRussian,
    fontSize: FontSizes.h1,
    fontFamily: Fonts.bold,
  },
  subHeadline: {
    color: Colors.font.slateGrey,
    fontSize: FontSizes.h5,
    fontFamily: Fonts.thin,
  },
  textInputLabel: {
    color: Colors.font.slateGrey,
    fontSize: FontSizes.h9,
    fontFamily: Fonts.light,
  },
  textInputValue: {
    color: Colors.font.blackRussian,
    fontSize: FontSizes.h4,
    fontFamily: Fonts.bold,
  },
  button: {
    textAlign: 'center',
    color: Colors.font.white,
    fontSize: FontSizes.h6,
    fontFamily: Fonts.bold,
  },
  body: {
    textAlign: 'center',
    color: Colors.font.blackRussian,
    fontSize: FontSizes.h7,
    fontFamily: Fonts.light,
  },
  info: {
    fontSize: FontSizes.h4,
    color: Colors.font.greyChateau,
    fontFamily: Fonts.light,
  },
};
