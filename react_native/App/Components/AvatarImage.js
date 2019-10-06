import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import themeStyles from '../Theme/ApplicationStyles';

const styles = StyleSheet.create({
  container: { },
});

function AvatarImage({
  style, size, imageStyle, source,
}) {
  return (
    <View style={[styles.container, style]}>
      <Image
        style={[{
          width: size,
          height: size,
          borderRadius: size / 2,
        }, imageStyle]}
        source={source}
      />
    </View>
  );
}

AvatarImage.propTypes = {
  style: PropTypes.object,
  size: PropTypes.string,
  imageStyle: PropTypes.object,
  source: PropTypes.object,
};

AvatarImage.defaultProps = {
  style: {},
  size: wp('12%'),
  imageStyle: {},
  source: {},
};


export default AvatarImage;
