import React from 'react';
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
import { ApplicationStyles } from '../Theme';


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
  const IconComponent = iconFamily ? iconFamilies[iconFamily] : Ionicons;
  return (
    <IconComponent
      {...props}
      name={name}
      size={size || ApplicationStyles.iconSize}
      color={color}
      style={style}
    />
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
