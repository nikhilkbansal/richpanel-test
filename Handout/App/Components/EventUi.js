import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import {
  Image, View, Share, Slider, StyleSheet, FlatList, ScrollView, Clipboard
} from 'react-native';
import {
  Avatar, IconButton, Card, withTheme,
} from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';
import Text from './Text';
import AvatarImage from './AvatarImage';
import MenuDropdown from './MenuDropdown';
import Button from './Button';
import { Colors, ApplicationStyles } from '../Theme';
import ProgressiveImage from './ProgressiveImage';
import Reaction from './Reaction';
import ReactionsGot from './ReactionsGot';
import Swiper from './Swiper';
import Icon from './Icon';
import { CommonFunctions } from '../Utils';
import Toast from '../Services/ToastService';

console.log('Avatar', Avatar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('1%'),
    marginBottom: hp('1%'),
    
  },

  subContainer: { flex: 1, flexDirection: 'row', paddingBottom: hp('1.1%'), paddingTop: hp('1.5%')   },
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
  avatarName: { flexDirection: 'row', flex: 1 },
  medal: { ...ApplicationStyles.avatarSubtitle, paddingHorizontal: wp('2%'), alignItems: 'center' },
  agoContainer: {
    flex: 1,
    alignSelf: 'flex-start',
    height: hp('3%'),
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
    ...ApplicationStyles.fontStyles.caption,
    paddingHorizontal: wp('1.5%'),
  },
  moreContainer: { flex: 1, alignItems: 'flex-end' },
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
  body: { ...ApplicationStyles.fontStyles.body1, marginBottom: hp('2%') },
  moreStyle: { ...ApplicationStyles.body3, color: ApplicationStyles.primaryColor.color },
  subBody: { padding: wp('2%') },
  raisedMoney: { ...ApplicationStyles.info2, alignContent: 'center', justifyContent: 'center' },
});

function EventUi

// ({
//   title, description, comment, files, userName, userPicture, createdAt, onViewComments, onPress, containerStyle, theme, onDonatePress,
// }) {
//   return (
//     <View style={styles.container}>
//       <View style={[styles.subContainer]}>
//         <AvatarImage
//           source={{ uri: CommonFunctions.getFile(userPicture, 'avatar', true) }}
//         />
//         <View style={[styles.avatarContainer]}>
//           <View style={styles.avatarName}>
//             <Text style={ApplicationStyles.avatarTitle}>
//               {userName}
//             </Text>
//             {/* <Text style={[styles.medal]}>
//               <Icon name="md-medal" size={wp('4%')} color={Colors.golden} style={{ paddingHorizontal: wp('2%') }} />
//               {' '}
//             200
//             </Text> */}
//           </View>
//           <View style={styles.agoContainer}>
//             <Text style={styles.ago}>
//               { moment(createdAt).fromNow()}
//             </Text>
//           </View>

//         </View>
//         <View style={styles.moreContainer}>
//           <MenuDropdown
//             menuTitle={userName}
//             buttonStyle={[styles.moreWrapperStyle]}
//             menus={[
//               { label: isFollowed ? 'Unfollow' : 'Follow', func: () => followUnfollow({ type: 'homePagePosts', isFollowed, followeeId: userId._id }) },
//               { label: 'Copy Link', func: () => { Clipboard.setString('http://handoutapp.com'); Toast('Copied') } },
//               { label: 'Report', func: () => {} }]}
//             >
//             <Icon name="md-more" size={25} color={ApplicationStyles.darkColor.color} />
//           </MenuDropdown>
//         </View>
//       </View>
//       <View style={styles.imageContainer}>
//         <Swiper files={files} />
//         <View style={styles.userFeedBack}>
//           <ReactionsGot />
//           <Text style={{ ...ApplicationStyles.bodySubHeading2 }}>12M Shares</Text>
//         </View>
//         <View style={styles.subContainerSecond}>
//           <View style={styles.userActions}>
//             <Reaction />
//             <Button icon="share" iconSize={wp('5.3%')} iconFamily="SimpleLineIcons" style={styles.reaction} onLongPress={() => alert('longPress')} onPress={() => alert('shortPress')} />
//           </View>
//           <View style={styles.titleContainer}>
//             <Text style={ApplicationStyles.headline2}>{title}</Text>
//           </View>
//           <Text style={{ ...ApplicationStyles.bodySubHeading, paddingVertical: hp('0.6%'), alignSelf: 'flex-end' }}>12 Aug to 15 Sep 2019</Text>


//         </View>
//         <View style={styles.subBody}>
//           <Text style={styles.body}>
//             {description}
//             <Text style={styles.moreStyle}> more</Text>
//           </Text>
//         </View>
//         <View style={styles.subBody}>
//           {comment && comment.length > 0 && (
//           <View style={{
//             flexDirection: 'row',
//           }}
//           >
//             <AvatarImage
//               style={{
//                 paddingRight: wp('1%'),
//                 paddingTop: hp('0.57%'),
//               }}
//               size={wp('6%')}
//               source={{ uri: CommonFunctions.getFile(comment[0].userId.userPicture, 'avatar', true) }}
//             />


//             <Text style={{
//               ...ApplicationStyles.body3, flex: 1, flexWrap: 'wrap',
//             }}
//             >
//               <Text style={{ ...ApplicationStyles.info3 }}>
//                 {`${comment[0].userId.name} `}
//               </Text>
//               {comment[0].comment}
//             </Text>

//           </View>
//           )}
//           <Button
//             title="View comments"
//             titleStyle={{ ...ApplicationStyles.body3, textAlign: 'right' }}
//             onPress={onViewComments}
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

({
  _id, title, description, isFollowed, files, userId, userName, isRepost, repostOf, comment, userPicture, onRepostUserClick, onRepost, onUserClick, onViewComments, startTime, endTime, onReactionRemovePress, onReactionPress, onSharePress, reactionsCount, followUnfollow, sharesCount, topThreeReactions, createdAt, campaignGoal, howUserReacted, onPress, containerStyle, theme, onDonatePress,
}) {
  return (
    <View style={styles.container}>
      <View style={[styles.subContainer]}>
        
        <Button style={{ flex:5, flexDirection:'row'  }} buttonWrapperStyle={{ flex:1, flexDirection:'row' }} onPress={onUserClick}>
          <AvatarImage
            source={{ uri: CommonFunctions.getFile(userPicture, 'avatar', true) }}
          />
          <View style={[styles.avatarContainer]}>
          <View style={styles.avatarName}>
            <Text style={ApplicationStyles.fontStyles.body2}>
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

        </Button>

        <View style={styles.moreContainer}>
          <MenuDropdown
            menuTitle={userName}
            buttonStyle={[styles.moreWrapperStyle]}
            menus={[
              { label: isFollowed ? 'Unfollow' : 'Follow', func: () => followUnfollow() },
              { label: 'Repost', func: () => onRepost() },
              { label: 'Copy Link', func: () => { Clipboard.setString('http://handoutapp.com'); Toast('Copied') } },
              { label: 'Report', func: () => {} }]}
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
          <Text style={{ ...ApplicationStyles.fontStyles.caption }}>
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
            <Text style={ApplicationStyles.fontStyles.title}>{title}</Text>
          </View>
          <Text style={{ ...ApplicationStyles.fontStyles.caption, paddingVertical: hp('0.6%'), alignSelf: 'flex-end' }}>{moment(startTime).format('DD MMM')} to {moment(endTime).format('DD MMM YYYY')}</Text>
        </View>
        <View style={styles.subBody }>
          <Text style={[styles.body,isRepost?{marginBottom:0}:{}]} maxLength={wp('40%')}>
            <Text style={ApplicationStyles.fontStyles.body2}>
              {userName+' '} 
            </Text>
            {description}
          </Text>
          { isRepost && <Text style={[styles.body]} maxLength={wp('40%')}>
            <Text style={ApplicationStyles.fontStyles.body2} onPress={onRepostUserClick}>
            Reposted from {repostOf.userId.name+' '} 
            </Text>
            {repostOf.description}
          </Text>
          }
        </View>
        <View style={styles.commentContainer}>

        {/* <View style={styles.subBody}> */}
          {comment && comment.length > 0 && comment[0].userId && (
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
              ...ApplicationStyles.fontStyles.body1, flex: 1, flexWrap: 'wrap',
            }}
            >
              <Text style={{ ...ApplicationStyles.fontStyles.body2 }}>
                {`${comment[0].userId.name} `}
              </Text>
              {comment[0].comment}
            </Text>

          </View>
          )}
          <Button
            title="VIEW COMMENTS"
            titleStyle={{ ...ApplicationStyles.fontStyles.caption,color:ApplicationStyles.darkColor.color,textAlign: 'right' }}
            onPress={onViewComments}
          />
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


export default EventUi;
