import { StyleSheet } from 'react-native';
import Colors from 'App/Theme/Colors';
import ApplicationStyles from 'App/Theme/ApplicationStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ApplicationStyles.primaryColor.color,
  },
  logo: {
    width: wp('20%'),
    height: wp('20%'),
  },
  logoContainer: {
    marginTop: hp('1%'),
    marginHorizontal: wp('3%'),
    padding: 10,
    alignItems: 'center',
  },
  subContainer: {
    marginHorizontal: wp('3%'),
    backgroundColor: '#FFFFFF',
    padding: 10,
    flex: 1,
  },
  buttonStyle: { marginRight: 2, flex: 1, height: hp('6%') },
});
