import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import themeStyles from '../Theme/ApplicationStyles';

const styles = StyleSheet.create({
  lineStyle: {
    width: '100%', height: StyleSheet.hairlineWidth, backgroundColor: themeStyles.disabledColor.color, marginVertical: 20,
  },
});

function HrLine({
  style,
}) {
  return (
    <View style={[styles.lineStyle, style]} />
  );
}

HrLine.propTypes = {
  style: PropTypes.object,
};

HrLine.defaultProps = {
  style: {},
};


export default HrLine;
