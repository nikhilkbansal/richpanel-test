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
import moment from 'moment';

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: hp('1%'), paddingBottom: hp('1%') },
  button: {
    paddingTop: hp('0.5%'),
    paddingBottom: hp('1.9%'),
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth ,
    borderBottomColor: ApplicationStyles.disabledColor.color,
  },
});


class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    let dateTime = '';
    if(props.defaultDateTime && props.onlyDate){
      dateTime = moment(props.defaultDateTime).format('YYYY/MM/DD');
    } else {
      dateTime = moment(props.defaultDateTime).format('YYYY/MM/DD hh:mm:ss');
    }
    this.state = {
      dateTime,
      defaultDateTime: props.defaultDateTime || new Date(),
    };

    this.openDatePicker = this.openDatePicker.bind(this);
  }

  async openDatePicker() {
    const { onChange, onlyDate } = this.props;
    const { defaultDateTime } = this.state;
    try {
      const {
        action, year, month, day,
      } = await DatePickerAndroid.open({ minDate: new Date(), date: defaultDateTime});
      if (action !== DatePickerAndroid.dismissedAction) {
        if(onlyDate){
          onChange(new Date(year, month, day));
          const formattedDateTime = `${year}/${CommonFunctions.getPaddedZero(month)}/${CommonFunctions.getPaddedZero(day)}`;
          this.setState({
            dateTime: formattedDateTime,
          });
          return;
        }
        const { action: timeAction, hour, minute } = await TimePickerAndroid.open({
          hour: 14,
          minute: 0,
          is24Hour: true, // Will display '2 PM'
        });
        
        if (timeAction !== TimePickerAndroid.dismissedAction) {
          const formattedDateTime = `${year}/${CommonFunctions.getPaddedZero(month)}/${CommonFunctions.getPaddedZero(day)} ${CommonFunctions.getPaddedZero(CommonFunctions.getHoursIn12(hour).hours)}:${CommonFunctions.getPaddedZero(minute)} ${CommonFunctions.getHoursIn12(hour).noonStatus}`;
          onChange(new Date(year, month, day, hour, minute));
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
      label, placeholder, error
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={[{ ...ApplicationStyles.fontStyles.body1 }, { padding: 0 }]}>
          {label}
        </Text>
        <Button
          onPress={this.openDatePicker}
          style={styles.button}
        >
          { dateTime

            ? <Text style={[{ ...ApplicationStyles.fontStyles.body2 }, { padding: 0 }]}>{dateTime}</Text>
            : <Text style={[{ ...ApplicationStyles.fontStyles.body2, ...ApplicationStyles.disabledColor }, { padding: 0 }]}>{placeholder}</Text>
          }
        </Button>
      {error &&<Text style={[{ ...ApplicationStyles.fontStyles.caption, color: ApplicationStyles.warningColor.color }, { padding: 0 }]}>
      {error}
      </Text>
      }
      </View>
    );
  }
}


DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
};

DatePicker.defaultProps = {
  placeholder: '',
  error: null,
  onChange: () => {},
};

export default DatePicker;
