import PropTypes from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';
import {
  Button, Title, Text, IconButton, Card, withTheme,
} from 'react-native-paper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

function NotificationUi({
  title, onPress, containerStyle, theme,
}) {
  const styles = {
    container: {
      alignSelf: 'center',
    },
    title: {
      fontFamily: theme.fonts.thin,
      color: theme.colors.primary,
    },
  };
  return (
    <Card style={{
      backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#FBFCFD', padding: wp('2%'),
    }}
    >
      <View style={{
        flex: 1, flexDirection: 'row', paddingVertical: wp('1%'), alignContent: 'center', justifyContent: 'center',
      }}
      >
        <Image
          style={{
            width: wp('11%'), height: wp('11%'), borderRadius: wp('7.5%'), alignSelf: 'center',
          }}
          source={require('../Assets/Images/child.jpeg')}
        />
        <View style={{
          flex: 1, paddingHorizontal: wp('1%'), justifyContent: 'space-between',
        }}
        >
          <Text style={{ fontFamily: theme.fonts.light, fontSize: theme.fontSizes.h3 }}>
            <Text style={{ fontFamily: theme.fonts.regular }}>Goonj</Text>
            {' '}
added a new post
            {' '}
            <Text style={{ fontFamily: theme.fonts.regular }}>Here is new way to help poor people</Text>
          </Text>
          <Text style={{ fontFamily: theme.fonts.thin, fontSize: theme.fontSizes.h5 }}>2 hours ago</Text>
        </View>

      </View>

    </Card>
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


export default withTheme(NotificationUi);
