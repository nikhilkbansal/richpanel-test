import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableRipple, withTheme } from 'react-native-paper';

function SmallButton({
  title, onPress, containerStyle, theme,
}) {
  const styles = {
    container: {
      alignSelf: 'center',
    },
    title: {
      fontFamily: theme.fonts.thin,
      color: theme.colors.primary,
    },
  };
  return (
    <TouchableRipple onPress={onPress} style={[styles.container, containerStyle]}>
      <Text style={{ ...styles.title }}>{title}</Text>
    </TouchableRipple>
  );
}

SmallButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  containerStyle: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

SmallButton.defaultProps = {
  onPress: () => {},
  containerStyle: {},
};


export default withTheme(SmallButton);
