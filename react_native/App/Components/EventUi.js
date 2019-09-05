import PropTypes from 'prop-types';
import React from 'react';
import {
  Image, View, Share, Slider, StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import moment from 'moment';
import {
  Avatar, IconButton, Card, withTheme,
} from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Text from './Text';
import Button from './Button';
import { Colors, ApplicationStyles } from '../Theme';
import ProgressiveImage from './ProgressiveImage';
import Reaction from './Reaction';
import Swiper from './Swiper';
import { CommonFunctions } from '../Utils';

console.log('Avatar', Avatar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('4%'),
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  subContainer: { flex: 1, flexDirection: 'row', paddingVertical: hp('2%') },
  avatarImage: {
    width: wp('12%'), height: wp('12%'), borderRadius: wp('7.5%'), alignSelf: 'center',
  },
  avatarContainer: {
    flex: 5, paddingHorizontal: wp('2%'), justifyContent: 'space-around', flexDirection: 'column',
  },
  medal: { ...ApplicationStyles.avatarSubtitle, paddingHorizontal: wp('2%'), alignItems: 'center' },
  agoContainer: {
    flex: 1,
    alignSelf: 'flex-start',
    height: hp('4%'),
    alignContent: 'center',
    borderRadius: wp('10%'),
    backgroundColor: ApplicationStyles.grayishBackground.color,
    justifyContent: 'center',
  },
  ago: {
    ...ApplicationStyles.avatarSubtitle,
    paddingHorizontal: wp('1.5%'),
  },
  moreContainer: { flex: 1, justifyContent: 'center' },
  moreStyle: {

    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreWrapperStyle: {
    width: wp('10%'),
    height: wp('10%'),
    backgroundColor: ApplicationStyles.grayishBackground.color,
    borderRadius: wp('10%') / 2,
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 3,
    elevation: 3,
    borderRadius: hp('1%'),
    overflow: 'hidden',
    backgroundColor: Colors.cardBackground,
  },
  mainImage: {
    height: hp('30%'),
    width: null,
    flex: 1,
    justifyContent: 'center',
  },
  heart: {
    position: 'absolute',
    top: hp('1%'),
    alignSelf: 'flex-end',
  },
  heartWrapperStyle: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('10%') / 2,
    overflow: 'hidden',
  },
  body: { ...ApplicationStyles.body3, marginBottom: hp('2%') },
  moreStyle: { ...ApplicationStyles.body3, color: ApplicationStyles.primaryColor.color },
  peopleRaised: { ...ApplicationStyles.bodyHeading, paddingVertical: hp('1%') },
  raisedBar: { backgroundColor: Colors.accent, flex: 1, height: hp('0.2%') },
  bar: { backgroundColor: Colors.primary, width: '56%', height: hp('0.2%') },
  subBody: { padding: wp('2%'), paddingTop: 0 },
  forgetButton: {
    ...ApplicationStyles.body,

  },
  forgetButtonContainer: { alignSelf: 'center' },
  totalRaised: {
    flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: hp('1%'),
  },
  raisedMoney: { ...ApplicationStyles.info2, alignContent: 'center', justifyContent: 'center' },
});

function EventUi({
  title, description, files, userName, userPicture, createdAt, onPress, containerStyle, theme,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>

        <Image
          style={styles.avatarImage}
          source={{ uri: CommonFunctions.getFile(userPicture, 'avatar', true) }}
        />

        <View style={styles.avatarContainer}>
          <View style={{ flexDirection: 'row', flex: 3 }}>
            <Text style={ApplicationStyles.avatarTitle}>
              {userName}
            </Text>
            {/* <Text style={[styles.medal]}>
      <Icon name="md-medal" size={wp('4%')} color={Colors.golden} style={{ paddingHorizontal: wp('2%') }} />
      {' '}
    200
    </Text> */}
          </View>
          <View style={styles.agoContainer}>
            <Text style={styles.ago}>
              { moment(createdAt).fromNow()}
            </Text>
          </View>

        </View>
        <View style={styles.moreContainer}>
          <Button
            icon="md-more"
            iconSize={25}
            style={styles.moreStyle}
            buttonWrapperStyle={styles.moreWrapperStyle}
          />
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Swiper files={files} />

        {/* <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: hp('1%'),
          alignContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.3)',
        }}
        >
          <Text style={{ ...ApplicationStyles.info1, flex: 1, textAlign: 'center' }}>12th Dec 10:00 PM to 15th Dec 11:00 AM</Text>
        </View> */}
        <View style={{ paddingHorizontal: wp('3%'), paddingTop: wp('2%') }}>
          <View style={{
            flex: 1, flexDirection: 'row', elevation: 2,
          }}
          >
            <Reaction />
            <Button icon="md-share" style={styles.reaction} onLongPress={() => alert('longPress')} onPress={() => alert('shortPress')} />
          </View>
          <View style={{ paddingTop: hp('2.5%') }}>
            <Text style={ApplicationStyles.headline2}>300m Marathan for education of poor kids</Text>
          </View>
          <View style={{ paddingVertical: 0 }}>
            <Button iconSize={wp('3.5%')} icon="md-pin" iconStyle={{ alignSelf: 'center', paddingHorizontal: wp('0.5%') }} buttonWrapperStyle={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-end' }}>
              <Text style={{ ...ApplicationStyles.avatarSubtitle }}>JWT Marriot, Chandigarh</Text>
            </Button>
          </View>
        </View>
        <View style={styles.subBody}>
          <Text style={styles.body}>
            {description}
            <Text style={styles.moreStyle}> more</Text>
          </Text>
          {/* <Text style={styles.peopleRaised}>10 PEOPLE RAISED</Text>
          <View style={styles.raisedBar}>
            <View style={styles.bar} />
          </View>
          <View style={styles.totalRaised}>
            <Text style={ApplicationStyles.bodySubHeading}>TOTAL RAISED</Text>
            <Text style={styles.raisedMoney}>
            $1000
              <Text style={ApplicationStyles.primaryInfo}> $1500</Text>
            </Text>
          </View> */}
        </View>
      </View>
    </View>
  );
}


EventUi.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  containerStyle: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

EventUi.defaultProps = {
  onPress: () => {},
  containerStyle: {},
};


export default withTheme(EventUi);
