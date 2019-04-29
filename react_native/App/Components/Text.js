import PropTypes from 'prop-types';
import React from 'react';
import {
  Text as RNText,
} from 'react-native';
import { FontSizes, Colors, Fonts } from '../Theme';

function Text({
  children, size, color, font, style,
}) {
  const sizes = {
    h1: {
      fontSize: FontSizes.h1,
    },
    h2: {
      fontSize: FontSizes.h2,
    },
    h3: {
      fontSize: FontSizes.h3,
    },
    h4: {
      fontSize: FontSizes.h4,
    },
    h5: {
      fontSize: FontSizes.h5,
    },
  };

  const colors = {
    primary: {
      color: Colors.primary,
    },
    dark: {
      color: Colors.darkFont,
    },
    mediumDark: {
      color: Colors.mediumDarkFont,
    },
    slightDark: {
      color: Colors.slightDarkFont,
    },
    light: {
      color: Colors.lightFont,
    },
  };
  const fonts = {
    regular: {
      fontFamily: Fonts.regular,
    },
    medium: {
      fontFamily: Fonts.medium,
    },
    light: {
      fontFamily: Fonts.light,
    },
    thin: {
      fontFamily: Fonts.thin,
    },
  };
  return (
    <RNText style={[style, { ...sizes[size] }, { ...colors[color] }, { ...fonts[font] }]}>
      {children}
    </RNText>
  );
}

Text.propTypes = {
  children: PropTypes.any.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  font: PropTypes.string,
  style: PropTypes.object,
};

Text.defaultProps = {
  size: 'h3',
  color: 'dark',
  font: 'light',
  style: {},
};


export default Text;
