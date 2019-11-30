import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableRipple, withTheme } from 'react-native-paper';
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';

function IsNgo({
  checked, onPress, containerStyle, theme,
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
    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text>Signup as a NGO</Text>
      <Checkbox
        color={theme.colors.primary}
        status={checked ? 'checked' : 'unchecked'}
        onPress={onPress}
      />
    </View>
  );
}

IsNgo.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  containerStyle: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

IsNgo.defaultProps = {
  onPress: () => {},
  containerStyle: {},
};


export default withTheme(IsNgo);
