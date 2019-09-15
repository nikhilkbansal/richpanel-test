import * as React from 'react';
import {
  View, DatePickerAndroid, TimePickerAndroid, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from './Icon';
import Text from './Text';
import {
  Colors, ApplicationStyles,
} from '../Theme';
import { CommonFunctions } from '../Utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    backgroundColor: ApplicationStyles.smokeBackground.color,
    borderRadius: wp('5%') / 2,
    width: wp('5%'),
    height: wp('5%'),
    padding: wp('0.9%'),
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
});


class ReactionsGot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <View style={[styles.container]}>
        <Icon iconFamily="AntDesign" name="like1" size={wp('2.7%')} color={ApplicationStyles.primaryColor.color} style={styles.iconStyle} />
        <Icon iconFamily="AntDesign" name="heart" size={wp('2.7%')} color={ApplicationStyles.loveColor.color} style={styles.iconStyle} />
        <Icon iconFamily="" name="ios-wine" solid size={wp('2.7%')} color={ApplicationStyles.celebrateColor.color} style={styles.iconStyle} />
        {/* <Icon iconFamily="FontAwesome5" name="lightbulb" solid size={wp('2.4%')} color={ApplicationStyles.insightFulColor.color} style={styles.iconStyle} />
        <Icon iconFamily="Entypo" name="emoji-sad" size={wp('2.5%')} color={ApplicationStyles.sadColor.color} style={styles.iconStyle} /> */}
        <Text style={{ ...ApplicationStyles.bodySubHeading2 }}> 12K</Text>
      </View>
    );
  }
}


ReactionsGot.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

ReactionsGot.defaultProps = {
  placeholder: '',
  onChange: () => {},
};

export default ReactionsGot;
