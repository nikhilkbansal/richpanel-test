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
  iconSize: wp('7%'),

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
  darkColor: {
    color: Colors.icon.nero,
  },
  lightColor: {
    color: Colors.font.white,
  },
  lightBackgkround: {
    color: Colors.backgkround.whiteSmoke,
  },
  grayishBackground: {// 2 hours ago, md-more
    color: Colors.backgkround.grayish,
  },
  headline: {
    color: Colors.font.blackRussian,
    fontSize: FontSizes.h1,
    fontFamily: Fonts.bold,
  },
  headline2: {
    color: Colors.font.blackRussian,
    fontSize: FontSizes.h1,
    fontFamily: Fonts.light,
  },
  headline3: {
    color: Colors.font.nero,
    fontSize: FontSizes.h3,
    fontFamily: Fonts.medium,
  },
  subHeadline: {
    color: Colors.font.slateGrey,
    fontSize: FontSizes.h5,
    fontFamily: Fonts.thin,
  },
  subHeadline2: {
    color: Colors.font.slateGrey,
    fontSize: FontSizes.h7,
    fontFamily: Fonts.light,
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
  body2: {
    color: Colors.font.black,
    fontSize: FontSizes.h6,
    fontFamily: Fonts.light,
    lineHeight: FontSizes.h6 * 1.5,
  },
  body3: {
    color: Colors.font.slateGrey,
    fontSize: FontSizes.h6,
    fontFamily: Fonts.light,
    lineHeight: FontSizes.h6 * 1.5,
  },
  info: {
    fontSize: FontSizes.h4,
    color: Colors.font.greyChateau,
    fontFamily: Fonts.light,
  },
  info1: {
    fontSize: FontSizes.h5,
    color: Colors.font.shadyLady,
    fontFamily: Fonts.light,
  },
  info3: {
    fontSize: FontSizes.h5,
    color: Colors.font.nero,
    fontFamily: Fonts.light,
  },
  link: {
    fontSize: FontSizes.h5,
    color: Colors.font.summerSky,
    fontFamily: Fonts.medium,
  },
  primaryInfo: {
    fontSize: FontSizes.h2,
    color: Colors.font.summerSky,
    fontFamily: Fonts.light,
  },
  info2: {
    fontSize: FontSizes.h4,
    color: Colors.font.slateGrey,
    fontFamily: Fonts.light,
  },

  avatarTitle: {
    fontSize: FontSizes.h4,
    color: Colors.font.black,
    fontFamily: Fonts.medium,
  },
  avatarSubtitle: {
    fontSize: FontSizes.h8,
    color: Colors.font.black,
    fontFamily: Fonts.light,
  },
  bodyHeading: {
    fontSize: FontSizes.h9,
    color: Colors.font.charcoal,
    fontFamily: Fonts.medium,
  },
  bodySubHeading: {
    fontSize: FontSizes.h9,
    color: Colors.font.slateGrey,
    fontFamily: Fonts.light,
  },
};
