import PropTypes from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Text from './Text';
import Button from './Button';
import { Colors } from '../Theme';

function NotificationUi({
  title, onPress, containerStyle, theme,
}) {
  return (

    <View style={{
      backgroundColor: Colors.lightFont,
      flex: 1,
      flexDirection: 'row',
      padding: wp('2%'),
      alignContent: 'center',
      justifyContent: 'center',
      margin: wp('1%'),
      elevation: 1,
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
        <Text color="dark" size="h4">
          <Text color="dark" font="medium" size="h4">Goonj</Text>
          {' '}
added a new post
          {' '}
          <Text size="h4" color="primary">Here is new way to help poor people</Text>
        </Text>
        <Text size="h5">2 hours ago</Text>
      </View>
      <Button
        icon="md-more"
        iconSize={25}
        iconColor={Colors.mediumDarkFont}
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
