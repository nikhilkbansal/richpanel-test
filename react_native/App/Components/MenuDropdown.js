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
  container: { flex: 1 },
  button: {
    paddingTop: hp('0.4%'),
    paddingBottom: hp('1%'),
    flex: 1,
  },
});


class MenuDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: props.default ? props.default.label : '',
      modalVisible: false,
    };

    this.openPicker = this.openPicker.bind(this);
    this.closePicker = this.closePicker.bind(this);
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

  closePicker() {
    this.setState({ modalVisible: false });
  }

  render() {
    const { modalVisible, label } = this.state;
    const defaultMenus = [{ label: 'Cancel', func: this.closePicker }];
    const {
      placeholder, menus, menuTitle, children, containerStyle, buttonStyle, modalStyle, menuItemStyle,
    } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <Button
          onPress={this.openPicker}
          buttonWrapperStyle={buttonStyle}
          style={[styles.button, { borderBottomWidth: 0 }]}
        >
          {children}
        </Button>

        <Dialog
          visible={modalVisible}
          dialogAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          onTouchOutside={() => {
            this.setState({ modalVisible: false });
          }}
          dialogTitle={<DialogTitle title={menuTitle} textStyle={{ ...ApplicationStyles.textInputLabel }} />}
        >
          <DialogContent style={[{
            width: wp('50%'), maxHeight: hp('50%'), paddingTop: hp('2%'), paddingHorizontal: 0,
          }, modalStyle]}
          >
            <ScrollView>
              { menus && [...menus, ...defaultMenus].map(o => (
                <Button
                  title={o.label}
                  onPress={() => { this.closePicker(); o.func(); }}
                  titleStyle={{ ...ApplicationStyles.bodyHeading, ...styles.button, ...menuItemStyle }}
                />
              ))}
            </ScrollView>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}


MenuDropdown.propTypes = {
  dropDownLabel: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  default: PropTypes.object,
  menus: PropTypes.array.isRequired,
  onValueChange: PropTypes.func,
  modalStyle: PropTypes.object,
  menuItemStyle: PropTypes.object,
};

MenuDropdown.defaultProps = {
  placeholder: '',
  default: {},
  modalStyle: {},
  menuItemStyle: {},
  onValueChange: () => {},
};

export default MenuDropdown;
