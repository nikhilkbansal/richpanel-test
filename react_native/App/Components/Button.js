import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import {
  View, Text, TouchableOpacity, TouchableNativeFeedback, Platform, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { ApplicationStyles, Colors } from '../Theme';

const styles = StyleSheet.create({
  buttonStyle: { alignContent: 'center', justifyContent: 'center', flex: 1 },
});

function Button({
  onPress, title, icon, style, titleStyle, iconSize, buttonWrapperStyle, iconColor,
}) {
  const Content = () => (
    <Fragment>
      {!!icon && <Icon name={icon} size={iconSize || ApplicationStyles.iconSize} color={iconColor} />}
      {!!title && <Text style={[titleStyle]}>{ title }</Text>}
    </Fragment>
  );

  return (
    <View style={[style]}>

      { Platform.OS === 'ios'
        ? (
          <TouchableOpacity onPress={onPress}>
            <Content />
          </TouchableOpacity>
        )
        : (
          <TouchableNativeFeedback
            onPress={onPress}
            useForeground
            background={TouchableNativeFeedback.SelectableBackground()}
          >
            <View style={[styles.buttonStyle, buttonWrapperStyle]}>
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
  titleStyle: PropTypes.object,
  style: PropTypes.object,
  iconSize: PropTypes.number,
  buttonWrapperStyle: PropTypes.object,
  iconColor: PropTypes.string,
};

Button.defaultProps = {
  icon: '',
  title: '',
  titleStyle: {},
  style: {},
  buttonWrapperStyle: {},
  iconSize: null,
  onPress: () => alert('Its working'),
  iconColor: Colors.darkFont,
};


export default Button;
