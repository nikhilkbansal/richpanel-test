import * as React from 'react';
import {
  View, DatePickerAndroid, TimePickerAndroid, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from './Button';
import Text from './Text';
import {
  Colors, ApplicationStyles,
} from '../Theme';
import { CommonFunctions } from '../Utils';

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: hp('1%') },
  button: {
    paddingTop: hp('0.4%'),
    paddingBottom: hp('1%'),
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: Colors.mediumDarkFont,
  },
});


class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: '',
    };

    this.openDatePicker = this.openDatePicker.bind(this);
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


  render() {
    const { dateTime } = this.state;
    const {
      label, placeholder,
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={[{ ...ApplicationStyles.textInputLabel }, { padding: 0 }]}>
          {label}
        </Text>
        <Button
          onPress={this.openDatePicker}
          style={styles.button}
        >
          { dateTime

            ? <Text style={[{ ...ApplicationStyles.textInputValue }, { padding: 0 }]}>{dateTime}</Text>
            : <Text style={[{ ...ApplicationStyles.textInputValue, ...ApplicationStyles.disabledColor }, { padding: 0 }]}>{placeholder}</Text>
          }
        </Button>

      </View>
    );
  }
}


DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

DatePicker.defaultProps = {
  placeholder: '',
  onChange: () => {},
};

export default DatePicker;
