import * as React from 'react';
import {
  View, DatePickerAndroid, TimePickerAndroid, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Button from './Button';
import Text from './Text';
import {
  Colors, ApplicationStyles,
} from '../Theme';
import { CommonFunctions } from '../Utils';

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: hp('1%') },
  overlay: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    top: -hp('7%'),
    left: 0,
    backgroundColor: ApplicationStyles.lightColor.color,
    paddingVertical: wp('1%'),
    paddingHorizontal: wp('4%'),
    elevation: 3,
    borderRadius: wp('1%'),
  },
  reaction: {
    padding: wp('1%'),
  },
});


class Reaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showReactions: false,
    };

    this.openDatePicker = this.openDatePicker.bind(this);
    this.toggleReactions = this.toggleReactions.bind(this);
  }

  async openDatePicker() {
    const { onChange } = this.props;
    try {
      const {
        action, year, month, day,
      } = await DatePickerAndroid.open();
      if (action !== DatePickerAndroid.dismissedAction) {
        const { action: timeAction, hour, minute } = await TimePickerAndroid.open({
          hour: 14,
          minute: 0,
          is24Hour: true, // Will display '2 PM'
        });
        if (timeAction !== TimePickerAndroid.dismissedAction) {
          const formattedDateTime = `${year}/${CommonFunctions.getPaddedZero(month)}/${CommonFunctions.getPaddedZero(day)} ${CommonFunctions.getPaddedZero(CommonFunctions.getHoursIn12(hour).hours)}:${CommonFunctions.getPaddedZero(minute)} ${CommonFunctions.getHoursIn12(hour).noonStatus}`;
          onChange(formattedDateTime);
          this.setState({
            dateTime: formattedDateTime,
          });
        }
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  toggleReactions() {
    const { showReactions } = this.state;
    this.setState({ showReactions: !showReactions });
  }

  render() {
    const { showReactions } = this.state;
    const {
      label, placeholder,
    } = this.props;
    return (
      <View style={[styles.container]}>
        {showReactions && (
        <View style={styles.overlay}>
          <Button icon="md-thumbs-up" style={styles.reaction} onLongPress={() => alert('longPress')} onPress={() => alert('shortPress')} />
          <Button icon="md-thumbs-up" style={styles.reaction} onLongPress={() => alert('longPress')} onPress={() => alert('shortPress')} />
          <Button icon="md-thumbs-up" style={styles.reaction} onLongPress={() => alert('longPress')} onPress={() => alert('shortPress')} />
          <Button icon="md-thumbs-up" style={styles.reaction} onLongPress={() => alert('longPress')} onPress={() => alert('shortPress')} />

        </View>
        )}
        <Button icon="md-thumbs-up" onLongPress={this.toggleReactions} onPress={() => alert('shortPress')} />
      </View>
    );
  }
}


Reaction.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

Reaction.defaultProps = {
  placeholder: '',
  onChange: () => {},
};

export default Reaction;
