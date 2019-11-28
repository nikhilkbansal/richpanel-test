import PropTypes from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Text from './Text';
import Button from './Button';
import Icon from './Icon';
import MenuDropdown from './MenuDropdown';
import AvatarImage from './AvatarImage';
import { Colors, ApplicationStyles } from '../Theme';
import moment from 'moment';
import { CommonFunctions } from '../Utils';

function NotificationUi({
  notification, createdAt, receiverId
}) {
  return (

    <View style={{
      backgroundColor: ApplicationStyles.lightColor.color,
      flex: 1,
      flexDirection: 'row',
      padding: wp('2%'),
      alignContent: 'center',
      justifyContent: 'center', 
      marginVertical: hp('1%'),
      ...ApplicationStyles.elevationS,
      paddingHorizontal: wp('3%')
    }}

    >
      <AvatarImage source={ CommonFunctions.getFile( receiverId && receiverId.picture)} />
      <View style={{
        flex: 1, paddingHorizontal: wp('2%'), justifyContent:'space-around',
      }}
      >
        
        <Text style={{ ...ApplicationStyles.fontStyles.body1 }}>{notification}</Text>
        <Text style={{...ApplicationStyles.fontStyles.caption}}>{moment(createdAt).fromNow() }</Text>
      </View>
      <MenuDropdown
            menuTitle={'Notification'}
            containerStyle={{
              width: wp('5%'),
              backgroundColor:'red',
            }}
            buttonStyle={[{
              width: wp('5%'),
              alignItems: 'center',
              overflow: 'hidden',
            }]}
            menus={[
              { label: 'Report', func: () => {} }]}
          > 
            <Icon name="md-more" size={25} color={ApplicationStyles.darkColor.color} />
          </MenuDropdown>
      {/* <Button
        icon="md-more"
        iconSize={25}
        iconColor={ApplicationStyles.disabledColor.color}
        style={{

          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        buttonWrapperStyle={{
          width: wp('5%'),
          alignItems: 'center',
          overflow: 'hidden',
        }}
      /> */}

    </View>
  );
}

NotificationUi.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  containerStyle: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

NotificationUi.defaultProps = {
  onPress: () => {},
  containerStyle: {},
};


export default NotificationUi;
