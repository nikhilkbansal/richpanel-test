import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import  Button from './Button';
import  Text from './Text';
import  Icon from './Icon';
import { ApplicationStyles } from '../Theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function MenuItem({
  leftIcon, rightIcon, leftLabel, rightLabel, onPress
}) { 
  return (
    <Button onPress={onPress} buttonWrapperStyle={{
      flex: 1,
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: wp('4%'),
      paddingVertical: hp('1.4%'),
    }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {!!leftIcon.name && <Icon name={leftIcon.name} size={leftIcon.size ||  wp('5%')} color={leftIcon.color || ApplicationStyles.info3.color} iconFamily={leftIcon.family || "Ionicons"} />}
        <Text style={{ ...ApplicationStyles.button, color: ApplicationStyles.darkColor.color }}> {leftLabel}</Text>
      </View>
      {!!rightLabel && <Text style={{ ...ApplicationStyles.info3 }}>{rightLabel}</Text>}
      {!!rightIcon.name && <Icon name={rightIcon.name} size={rightIcon.size ||  wp('5%')} color={rightIcon.color || ApplicationStyles.info3.color} iconFamily={rightIcon.family || "Ionicons"} />}
    </Button>
  );
}

MenuItem.propTypes = {
  leftIcon: PropTypes.object,
  rightIcon: PropTypes.object,
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  onPress: PropTypes.func
};

MenuItem.defaultProps = {
  leftIcon: {}, rightIcon: {}, leftLabel: '', rightLabel: '', onPress: ()=>{}
};


export default MenuItem;
