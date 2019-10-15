import PropTypes from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Text from './Text';
import Button from './Button';
import { Colors, ApplicationStyles } from '../Theme';

function NotificationUi({
  title, onPress, containerStyle, theme,
}) {
  return (

    <View style={{
      backgroundColor: ApplicationStyles.lightColor.color,
      flex: 1,
      flexDirection: 'row',
      padding: wp('2%'),
      alignContent: 'center',
      justifyContent: 'center',
      margin: wp('1%'),
      marginVertical: hp('1%'),
      ...ApplicationStyles.elevationS,
    }}
    >
      <Image
        style={{
          width: wp('14%'), height: wp('14%'), borderRadius: wp('7.5%'), alignSelf: 'center',
        }}
        source={require('../Assets/Images/child.jpeg')}
      />
      <View style={{
        flex: 1, paddingHorizontal: wp('2%'), justifyContent: 'space-between',
      }}
      >
        <Text>
          <Text style={{ ...ApplicationStyles.info, ...ApplicationStyles.primaryColor }}>Goonj</Text>
         Rahul
          <Text style={{ ...ApplicationStyles.info }}> replied you</Text>
        </Text>
        <Text size="h5">2 hours ago</Text>
      </View>
      <Button
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
      />

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
