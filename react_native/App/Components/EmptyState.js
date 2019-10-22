import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import themeStyles from '../Theme/ApplicationStyles';
import Icon from './Icon';
import Text from './Text';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, ApplicationStyles } from '../Theme';

const styles = StyleSheet.create({
  lineStyle: {
    width: '100%', height: StyleSheet.hairlineWidth, backgroundColor: themeStyles.disabledColor.color, marginVertical: 20,
  },
});

function EmptyState({
  message,  children
}) {
  return (
    <View style={{   alignItems:'center', marginTop: hp('19%')}}>
      <View style={{ width: wp('70%'), height: wp('50%'),alignItems:'center', justifyContent:'center', backgroundColor:ApplicationStyles.smokeBackground.color,}}>
        <Icon name='emoji-neutral' iconFamily='Entypo' size={wp('24%')} color={ApplicationStyles.grayishBackground.color}/>
        <Text style={{...ApplicationStyles.button2, color: ApplicationStyles.grayishBackground.color}}>{message}</Text>
        <Text style={{...ApplicationStyles.subHeadline, color: ApplicationStyles.grayishBackground.color, textAlign:'center'}}>{children}</Text>
      </View>
  </View>
  );
}

EmptyState.propTypes = {
  message: PropTypes.string,
  children :PropTypes.any
};

EmptyState.defaultProps = {
  message: '',
  tip: ''
};


export default EmptyState;
