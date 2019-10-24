import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import {
  Image, View, Share, Slider, StyleSheet, FlatList, ScrollView,
} from 'react-native';
import Video from 'react-native-video';
import {
  Avatar, IconButton, Card, withTheme,
} from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';
import Text from './Text';
import MenuDropdown from './MenuDropdown';
import Button from './Button';
import { Colors, ApplicationStyles } from '../Theme';
import ProgressiveImage from './ProgressiveImage';
import Reaction from './Reaction';
import ReactionsGot from './ReactionsGot';
import Swiper from './Swiper';
import Icon from './Icon';
import { CommonFunctions } from '../Utils';
import AvatarImage from './AvatarImage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

console.log('Avatar', Avatar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('4%'),
    marginBottom: hp('1%'),
    
  },

  subContainer: { flex: 1, flexDirection: 'row', paddingVertical: hp('2%')  },
  avatarImage: {
    width: wp('12%'), height: wp('12%'), borderRadius: wp('7.5%'), alignSelf: 'center',
  },
  avatarContainer: {
    flex: 5, paddingHorizontal: wp('2%'), justifyContent: 'space-around', flexDirection: 'column',
  },
  userActions: {
    flex: 1,
    flexDirection: 'row',
    ...ApplicationStyles.elevationS,
    justifyContent: 'space-between',
  },
  avatarName: { flexDirection: 'row', flex: 3 },
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
  titleContainer: { paddingTop: hp('1.5%'), paddingBottom: hp('0%') },
  userFeedBack: {
    paddingHorizontal: wp('3%'),
    borderColor: ApplicationStyles.disabledColor.color,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex: 1,
    minHeight: hp('3.8%'),
    paddingVertical: hp('1%'),
    flexDirection: 'row',
  },
  commentContainer:{
    paddingHorizontal: wp('3%'),
    borderColor: ApplicationStyles.disabledColor.color,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: hp('1%'),
  },
  ago: {
    ...ApplicationStyles.avatarSubtitle,
    paddingHorizontal: wp('1.5%'),
  },
  moreContainer: { flex: 1, justifyContent: 'center' },
  subContainerSecond: { paddingHorizontal: wp('3%'), paddingTop: wp('2%') },
  moreWrapperStyle: {
    width: wp('10%'),
    height: wp('10%'),
    flex: 0,
    backgroundColor: ApplicationStyles.grayishBackground.color,
    borderRadius: wp('10%') / 2,
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 3,
    ...ApplicationStyles.elevationM,
    borderRadius: hp('1%'),
    overflow: 'hidden',
    backgroundColor: ApplicationStyles.lightBackground.color,
  },
  raisedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('1%'),
  },
  raisedSliderContainer: { backgroundColor:ApplicationStyles.smokeBackground.color, height: hp('0.2%') },
  raisedSlider: { backgroundColor: ApplicationStyles.primaryColor.color, width: '56%', height: hp('0.2%') },
  body: { ...ApplicationStyles.body2, marginBottom: hp('2%') },
  moreStyle: { ...ApplicationStyles.body3, color: ApplicationStyles.primaryColor.color },
  subBody: { padding: wp('2%') },
  raisedMoney: { ...ApplicationStyles.info2, alignContent: 'center', justifyContent: 'center' },
});

function PostUi({
  _id, title, description, isFollowed, files, userId, userName, comment, userPicture,onUserClick, onViewComments, onReactionRemovePress, onReactionPress, onSharePress, reactionsCount, followUnfollow, sharesCount, topThreeReactions, createdAt, campaignGoal, howUserReacted, onPress, containerStyle, theme, onDonatePress,
}) {
  return (
    <View style={styles.container}>
      <View style={[styles.subContainer]}>
        <AvatarImage
          source={{ uri: CommonFunctions.getFile(userPicture, 'avatar', true) }}
        />
        <Button style={[styles.avatarContainer]} onPress={onUserClick}>

          <View style={styles.avatarName}>
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

        </Button>

        <View style={styles.moreContainer}>
          <MenuDropdown
            menuTitle={userName}
            buttonStyle={[styles.moreWrapperStyle]}
            menus={[
              { label: isFollowed ? 'Unfollow' : 'Follow', func: () => followUnfollow({ type: 'homePagePosts', isFollowed, followeeId: userId._id }) },
              { label: 'Copy Link', func: () => {} },
              { label: 'Report This Post', func: () => {} }]}
          >
            <Icon name="md-more" size={25} color={ApplicationStyles.darkColor.color} />
          </MenuDropdown>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Swiper files={files} />
        <View style={styles.userFeedBack}>
          <ReactionsGot reactionsCount={reactionsCount} topThreeReactions={topThreeReactions} />
          {sharesCount > 0 && (
          <Text style={{ ...ApplicationStyles.bodySubHeading2 }}>
            {CommonFunctions.numberToReadable(sharesCount)}
            {' '}
            {CommonFunctions.getPluralString('Share', sharesCount)}
          </Text>
          )}
        </View>
        <View style={styles.subContainerSecond}>
          <View style={styles.userActions}>
            <Reaction active={howUserReacted} onReactionRemovePress={() => onReactionRemovePress({ _id })} onReactionPress={(reaction = 'like') => onReactionPress({ _id, reaction })} />
            <Button 
              icon='donate'
              iconSize={wp('6%')}
              iconColor={ApplicationStyles.darkColor.color}
              iconFamily='custom' 
              style={styles.reaction} 
              onPress={onDonatePress} />
            <Button icon="share" iconSize={wp('5.3%')} iconFamily="SimpleLineIcons" style={styles.reaction} onPress={onSharePress} />

          </View>
          <View style={styles.titleContainer}>
            <Text style={ApplicationStyles.headline2}>{title}</Text>
          </View>
          {campaignGoal
          && <Text style={{ ...ApplicationStyles.bodySubHeading, paddingVertical: hp('0.6%'), alignSelf: 'flex-end' }}>Ends on 12 Aug 2019</Text>}

          {campaignGoal
          && (
          <Fragment>
          

            <View style={styles.raisedSliderContainer}>
              <View style={styles.raisedSlider} />
            </View>
            <View style={styles.raisedContainer}>
              <Text style={ApplicationStyles.bodySubHeading}>₹100 Raised</Text>
              <Text style={styles.raisedMoney}>
              {/* ₹100 */}
                {' '}
                <Text style={ApplicationStyles.primaryInfo}>
                  ₹
                  {campaignGoal}
                </Text>
              </Text>
            </View>
          </Fragment>
          )
          }
        </View>
        <View style={styles.subBody}>
          <Text style={styles.body} maxLength={wp('40%')}>
            {description}
          </Text>
        </View>
        <View style={styles.commentContainer}>

        {/* <View style={styles.subBody}> */}
          {comment.length > 0 && (
          <View style={{
            flexDirection: 'row',
          }}
          >
            {/* <AvatarImage
              style={{
                paddingRight: wp('1%'),
                paddingTop: hp('0.57%'),
              }}
              size={wp('6%')}
              source={{ uri: CommonFunctions.getFile(comment[0].userId.userPicture, 'avatar', true) }}
            /> */}


            <Text style={{
              ...ApplicationStyles.body, flex: 1, flexWrap: 'wrap',
            }}
            >
              <Text style={{ ...ApplicationStyles.avatarTitle }}>
                {`${comment[0].userId.name} `}
              </Text>
              {comment[0].comment}
            </Text>

          </View>
          )}
          <Button
            title="View comments"
            titleStyle={{ ...ApplicationStyles.button2, textAlign: 'right' }}
            onPress={onViewComments}
          />
        </View>
      </View>
    </View>
  );
}


PostUi.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  containerStyle: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

PostUi.defaultProps = {
  onPress: () => {},
  containerStyle: {},
};


export default withTheme(PostUi);
