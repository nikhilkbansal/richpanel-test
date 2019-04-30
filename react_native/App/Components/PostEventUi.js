import PropTypes from 'prop-types';
import React from 'react';
import {
  Image, View, Share, Slider,
} from 'react-native';
import {
  Avatar, IconButton, Card, withTheme,
} from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, Button } from './index';
import { Colors } from '../Theme';

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
    <View style={{
      flex: 1,
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      paddingHorizontal: wp('4%'),

    }}
    >
      <View style={{ flex: 1, flexDirection: 'row', paddingVertical: hp('2%') }}>

        <Image
          style={{
            width: wp('11%'), height: wp('11%'), borderRadius: wp('7.5%'), alignSelf: 'center',
          }}
          source={require('../Assets/Images/child.jpeg')}
        />
        <View style={{ flex: 5, paddingHorizontal: wp('2%'), justifyContent: 'space-around' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text size="h4" font="regular">
              Goonj

            </Text>
            <Text size="h4" font="thin" style={{ paddingHorizontal: wp('2%'), alignItems: 'center' }}>
              <Icon name="md-medal" size={wp('4%')} color={Colors.golden} style={{ paddingHorizontal: wp('2%') }} />
              {' '}
            200
            </Text>
          </View>
          <Text
            size="h5"
            color={Colors.slightDark}
            style={{
              alignSelf: 'flex-start',
              backgroundColor: Colors.accent,
              paddingHorizontal: wp('2%'),
              paddingVertical: hp('0.3%'),
              borderRadius: wp('10%'),
            }}
          >
2 hours ago

          </Text>

        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Button
            icon="md-more"
            iconSize={25}
            style={{

              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            buttonWrapperStyle={{
              width: wp('10%'),
              height: wp('10%'),
              backgroundColor: Colors.accent,
              borderRadius: wp('10%') / 2,
              alignItems: 'center',
              overflow: 'hidden',
            }}
          />
        </View>
      </View>
      <View style={{
        flex: 3,
        elevation: 10,
        borderRadius: hp('1%'),
        overflow: 'hidden',
        backgroundColor: Colors.cardBackground,
      }}
      >
        <Image
          style={{
            height: hp('30%'),
            width: null,
            flex: 1,
            justifyContent: 'center',
          }}
          source={require('../Assets/Images/child.jpeg')}
        />
        <Button
          icon="md-heart-empty"
          iconColor={Colors.accent}
          iconSize={25}
          style={{
            position: 'absolute',
            top: hp('1%'),
            alignSelf: 'flex-end',
          }}
          buttonWrapperStyle={{
            width: wp('10%'),
            height: wp('10%'),
            borderRadius: wp('10%') / 2,
            overflow: 'hidden',
          }}
        />
        <View style={{ padding: wp('2%') }}>
          <Text size="h3" color="dark" style={{ marginBottom: hp('2%') }}>Lorem ipsum sit amet. Lorem ipsum sit amer as sd this is notLorem ipsum sit amet. Lorem ipsum sit amer assd this is not</Text>
          <Text size="h3" color="dark" style={{ paddingVertical: hp('1%') }}>10 PEOPLE RAISED</Text>
          <View style={{ backgroundColor: Colors.accent, flex: 1, height: hp('0.2%') }}>
            <View style={{ backgroundColor: Colors.primary, width: '56%', height: hp('0.2%') }} />
          </View>
          <View style={{
            flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: hp('1%'),
          }}
          >
            <Text size="h3" color="slightDark">TOTAL RAISED</Text>
            <Text size="h3" color="slightDark">
            $1000
              <Text size="h2" color="primary"> $1500</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function SPostEventUi({
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
    <View style={{
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
    </View>
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
