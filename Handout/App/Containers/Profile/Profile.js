import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView, StatusBar, processColor
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import UserActions from 'App/Stores/User/Actions';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import AxiosRequest from '../../Services/HttpRequestService';
import {
  Text, NavigationBar, EmptyState, Button, ProgressiveImage, MenuItem, AvatarImage
} from '../../Components';
import {
  Colors, FontSizes, Fonts, ApplicationStyles,
} from '../../Theme';
import CommonFunctions from '../../Utils/CommonFunctions';
import { XAxis, Grid, LineChart } from 'react-native-svg-charts' 

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ApplicationStyles.smokeBackground.color },
  subContainer: { flex: 1, paddingHorizontal: wp('1%') },
  loginContainer: {
    marginVertical: hp('4%'),
    backgroundColor: ApplicationStyles.primaryColor.color,
    borderRadius: wp('2%'),
    width: wp('80%'),
    alignSelf: 'center',
    height: hp('7%'),
  },
  loginTitle: { color: ApplicationStyles.lightColor.color, textAlign: 'center', fontSize: FontSizes.h3 },
  sectionContainer: {
    backgroundColor: ApplicationStyles.lightBackground.color,
    ...ApplicationStyles.elevationS,
    flex: 1,
    borderRadius: wp('2%'),
    overflow: 'hidden',
    marginTop: hp('3%'),
  },
  userInfo: {
    padding: wp('2%'),
    borderRadius: wp('2%'),
    marginTop: -hp('1%'),
    paddingLeft: wp('4%'),
    backgroundColor: ApplicationStyles.lightBackground.color,

  },
  imageButton: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('20%') / 2,
    overflow: 'hidden',
    borderColor: ApplicationStyles.primaryColor.color,
    marginLeft: wp('4%'),
    justifyContent: 'center',
    marginVertical: wp('2%'),
  },
  tabContent: {flex:1, minHeight: hp('20%'), flexWrap:'wrap', flexDirection:'row',backgroundColor: ApplicationStyles.lightBackground.color, flexDirection:'row',  justifyContent:'center', },
  postImage: {
    // width: '100%',
    margin: wp('2%'), 

    width: wp('28%'),
    height: wp('28%'),
    borderRadius: wp('1.5%'),
    ...ApplicationStyles.elevationS,
    overflow: 'hidden',
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // marginTop: -hp('5.5'),
    // justifyItems: 'center',
  },
  avatarImageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: wp('20%'),
    overflow: 'hidden',
  },
  avatarImage: {
    ...ApplicationStyles.elevationS,
    width: '100%',
    height: '100%',
  },
  sectionSubContainer:{
    flex: 1,
    flexDirection: 'row', 
    paddingVertical: wp('3%'),
    paddingHorizontal: wp('3%'),
    // marginTop: hp('2%'),
  },
  nameContainer: { flex: 5, alignItems: 'center' },
  nameSubContainer:{
    flex: 1,
    alignItems: 'flex-start',
    // justifyItems: 'center',
  },
  poNameContainer: {flexDirection: 'row'},
  poName: {...ApplicationStyles.fontStyles.body2, flex: 1 },
  follow:{
    flex: 1,
    alignItems:'flex-end'
  },
  followButton:{ flex: 1 },
  nameDetail: { paddingHorizontal: wp('2%'), flex: 1, flexDirection: 'row' },
  info: { padding: wp('1%'), margin: wp('1%'), ...ApplicationStyles.fontStyles.caption },
});


class Profile extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    const { profile, navigation:{ state: { params }} } = props;
    const isMe = !params || !params.userId ||params.userId === profile.id;;

    this.state = {
      email: null,
      password: '',
      checked: false,
      recentPosts: [],
      isMe,
      isFollowed: false,
      userInfo: {},
      userId: params && params.userId ? params.userId : profile.id
    };
    this.getMyRecentPost = this.getMyRecentPost.bind(this);
    this.getPoInfo = this.getPoInfo.bind(this);
    this.checkIfFollowed = this.checkIfFollowed.bind(this);
    this.followUnfollow = this.followUnfollow.bind(this);
  }

  componentDidMount() {
    this.getMyRecentPost();
    this.getPoInfo();

    const { isMe } = this.state

    !isMe && this.checkIfFollowed(); 

  }

  postItem(data) {
    return ( 
        <View style={styles.postImage}
        >
          <ProgressiveImage
            resizeMode="cover"
            style={{width:'100%', height: '100%'}}
            source={{uri: CommonFunctions.getFile(data.files[0],'videoThumb')}}
          />
      </View>

    );
  }

  async getPoInfo( ) { 
    const { userId} = this.state; 
    try {
      const data = await AxiosRequest({
        method: 'get', 
        url: `/users/${userId}`,
      });
      this.setState({ userInfo: data });
    } catch (e) {
      console.log('error',e)
    }
  }

  async getMyRecentPost( ) { 
    const { recentPosts, userId } = this.state;  
    try {
      const data = await AxiosRequest({
        method: 'get',
        params:{
          perPage: 9,
          userId: userId
        },
        url: '/post',
      });
      this.setState({ recentPosts: recentPosts.concat(data) });
    } catch (e) {
      console.log('error',e)
    }
  }

  async checkIfFollowed( ) { 
    const { profile } = this.props;
    const { userId } = this.state; 
    try {
      const data = await AxiosRequest({
        method: 'get', 
        params:{ 
          followerId: profile.id,
          followeeId: userId,
        },
        url: `/follow`,
      });
      const isFollowed = data.length > 0;
      this.setState({ isFollowed });
    } catch (e) {
      console.log('error',e)
    }
  }

  async followUnfollow() { 
    const { userId, userInfo } = this.state; 
    try {
      const data = await AxiosRequest({
        method: 'post', 
        data:{ 
          followeeId: userId,
        },
        url: `/follow`,
      });
      this.setState({ isFollowed:  data.isFollowed, userInfo: {...userInfo, followerCount: data.isFollowed ? userInfo.followerCount+1 : userInfo.followerCount-1 } });
    } catch (e) {
      console.log('error',e)
    }
  }
 

  getEditIcon({ iconColor, style = {}, buttonWrapperStyle = {}, onPress }){
      return <Button 
      icon='md-create'
      iconColor={iconColor}
      iconSize={wp('5.5%')}
      onPress={onPress}
      style={[{width:wp('8%'), height: wp('8%'), position: 'absolute', top: hp('1%'), right: wp('2%')}, style]}
      buttonWrapperStyle={[{padding:wp('2%'), borderRadius: wp('10%')},buttonWrapperStyle]}
      />
 
  }
  render() {
    const { navigation, profile, logoutInit } = this.props;
    const { recentPosts, isMe, userInfo, isFollowed } = this.state;
    const realUserInfo = isMe ? profile : userInfo;
    // const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation}      title="Profile" />
        {userInfo && (
        <ScrollView style={styles.subContainer}>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionSubContainer}
            >
              <View style={styles.avatarContainer}
              >
                <AvatarImage
                  size={wp('14%')}
                  // containerStyle={styles.avatarImageContainer}
                  source={{ uri: CommonFunctions.getFile(realUserInfo.picture, 'avatar', true) }}
                />
              </View>
              <View style={styles.nameContainer}>
                <View style={[styles.nameDetail]}>
                  <View style={styles.nameSubContainer}
                  >
                    <View style={styles.poNameContainer}>
                    <Text style={styles.poName}>{realUserInfo.name}</Text>
                    {!isMe 
                    ? <Button
                      title={isFollowed ? "Unfollow" : "Follow"}
                      style={styles.follow}
                      onPress={this.followUnfollow}
                      containerStyle={styles.followButton}
                      buttonWrapperStyle={styles.followButton}
                      titleStyle={{ ...ApplicationStyles.fontStyles.button, color:ApplicationStyles.primaryColor.color }}
                    />
                    : <this.getEditIcon 
                      onPress={()=>navigation.navigate('EditProfile')}
                      style={{right:0, borderRadius:wp('10%'), backgroundColor: ApplicationStyles.smokeBackground.color}}
                      iconColor={ApplicationStyles.disabledColor.color}  />
                    }
                    </View>
                    <Text style={[ApplicationStyles.fontStyles.caption, { flex: 1 }]}>
                      @{realUserInfo.userName}
                    </Text>
                    <Text style={[ApplicationStyles.fontStyles.caption, { flex: 1 }]}>
                      {CommonFunctions.getFollowerCount(userInfo.followerCount)} { CommonFunctions.getPluralString('Follower', userInfo.followerCount)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>  
          </View>

          <View style={[styles.sectionContainer, styles.tabContainer]}>
               <View style={styles.tabContent}>
                  {recentPosts.length === 0
                    ? <EmptyState message="No posts availble" containerStyle={{ marginTop: hp('4%'), marginBottom: hp('5%') }} messageContainerStyle={ {backgroundColor: ApplicationStyles.lightColor.color}}/>
                    : <Fragment>
                        {recentPosts.map(o=>this.postItem(o))}
                      </Fragment>
                  }
                </View> 
                {recentPosts.length !== 0 && <Button title='VIEW ALL' style={styles.viewAll}  titleStyle={{...ApplicationStyles.fontStyles.button}}/>}
            </View>
            

          {/* <View style={[styles.sectionContainer,{flex:1, padding: wp('3%')} ]}>
            <Text style={{ ...ApplicationStyles.fontStyles.body1, textAlign: 'center'}}>This month's handouts</Text>
            <LineChart
              style={{ height: 200 }}
              data={ [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]}
              showGrid
              animate
              animationDuration={400}
              contentInset={{ top: hp('1%'), bottom: hp('1%') }}
              // curve={shape.curveNatural}
              svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
              >
                <Grid />
            </LineChart>
            <XAxis
                    style={{ marginHorizontal: -10 }}
                    data={[50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]}
                    formatLabel={(value, index) => index}
                    contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                />
          </View> */}
        </ScrollView>
        )}

      </View>
    );
  }
}
export default connect(
  ({ user: { profile } }) => ({ profile }), {
    logoutInit: UserActions.logoutInit,
  },
)(Profile);
