import PropTypes from 'prop-types';
import React from 'react';
import { Image, View, Share } from 'react-native';
import {
  Button, Avatar, Text, IconButton, Card, withTheme,
} from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

console.log('Avatar', Avatar);

function PostEventUi({
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
        {/* <Avatar.Image size={24} source={require('../Assets/Images/child.jpeg')} /> */}
        <View style={{
          flex: 1, flexDirection: 'row', paddingHorizontal: wp('1%'), justifyContent: 'space-around',
        }}
        >
          <View style={{
            flex: 1, justifyContent: 'space-between', paddingVertical: hp('1%'),
          }}
          >
            <Text style={{ fontFamily: theme.fonts.light }}>Goonj</Text>
            <Text style={{ fontFamily: theme.fonts.thin, fontSize: theme.fontSizes.h5 }}>2 hours ago</Text>


          </View>
          <IconButton
            icon="face"
            color={theme.colors.primary}
            size={20}
            onPress={() => console.log('Pressed')}
          />

          {/* <Text style={{ fontFamily: theme.fonts.thin, fontSize: theme.fontSizes.h1 }}>2 hours ago</Text>
          <Text style={{ fontFamily: theme.fonts.thin, fontSize: theme.fontSizes.h2 }}>2 hours ago</Text>
          <Text style={{ fontFamily: theme.fonts.thin, fontSize: theme.fontSizes.h3 }}>2 hours ago</Text>
          <Text style={{ fontFamily: theme.fonts.thin, fontSize: theme.fontSizes.h4 }}>2 hours ago</Text> */}
        </View>

      </View>
      <View style={{ }}>
        <Text style={{ fontFamily: theme.fonts.thin }}>Lorem ipsum sut amet lorem ipsum sut amet. Lorem ipsum sut amet lorem ipsum sut amet. Lorem ipsum sut amet lorem ipsum sut amet... </Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Image style={{ flex: 1, height: wp('50%'), borderRadius: wp('1%') }} source={require('../Assets/Images/child.jpeg')} />

        <View style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          borderRadius: wp('1%'),
          paddingHorizontal: wp('1%'),
          position: 'absolute',
          bottom: hp('1%'),
          right: wp('1%'),
          flexDirection: 'row',
        }}
        >
          <Text style={{ color: theme.colors.accent, fontFamily: theme.fonts.thin }}>7 Feb, 2012 - 14 Feb, 2019</Text>

        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
          {/* <IconButton
            icon="thumb-up"
            color={theme.colors.primary}
            size={20}
            onPress={() => console.log('Pressed')}
          /> */}
          <Button icon="thumb-up" style={{ alignItems: 'center', justifyContent: 'center' }} compact mode="text" onPress={() => console.log('Pressed')}>
    120
          </Button>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          {/* <IconButton
            icon="favorite"
            color={theme.colors.primary}
            size={20}
            onPress={() => console.log('Pressed')}
          /> */}
          <Button icon="favorite" style={{ alignItems: 'center', justifyContent: 'center' }} compact mode="text" onPress={() => console.log('Pressed')}>
    3k
          </Button>
          {/* <Text>12 K</Text> */}
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
          {/* <IconButton
            icon="share"
            color={theme.colors.primary}
            size={20}
            onPress={() => console.log('Pressed')}
          /> */}
          <Button
            icon="share"
            style={{ alignItems: 'center', justifyContent: 'center' }}
            compact
            mode="text"
            onPress={() => Share.share({
              message:
                'Goonj: This is how you can help poor kids',
            })
}
          >
    3k
          </Button>
        </View>
      </View>
    </Card>
  );
}

PostEventUi.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  containerStyle: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

PostEventUi.defaultProps = {
  onPress: () => {},
  containerStyle: {},
};


export default withTheme(PostEventUi);
