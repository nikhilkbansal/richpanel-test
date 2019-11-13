import * as React from 'react';
import {
  View, DatePickerAndroid, TimePickerAndroid, StyleSheet, Modal, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Dialog, { DialogContent, SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import Button from './Button';
import Text from './Text';
import {
  Colors, ApplicationStyles,
} from '../Theme';
import { CommonFunctions } from '../Utils';

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: hp('1%') },
  button: {
    paddingVertical: hp('1%'),
    flex: 1,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: ApplicationStyles.disabledColor.color,
  },
});
let data = [{
  value: 'Banana',
}, {
  value: 'Mango',
}, {
  value: 'Pear',
}];


class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: props.default ? props.default.label : '',
      modalVisible: false,
    };

    this.openPicker = this.openPicker.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  setValue(label, value) {
    const { onValueChange } = this.props;
    this.setState({ label, modalVisible: false });
    onValueChange(label, value);
  }

  openPicker() {
    this.setState({ modalVisible: true });
  }


  render() {
    const { modalVisible, label } = this.state;
    const {
      placeholder, options, dropDownLabel,
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={[{ ...ApplicationStyles.fontStyles.body1 }, { padding: 0 }]}>
          {dropDownLabel}
        </Text>
        <Button
          onPress={this.openPicker}
          style={styles.button}
        >
          { label

            ? <Text style={[{ ...ApplicationStyles.fontStyles.body2 }, { padding: 0 }]}>{label}</Text>
            : <Text style={[{ ...ApplicationStyles.fontStyles.body2, ...ApplicationStyles.disabledColor }, { padding: 0 }]}>{placeholder}</Text>
          }
        </Button>

        <Dialog
          visible={modalVisible}
          dialogAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          onTouchOutside={() => {
            this.setState({ modalVisible: false });
          }}
          dialogTitle={<DialogTitle title="Donate" textStyle={{ ...ApplicationStyles.fontStyles.body2 }} />}
        >
          <DialogContent style={{ width: wp('50%'), maxHeight: hp('30%') }}>
            <ScrollView>
              { options && options.map(o => (
                <Button
                  title={o.label.toUpperCase()}
                  onPress={() => this.setValue(o.label, o.value)}
                  titleStyle={{ ...ApplicationStyles.fontStyles.body1, ...styles.button }}
                />
              ))}
            </ScrollView>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}


Dropdown.propTypes = {
  dropDownLabel: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  default: PropTypes.object,
  options: PropTypes.array.isRequired,
  onValueChange: PropTypes.func,
};

Dropdown.defaultProps = {
  placeholder: '',
  default: {},
  onValueChange: () => {},
};

export default Dropdown;
