import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView, StatusBar,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import UserActions from 'App/Stores/User/Actions';
import { connect } from 'react-redux';
import {
  Text, EmptyState, NavigationBar, TextInput, Button, ProgressiveImage, Swiper, Icon, MenuItem
} from '../../Components';
import {
  Colors, FontSizes, Fonts, ApplicationStyles,
} from '../../Theme';
import CommonFunctions from '../../Utils/CommonFunctions';
import AxiosRequest from '../../Services/HttpRequestService';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ApplicationStyles.smokeBackground.color },
  subContainer: { flex: 1, paddingHorizontal: wp('5%') },
  sectionContainer: {
    ...ApplicationStyles.elevationS,
    flex: 1,
    borderRadius: wp('2%'),
    overflow: 'hidden',
    marginTop: hp('3%'),
    paddingBottom: hp('1%'),
    backgroundColor: ApplicationStyles.lightBackground.color,
  },
  userInfo: {
    padding: wp('2%'),
    borderRadius: wp('1%'),
    backgroundColor: ApplicationStyles.lightBackground.color,
  },

  nameDetail: { paddingLeft: wp('2%'), flex: 1, flexDirection: 'row' },
  info: { padding: wp('1%'), margin: wp('1%'), ...ApplicationStyles.info3 },
  scrollButton: {
    flex:1,
    paddingVertical: hp('1%'),
  },
  sectionSubContainer:{
    flex: 1,
    flexDirection: 'row',
    height: hp('8.5%'),
    paddingHorizontal: wp('3%'),
    marginTop: hp('2%'),
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
  nameContainer: { flex: 5, alignItems: 'center' },
  nameSubContainer:{
    flex: 1,
    alignItems: 'flex-start',
    // justifyItems: 'center',
  },
  poNameContainer: {flexDirection: 'row'},
  poName: {...ApplicationStyles.avatarTitle, flex: 1 },
  follow:{
    flex: 1,
    alignItems:'flex-end'
  },
  followButton:{ flex: 1 },
  postContainer: {
    marginVertical: wp('2%'), marginHorizontal: wp('0.9%'), width: wp('28%'), padding: wp('0.5%'),
  },
  postImage: {
    width: '100%',
    height: wp('28%'),
    borderRadius: wp('1.5%'),
    ...ApplicationStyles.elevationS,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  postTitle: { width: '100%', textAlign: 'center', ...ApplicationStyles.bodyHeading },
  tabContainer: {flex:1, flexDirection: 'column',paddingBottom:0, backgroundColor: ApplicationStyles.smokeBackground.color, marginBottom: hp('2%'), },
  tabs: {flex:1,  backgroundColor:ApplicationStyles.grayishBackground.color , flexDirection:'row', justifyContent: 'space-around'},
  tabContent: {flex:1, minHeight: hp('20%'), flexWrap:'wrap', flexDirection:'row',backgroundColor: ApplicationStyles.lightBackground.color, justifyContent: 'space-around', },
  viewAll: {backgroundColor:ApplicationStyles.lightBackground.color,paddingBottom:hp('1%')},
});

class NgoProfile extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    const { profile, navigation:{ state: { params }} } = props;
    const isMe = !params || !params.poUserId ||params.poUserId === profile.id;;

    this.state = {
      isMe,
      email: null,
      password: '',
      checked: false,
      activeTab: 'post',
      recentPosts: [],
      recentEvents: [],
      poInfo: null,
      poUserId: params && params.poUserId ? params.poUserId : profile.id
    };
    this.setActiveTab = this.setActiveTab.bind(this);
    this.getMyRecentPost = this.getMyRecentPost.bind(this);
    this.getMyRecentEvents = this.getMyRecentEvents.bind(this);
    this.getEditIcon = this.getEditIcon.bind(this);
  }

  componentDidMount() {
    const { navigation:{ state: { params }} } = this.props
    const { isMe } = this.state

    !isMe && this.checkIfFollowed(); 

    if(params && params.poUserId) this.getPoInfo();

    this.getMyRecentPost();
    this.getMyRecentEvents();
  } 

  async getMyRecentPost( ) { 
    const { recentPosts, poUserId } = this.state; 
    try {
      const data = await AxiosRequest({
        method: 'get',
        params:{ perPage: 9, userId: poUserId },
        url: '/post',
      });
      this.setState({ recentPosts: recentPosts.concat(data) });
    } catch (e) {
      console.log('error',e)
    }
  }

  async getPoInfo( ) { 
    const { poUserId} = this.state; 
    try {
      const data = await AxiosRequest({
        method: 'get', 
        url: `/users/${poUserId}`,
      });
      this.setState({ poInfo: data });
    } catch (e) {
      console.log('error',e)
    }
  }

  async checkIfFollowed( ) { 
    const { poUserId} = this.state; 
    try {
      const data = await AxiosRequest({
        method: 'get', 
        params:{ },
        url: ` v1/follow`,
      });
      this.setState({ poInfo: data });
    } catch (e) {
      console.log('error',e)
    }
  }

 

  async getMyRecentEvents( ) { 
    const { recentEvents, poUserId} = this.state; 
    try {
      const data = await AxiosRequest({
        method: 'get',
        params:{ perPage: 9, userId: poUserId },
        url: '/event',
      });
      this.setState({ recentEvents: recentEvents.concat(data) });
    } catch (e) {
      console.log('error',e)
    }
  }
  
  postItem(data, text = false) {
    return (
      <View style={styles.postContainer}
      >
        <View style={styles.postImage}
        >
          <ProgressiveImage
            resizeMode="cover"
            style={{width:'100%', height: '100%'}}
            source={{uri: CommonFunctions.getFile(data.files[0])}}
          />
        </View> 
      </View>

    );
  }

  setActiveTab(tab){
    this.setState({activeTab: tab})
  }
  

  getEditIcon({ iconColor, style = {}, buttonWrapperStyle = {}, onPress }){
    const { isMe } = this.state;

    if(isMe){
      return <Button 
      icon='md-create'
      iconColor={iconColor}
      iconSize={wp('5.5%')}
      onPress={onPress}
      style={[{width:wp('8%'), height: wp('8%'), position: 'absolute', top: hp('1%'), right: wp('2%')}, style]}
      buttonWrapperStyle={[{padding:wp('2%'), borderRadius: wp('10%')},buttonWrapperStyle]}
      />
    }
    return null;
 
  }

  render() {
    const { navigation, profile, logoutInit } = this.props;
    const {  activeTab, recentPosts, poInfo, recentEvents, isMe } = this.state;
    const poData = poInfo || profile;
    const postsOrEvents = activeTab === 'post'? recentPosts : recentEvents;
    let activeTabStyle = {borderBottomColor: ApplicationStyles.primaryColor.color, borderBottomWidth:wp('0.5%'),}
    let activeTabLabelStyle = {color: ApplicationStyles.primaryColor.color,}
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} statusBarColor={ApplicationStyles.primaryColor.color} goBack={()=>navigation.goBack()} rightButtonAction={() => navigation.navigate('EditProfile')}  title="PO Profile" />
        <ScrollView style={styles.subContainer}>
          <View style={styles.sectionContainer}>
            <Swiper files={poData.poInfo.carousel.length > 0 ? poData.poInfo.carousel: ['default']} />
            <this.getEditIcon 
              onPress={()=>navigation.navigate('PoSlider')}
              style={{borderRadius:wp('10%'), backgroundColor: ApplicationStyles.smokeBackground.color}}
              iconColor={ApplicationStyles.lightColor.color}  />
            <View style={styles.sectionSubContainer}
            >
              <View style={styles.avatarContainer}
              >
                <ProgressiveImage
                  resizeMode="cover"
                  containerStyle={styles.avatarImageContainer}
                  style={styles.avatarImage}
                  source={{ uri: CommonFunctions.getFile(poData.picture, 'avatar', true) }}
                />
              </View>
              <View style={styles.nameContainer}>
                <View style={[styles.nameDetail]}>
                  <View style={styles.nameSubContainer}
                  >
                    <View style={styles.poNameContainer}>
                    <Text style={styles.poName}>{poData.name}</Text>
                    {!isMe 
                    ? <Button
                      title="Follow"
                      style={styles.follow}
                      containerStyle={styles.followButton}
                      buttonWrapperStyle={styles.followButton}
                      titleStyle={{ ...ApplicationStyles.button, color:ApplicationStyles.primaryColor.color }}
                    />
                    : <this.getEditIcon 
                      onPress={()=>navigation.navigate('EditProfile')}
                      style={{right:0, borderRadius:wp('10%'), backgroundColor: ApplicationStyles.smokeBackground.color}}
                      iconColor={ApplicationStyles.lightColor.color}  />
                    }
                    </View>
                    <Text style={[ApplicationStyles.bodySubHeading, { flex: 1 }]}>
                      @{poData.userName}
                    </Text>
                    <Text style={[ApplicationStyles.bodySubHeading2, { flex: 1 }]}>
                      {CommonFunctions.getFollowerCount(poData.followerCount)} { CommonFunctions.getPluralString('Follower', poData.followerCount)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>        
            <View style={[styles.userInfo, {
              flex:1,
              flexDirection: 'row', 
              justifyContent:'space-between',
              paddingHorizontal: wp('4%'),
              alignItems:'center' }]}>
            <Button
                icon="speech"
                iconFamily='SimpleLineIcons'
                style={{
                  flex: 1,
                }}
                containerStyle={{ flex: 1 }}
                onPress={{}}
                buttonWrapperStyle={{
                  flex: 1,
                  paddingVertical: hp('0.7%'),
                }}
                iconSize={wp('5.8%')}
                titleStyle={{ ...ApplicationStyles.button, color:ApplicationStyles.primaryColor.color}}
              />
              <Button
                icon="donate"
                iconFamily='custom'
                style={{
                  flex: 1,
                  alignItems:'center'
                }}
                onPress={()=>navigation.navigate('Donate', {})}
                iconSize={wp('6.2%')}
                containerStyle={{ flex: 1 }}
                buttonWrapperStyle={{
                  flex: 1,
                }}
                titleStyle={{ ...ApplicationStyles.button, color:ApplicationStyles.primaryColor.color}}
              />
              <Button icon="share" iconSize={wp('5.3%')} iconFamily="SimpleLineIcons" style={{ flex:1, alignItems:'flex-end'}}   />

            </View>
            <View style={[styles.userInfo, { paddingTop: hp('0.1%') }]}>
              <this.getEditIcon 
                onPress={()=>navigation.navigate('OrgInfo')}
                iconColor={ApplicationStyles.lightColor.color}
                style={{bottom: hp('1%'), top:null, borderRadius:wp('10%'), backgroundColor: ApplicationStyles.smokeBackground.color}}
              />
 
              <Text style={[ApplicationStyles.body, { paddingHorizontal: wp('2%') }]} maxLength={wp('25%')}>
                {poData.poInfo.about}
              </Text>
              
              <View style={{marginTop: hp('2%'),flex:1, flexDirection: 'row'}}>
                <Text style={[ApplicationStyles.link, {width: wp('20%'),  color: ApplicationStyles.darkColor.color, paddingLeft: wp('2%') }]} maxLength={wp('25%')}>
                  Founded:
                </Text>
                <Text style={[ApplicationStyles.body, {   }]} maxLength={wp('25%')}>
                {poData.poInfo.founded || 'N/A' }
                </Text>
              </View>

              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={[ApplicationStyles.link, {width: wp('20%'),  color: ApplicationStyles.darkColor.color, paddingLeft: wp('2%') }]} maxLength={wp('25%')}>
                  Website:
                </Text>
                <Text style={[ApplicationStyles.body, {   }]} maxLength={wp('25%')}>
                  {poData.poInfo.website || 'N/A' }
                </Text>
              </View>
              
            </View>
          </View>
         
          <View style={[styles.sectionContainer, styles.tabContainer]}>
                <View   style={styles.tabs}>
                    <Button title='Posts' onPress={()=>this.setActiveTab('post')} 
                      buttonWrapperStyle={{  height: '100%',  margin:0,padding:0, paddingVertical: hp('0.7%')}}
                      style={[styles.scrollButton,activeTab === 'post' ? activeTabStyle : '']}
                      titleStyle={[ ApplicationStyles.button2,{color: ApplicationStyles.disabledColor.color,textAlign:'center'},activeTab === 'post' ? activeTabLabelStyle:"",]} />
                    <Button title='Events' onPress={()=>this.setActiveTab('event')}
                      buttonWrapperStyle={{  height: '100%',  margin:0,padding:0, paddingVertical: hp('0.7%')}}
                      style={[styles.scrollButton,activeTab === 'event' ? activeTabStyle : '']}
                      titleStyle={[ ApplicationStyles.button2,{color: ApplicationStyles.disabledColor.color,textAlign:'center'},activeTab === 'event' ? activeTabLabelStyle:"",]} />
                    <Button title='Shop' onPress={()=>this.setActiveTab('shop')}
                      buttonWrapperStyle={{  height: '100%',  margin:0,padding:0, paddingVertical: hp('0.7%')}}
                      style={[styles.scrollButton,activeTab === 'shop' ? activeTabStyle : '']}
                      titleStyle={[ ApplicationStyles.button2,{color: ApplicationStyles.disabledColor.color,textAlign:'center'},activeTab === 'shop' ? activeTabLabelStyle:"",]} />
                  </View>
                { ['post', 'event'].includes(activeTab) ? <View style={styles.tabContent}>
                  {postsOrEvents.length === 0
                    ? <EmptyState message="No posts availble" containerStyle={{ marginTop: hp('4%'), marginBottom: hp('5%') }} messageContainerStyle={ {backgroundColor: ApplicationStyles.lightColor.color}}/>
                    : <Fragment>
                        {postsOrEvents.map(o=>this.postItem(o, activeTab === 'event'))}
                      </Fragment>
                  }
                </View>
                :<View style={styles.tabContent}>
                   <EmptyState message="No products availble" containerStyle={{ marginTop: hp('4%'), marginBottom: hp('5%') }} messageContainerStyle={ {backgroundColor: ApplicationStyles.lightColor.color}}/>
                </View>
                }
                <Button title='View All' style={styles.viewAll}  titleStyle={{...ApplicationStyles.button2}}/>
            </View>
            
          {/* <View style={[styles.sectionContainer, { marginBottom: hp('2%') }]}>
            <MenuItem leftIcon={{ size:wp('4%'),name: 'organization', family: 'SimpleLineIcons'}}  rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} leftLabel='Jobs' />
            <MenuItem leftIcon={{ size:wp('4.5%'),name: 'web', family: 'MaterialCommunityIcons'}}  rightLabel='www.goonj.com' leftLabel='Website' />         
          </View> */}
        </ScrollView>
      </View>
    );
  }
}
export default connect(
  ({ user: { profile } }) => ({ profile }), {
    logoutInit: UserActions.logoutInit,
  },
)(NgoProfile);
