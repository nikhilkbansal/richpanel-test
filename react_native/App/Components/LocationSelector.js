import * as React from 'react';
import {
  View, DatePickerAndroid, TimePickerAndroid, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Dialog, { DialogContent, SlideAnimation } from 'react-native-popup-dialog';
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


class LocationSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: '',
      visibleDialog: false,
    };

    this.openLocationSelector = this.openLocationSelector.bind(this);
  }

  async openLocationSelector() {

  }

  render() {
    const { dateTime, visibleDialog } = this.state;
    const {
      label, placeholder,
    } = this.props;
    return (
      <View style={styles.container}>
        <Dialog
          visible={visibleDialog}
          dialogAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          onTouchOutside={() => {
            this.setState({ visibleDialog: false });
          }}
        >
          <DialogContent style={{ width: wp('80%'), height: hp('80%') }} />
        </Dialog>
        <Text style={[{ ...ApplicationStyles.textInputLabel }, { padding: 0 }]}>
          {label}
        </Text>
        <Button
          onPress={this.openLocationSelector}
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


LocationSelector.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

LocationSelector.defaultProps = {
  placeholder: '',
  onChange: () => {},
};

export default LocationSelector;
