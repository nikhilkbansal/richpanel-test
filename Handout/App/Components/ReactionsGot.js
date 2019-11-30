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
    const { reactionsCount, topThreeReactions } = this.props;
    return (
      <View style={[styles.container]}>
        { topThreeReactions.includes('like') && <Icon iconFamily="AntDesign" name="like1" size={wp('2.7%')} color={ApplicationStyles.primaryColor.color} style={styles.iconStyle} />}
        { topThreeReactions.includes('love') && <Icon iconFamily="AntDesign" name="heart" size={wp('2.7%')} color={ApplicationStyles.loveColor.color} style={styles.iconStyle} />}
        { topThreeReactions.includes('celebrate') && <Icon iconFamily="" name="ios-wine" solid size={wp('2.7%')} color={ApplicationStyles.celebrateColor.color} style={styles.iconStyle} />}
        { topThreeReactions.includes('insightFul') && <Icon iconFamily="FontAwesome5" name="lightbulb" solid size={wp('2.4%')} color={ApplicationStyles.insightFulColor.color} style={styles.iconStyle} />}
        { topThreeReactions.includes('sad') && <Icon iconFamily="Entypo" name="emoji-sad" size={wp('2.5%')} color={ApplicationStyles.sadColor.color} style={styles.iconStyle} />}
        {reactionsCount > 0 && (
        <Text style={{ ...ApplicationStyles.fontStyles.caption, paddingHorizontal: wp('0.4%') }}>
          {CommonFunctions.numberToReadable(reactionsCount) }
        </Text>
        )}
      </View>
    );
  }
}


ReactionsGot.propTypes = {
  reactionsCount: PropTypes.number,
  topThreeReactions: PropTypes.array,
};

ReactionsGot.defaultProps = {
  reactionsCount: 0,
  topThreeReactions: [],
};

export default ReactionsGot;
