import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { ApplicationStyles, Files } from '../Theme';


/**
 * AntDesign like1
 * AntDesign heart
 * Entypo emoji-sad
 * Octicons light-bulb
 */


const iconFamilies = {
  Ionicons,
  Entypo,
  AntDesign,
  Octicons,
  SimpleLineIcons,
  FontAwesome5,
  FontAwesome,
  Feather,
  MaterialCommunityIcons,
};

function Icon({
  iconFamily, name, size, color, style, ...props
}) {
  const IconComponent = iconFamily && iconFamily !== 'customSvg' ? iconFamilies[iconFamily] : Ionicons;
  const iconSize = size || ApplicationStyles.iconSize;
  return (
    iconFamily === 'custom' ? (

      <Image
        source={Files[name]}
        style={{
          width: size,
          height: size,
        }}
      />
    )
      : (
        <IconComponent
          {...props}
          name={name}
          size={iconSize}
          color={color}
          style={style}
        />
      )
  );
}


Icon.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
  size: PropTypes.string,
  color: PropTypes.string,
  iconFamily: PropTypes.string,
};

Icon.defaultProps = {
  style: {},
  size: null,
  color: ApplicationStyles.primaryColor.color,
  iconFamily: 'Ionicons',
};


export default Icon;
