import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import {
  View, TouchableOpacity, TouchableNativeFeedback, Platform, StyleSheet,
} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from './Icon';
import Text from './Text';
import { ApplicationStyles, Colors, Fonts } from '../Theme';

const styles = StyleSheet.create({
  buttonStyle: {
    alignContent: 'center', justifyContent: 'center', flex: 1,
  },
  roundStyle: {
    overflow:'hidden', 
  }
});

function Button({
  onPress, title, icon, style, titleStyle, iconSize,iconExtraProps,
  buttonWrapperStyle, iconColor, iconFamily, children, iconStyle, ...props
}) {
  const Content = () => (
    <Fragment>
      {!!icon && <Icon name={icon} {...iconExtraProps} iconFamily={iconFamily} size={iconSize || ApplicationStyles.iconSize} color={iconColor} style={iconStyle} />}
      {!!title && <Text style={[{ ...ApplicationStyles.button }, titleStyle]}>{ title }</Text>}
      {!!children && children }
    </Fragment>
  );

  return (
    <View style={[style]}>

      { Platform.OS === 'ios'
        ? (
          <TouchableOpacity onPress={onPress}>
            <View style={[styles.buttonStyle, buttonWrapperStyle]}>
              <Content />
            </View>
          </TouchableOpacity>
        )
        : (
          <TouchableNativeFeedback
            onPress={onPress}
            useForeground
            touchSoundDisabled={false}
            background={TouchableNativeFeedback.SelectableBackground()}
            {...props}
          >
            <View style={[styles.buttonStyle, icon ? styles.roundStyle:{}, buttonWrapperStyle]}>
              <Content />
            </View>
          </TouchableNativeFeedback>
        )
      }

    </View>
  );
}

Button.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
  iconStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  style: PropTypes.object,
  iconSize: PropTypes.number,
  buttonWrapperStyle: PropTypes.object,
  iconColor: PropTypes.string,
  iconFamily: PropTypes.string,
  children: PropTypes.any,
  iconExtraProps: PropTypes.object
};

Button.defaultProps = {
  icon: '',
  title: '',
  titleStyle: {},
  style: {},
  iconStyle: {},
  buttonWrapperStyle: {},
  children: null,
  iconSize: null,
  iconFamily: null,
  onPress: () => alert('Work in progress'),
  iconColor: ApplicationStyles.darkColor.color,
  iconExtraProps: {}
};


export default Button;
