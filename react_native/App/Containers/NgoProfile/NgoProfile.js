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
    this.state = {
      email: null,
      password: '',
      checked: false,
      activeTab: 'post'
    };
    this.setActiveTab = this.setActiveTab.bind(this);
  }

  componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(ApplicationStyles.primaryColor.color);
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  postItem(text = false) {
    return (
      <View style={styles.postContainer}
      >
        <View style={styles.postImage}
        >
          <Image
            resizeMode="contain"
            source={require('../../Assets/Images/child.jpeg')}
          />
        </View>
        {text && <Text
          style={styles.postTitle}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
        Help ing kids to get better education

        </Text>}
      </View>

    );
  }

  setActiveTab(tab){
    this.setState({activeTab: tab})
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
    const {  activeTab } = this.state;
    const poData = profile;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} goBack={()=>navigation.goBack()} rightButtonAction={() => navigation.navigate('EditProfile')}  title="PO Profile" />
        <ScrollView style={styles.subContainer}>
          <View style={styles.sectionContainer}>
            <Swiper files={poData.poInfo.carousel} />
            <this.getEditIcon 
              onPress={()=>navigation.navigate('PoSlider')}
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
                    {/* <Button
                      title="Follow"
                      style={styles.follow}
                      containerStyle={styles.followButton}
                      buttonWrapperStyle={styles.followButton}
                      titleStyle={{ ...ApplicationStyles.button, color:ApplicationStyles.primaryColor.color }}
                    /> */}
                  <this.getEditIcon 
                    onPress={()=>navigation.navigate('EditProfile')}
                    style={{right: 0}}
                    iconColor={ApplicationStyles.darkColor.color}  />
                    </View>
                    <Text style={[ApplicationStyles.bodySubHeading, { flex: 1 }]}>
                      @{poData.userName}
                    </Text>
                    <Text style={[ApplicationStyles.bodySubHeading2, { flex: 1 }]}>
                      500+ Followers
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
                iconColor={ApplicationStyles.darkColor.color} 
                style={{bottom: hp('1%'), top:null}} />
 
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
                    <Button title='Posts' onPress={()=>this.setActiveTab('post')} buttonWrapperStyle={{ margin:0,padding:0, paddingVertical: hp('0.7%')}} style={[styles.scrollButton,activeTab === 'post' ? { backgroundColor: ApplicationStyles.lightBackground.color}: '']} titleStyle={[ApplicationStyles.button2,{color: ApplicationStyles.darkColor.color,textAlign:'center'}]} />
                    <Button title='Events' onPress={()=>this.setActiveTab('event')} style={[{borderColor: ApplicationStyles.lightBackground.color, borderWidth: StyleSheet.hairlineWidth, borderBottomColor: 'transparent', borderTopColor: 'transparent'},styles.scrollButton,activeTab === 'event' ? { backgroundColor: ApplicationStyles.lightBackground.color}: '']} titleStyle={[ApplicationStyles.button2,{color: ApplicationStyles.darkColor.color, textAlign:'center'}]}/>
                    <Button title='Shop' onPress={()=>this.setActiveTab('shop')} style={[styles.scrollButton,activeTab === 'shop' ? { backgroundColor: ApplicationStyles.lightBackground.color}: '']} titleStyle={[ApplicationStyles.button2,{color: ApplicationStyles.darkColor.color,textAlign:'center'}]}/>
                  </View>
                <View  style={styles.tabContent}>
                  <EmptyState message="No posts availble" containerStyle={{ marginTop: hp('4%'), marginBottom: hp('5%') }} messageContainerStyle={ {backgroundColor: ApplicationStyles.lightColor.color}}/>
                  {/* {this.postItem(activeTab === 'event')}
                  {this.postItem(activeTab === 'event')}
                  {this.postItem(activeTab === 'event')}
                  {this.postItem(activeTab === 'event')}
                  {this.postItem(activeTab === 'event')}
                  {this.postItem(activeTab === 'event')}
                  {this.postItem(activeTab === 'event')}
                  {this.postItem(activeTab === 'event')}
                  {this.postItem(activeTab === 'event')} */}
                </View>
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
