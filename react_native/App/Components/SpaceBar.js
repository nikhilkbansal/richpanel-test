import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

function SpaceBar({
  style,
}) {
  const styles = {
    container: {
      marginVertical: hp('1%'),
    },
  };
  return (
    <View style={[styles.container, style]} />
  );
}

SpaceBar.propTypes = {
  style: PropTypes.string,
};

SpaceBar.defaultProps = {
  style: {},
};


export default SpaceBar;
