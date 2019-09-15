import * as React from 'react';
import {
  View, DatePickerAndroid, TimePickerAndroid, StyleSheet, Animated,
  Easing,
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

  container: { flex: 1, marginTop: hp('1%'), backgroundColor: 'red' },
  overlay: {
    // position: 'absolute',
    // marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    // top: -hp('8.5%'),
    // left: wp('-1%'),
    height: hp('5.5%'),
    backgroundColor: ApplicationStyles.lightColor.color,
    // elevation: 2,
    // borderRadius: wp('1%'),
    // zIndex: 9999,

  },
  reaction: {
    padding: wp('1%'),
    paddingTop: hp('0.4%'),
    paddingBottom: 0,
    flex: 1,
    marginBottom: 0,
    alignSelf: 'center',
  },
});


class Reaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.spinValue = new Animated.Value(0);
    this.spin = this.spin.bind(this);
    this.toggleReactions = this.toggleReactions.bind(this);
  }


  toggleReactions() {
    const { modalVisible } = this.state;
    this.setState({ modalVisible: !modalVisible }, () => {
      if (!modalVisible) {
        this.spin();
      }
    });
  }


  spin() {
    this.spinValue.setValue(0.2);
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 500,
        easing: Easing.in,
        delay: 900,
        useNativeDriver: true,
      },
    ).start();
  }

  buttonWithTitle(title, icon, iconFamily, iconColor) {
    const scale = this.spinValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.2, 1],
    });
    return (
      <Animated.View style={{
        flex: 1,
        flexDirection: 'column',
        transform: [{ scale }],
      }}
      >
        <Button iconSize={wp('6%')} style={{ flex: 1 }} iconColor={iconColor} iconFamily={iconFamily} icon={icon} buttonWrapperStyle={styles.reaction} onPress={this.toggleReactions} />
        <Text style={{
          ...ApplicationStyles.tabLabelStyle,
          color: iconColor,
          textAlign: 'center',
        }}
        >
          {title}
        </Text>
      </Animated.View>
    );
  }

  render() {
    const { modalVisible } = this.state;
    const {
      label, placeholder,
    } = this.props;

    return (
      <View>
        <Dialog
          visible={modalVisible}
          dialogAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          onTouchOutside={this.toggleReactions}
        >
          <DialogContent style={{
            width: wp('70%'),
            minHeight: hp('8%'),
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            justifyItems: 'center',
            padding: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 0,

          }}
          >
            <View style={styles.overlay}>
              { this.buttonWithTitle('Like', 'like2', 'AntDesign', ApplicationStyles.primaryColor.color) }
              { this.buttonWithTitle('Love', 'hearto', 'AntDesign', ApplicationStyles.loveColor.color) }
              { this.buttonWithTitle('Celebrate', 'ios-wine', '', ApplicationStyles.celebrateColor.color) }
              { this.buttonWithTitle('Insightful', 'lightbulb', 'FontAwesome5', ApplicationStyles.insightFulColor.color) }
              { this.buttonWithTitle('Sad', 'emoji-sad', 'Entypo', ApplicationStyles.sadColor.color) }
            </View>
          </DialogContent>
        </Dialog>
        <Button iconFamily="AntDesign" iconSize={wp('5.5%')} icon="like2" onLongPress={this.toggleReactions} />
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
