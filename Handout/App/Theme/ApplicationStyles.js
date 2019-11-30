import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {material, human} from 'react-native-typography';
import Colors from './Colors';
import FontSizes from './FontSizes';
import Fonts from './Fonts';

let primaryColor = Colors.font.Pelorous;
let darkColor = Colors.font.nero;
let grayColor = Colors.font.slateGrey;
let lightGrayColor = Colors.font.shadyLady;

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
  listItemsSpace: hp('0.5%'),
  commonBorderRadius: width => width / 33,

  // Elevations
  elevationS: {
    elevation: 1,
  },
  elevationM: {
    elevation: 2,
  },
  elevationL: {
    elevation: 3,
  },
  elevationXL: {
    elevation: 5,
  },
  elevationXLL: {
    elevation: 8,
  },
  // Font/icons colors
  primaryColor: {
    color: primaryColor,
  },
  warningColor: {
    color: Colors.font.cinnabar,
  },
  disabledColor: {
    color: lightGrayColor,
  },
  darkColor: {
    color: darkColor,
  },

  // Reactions colors
  lightColor: {
    color: Colors.font.white,
  },
  loveColor: {
    color: Colors.font.sunsetOrange,
  },
  celebrateColor: {
    color: Colors.font.persianPlum,
  },
  insightFulColor: {
    color: Colors.font.ronchi,
  },
  sadColor: {
    color: Colors.font.tide,
  },

  // Background colors
  smokeBackground: {
    //main background
    color: Colors.backgkround.whiteSmoke,
  },
  lightBackground: {
    color: Colors.backgkround.white,
  },
  grayishBackground: {
    // 2 hours ago, md-more, grey bg on smokeBackground
    color: Colors.backgkround.grayish,
  },
  primaryBackground: {
    color: primaryColor,
  },

  //  login,signup,forget page titles
  headline: {
    color: darkColor,
    fontSize: FontSizes.h1,
    fontFamily: Fonts.bold,
  },

  // Post,event titles
  headline2: {
    color: darkColor,
    fontSize: FontSizes.h3,
    fontFamily: Fonts.medium,
  },

  //Header titles
  headline3: {
    color: darkColor,
    fontSize: FontSizes.h3,
    fontFamily: Fonts.medium,
  },

  //Login,forgetPass, signup subheadlines like: Let's take first step
  subHeadline: {
    color: grayColor,
    fontSize: FontSizes.h5,
    fontFamily: Fonts.medium,
  },

  // Textinput label, fake textinput's label like datepicker, location picker
  textInputLabel: {
    color: grayColor,
    fontSize: FontSizes.h9,
    fontFamily: Fonts.medium,
  },

  // Textinput value, fake textinput's value like datepicker, location picker
  textInputValue: {
    color: darkColor,
    fontSize: FontSizes.h4,
    fontFamily: Fonts.bold,
  },

  // Button
  button: {
    textAlign: 'center',
    color: Colors.font.white,
    fontSize: FontSizes.h4,
    fontFamily: Fonts.medium,
  },

  // Popup menus, goto next page menus
  button2: {
    textAlign: 'center',
    fontSize: FontSizes.h5,
    fontFamily: Fonts.medium,
    color: grayColor,
  },

  // TODO: remove from dropdownlists from AdditionPayment and selectpaymentmethod
  body: {
    color: darkColor,
    fontSize: FontSizes.h5,
    fontFamily: Fonts.medium,
  },

  // Todo: Adjust/remove On Location Selector, for google autocomple
  body2: {
    color: darkColor,
    fontSize: FontSizes.h5,
    fontFamily: Fonts.medium,
    lineHeight: FontSizes.h6 * 1.5,
  },

  // Post,event description, add eventpost desc, Todo: Remove from comment page: view all, likes etc
  body3: {
    color: grayColor,
    fontSize: FontSizes.h5,
    fontFamily: Fonts.medium,
    lineHeight: FontSizes.h6 * 1.5,
  },

  // Info on login like: Don't have an account?
  info: {
    fontSize: FontSizes.h4,
    color: grayColor,
    fontFamily: Fonts.medium,
  },

  // Profile username, ngo profile userName adjust style
  info1: {
    fontSize: FontSizes.h5,
    color: lightGrayColor,
    fontFamily: Fonts.medium,
  },

  // Post, event raised money
  info2: {
    fontSize: FontSizes.h4,
    color: grayColor,
    fontFamily: Fonts.medium,
  },

  // Todo check this
  // Comment user Name, on AddpostAddEvent Fill below section if you are..,
  // Cancel reply,  NgoProfile.js: Tabs,  followers count
  // Profile: Email of user, My posts:  Why do we do?
  info3: {
    fontSize: FontSizes.h5,
    color: darkColor,
    fontFamily: Fonts.medium,
  },

  // NgoProfile: Follow, donate
  // Profile: See all, Logout
  link: {
    fontSize: FontSizes.h5,
    color: primaryColor,
    fontFamily: Fonts.medium,
  },

  // PostUi Campaign goal money
  primaryInfo: {
    fontSize: FontSizes.h2,
    color: primaryColor,
    fontFamily: Fonts.medium,
  },

  // Drawer menu items
  primaryInfo2: {
    fontSize: FontSizes.h3,
    color: primaryColor,
    fontFamily: Fonts.medium,
  },

  // avtar user names,
  // Profile My Posts
  // Search page: ngo names, searched post titles
  // SeeAllSearxh:  Ngo names
  avatarTitle: {
    fontSize: FontSizes.h4,
    color: darkColor,
    fontFamily: Fonts.medium,
  },

  // ago on post event UIs, followers on search page
  avatarSubtitle: {
    fontSize: FontSizes.h8,
    color: darkColor,
    fontFamily: Fonts.medium,
  },

  // No uses
  // bodyHeading: {
  //   fontSize: FontSizes.h9,
  //   color: grayColor,
  //   fontFamily: Fonts.medium,
  // },

  // event uis, post ui dates
  // payment success message
  bodySubHeading: {
    fontSize: FontSizes.h9,
    color: grayColor,
    fontFamily: Fonts.medium,
  },

  // shares and likes(reactions) counts on event ui, post ui
  bodySubHeading2: {
    fontSize: FontSizes.h9,
    color: darkColor,
    fontFamily: Fonts.medium,
  },

  // tab labels, reactions labels
  tabLabelStyle: {
    fontSize: FontSizes.h14,
    color: grayColor,
    fontFamily: Fonts.bold,
  },
  material: {
    ...material,
  },
  fontStyles: {
    display4: {
      ...material.display4,
    },
    display3: {
      ...material.display3,
    },
    display2: {
      ...material.display2,
    },
    display1: {
      ...material.display1,
    },
    headline: {
      ...material.headline,
    },
    subheading: {
      ...material.subheading,
    },
    title: {
      ...material.title,
    },
    body2: {
      ...material.body2,
    },
    body1: {
      ...material.body1,
    },
    caption: {
      ...material.caption,
    },
    button: {
      ...material.button,
      textAlign: 'center',
    },
  },
};
