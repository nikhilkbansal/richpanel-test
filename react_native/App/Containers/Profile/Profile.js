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
  nameDetail: { paddingHorizontal: wp('2%'), flex: 1, flexDirection: 'row' },
  info: { padding: wp('1%'), margin: wp('1%'), ...ApplicationStyles.fontStyles.caption },
});

function getRandomColor(){
  return 'red'
}
class Profile extends Component {
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
      recentPosts: []
    };
    this.getMyRecentPost = this.getMyRecentPost.bind(this);
  }

  componentDidMount() {
    this.getMyRecentPost();
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


  async getMyRecentPost( ) { 
    const { recentPosts } = this.state; 
    const { profile: { id} } = this.props; 
    try {
      const data = await AxiosRequest({
        method: 'get',
        params:{
          perPage: 9,
          userId: id 
        },
        url: '/post',
      });
      this.setState({ recentPosts: recentPosts.concat(data) });
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
    const { recentPosts } = this.state;
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation}      title="Profile" />
        {profile && (
        <ScrollView style={styles.subContainer}>
          <View style={styles.sectionContainer}>
            {/* <Image
              resizeMode="cover"
              style={{
                width: '100%',
                height: hp('35%'),
              }}
              source={ require('../../Assets/Images/child.jpeg')}
            /> */}
            <View
              style={[styles.imageButton, { justifyContent: 'center', alignContent: 'center', alignItems: 'center' }]}
            >
              <AvatarImage size={wp('14%')} source={{ uri: CommonFunctions.getFile(profile.picture, 'avatar', true) }}/>
            </View>
            <View style={styles.userInfo}>
              <View style={styles.nameDetail}>
                <View style={{ flex: 2 }}>
                  <Text style={ApplicationStyles.fontStyles.title}>{profile.name}</Text>
                  <Text style={ApplicationStyles.fontStyles.caption}>
                    @
                    {profile.userName}
                  </Text>
                </View> 
              </View>
              <View style={{ flexWrap: 'wrap', flex: 1, flexDirection: 'row' }}>
                {/* <Text style={styles.info}>
                  <Icon size={wp('4%')} name="md-female" color={ApplicationStyles.disabledColor.color} />
                  {' '}
                      Female

                </Text> */}

                {/* <Text style={styles.info}>
                  <Icon size={wp('4%')} name="md-pin" color={ApplicationStyles.disabledColor.color} />
                  {' '}
                      #123, Gold Street, USA

                </Text> */}
                <Text style={styles.info}>
                  {profile.email}
                </Text>
                {/* <Text style={styles.info}>
                     +9392992929
                </Text> */}
              </View>
              </View>
              <this.getEditIcon 
                      onPress={()=>navigation.navigate('EditProfile')}
                      style={{right:wp('2%'), borderRadius:wp('10%'), backgroundColor: ApplicationStyles.smokeBackground.color}}
                      iconColor={ApplicationStyles.disabledColor.color}  />
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
            

          <View style={[styles.sectionContainer,{flex:1, padding: wp('3%')} ]}>
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
          </View>
          {/* {profile.role ==='user' ? <View style={[styles.sectionContainer, ]}>
              <MenuItem rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} onPress={()=>navigation.navigate('Followings')} leftLabel='Followings' />
              <MenuItem rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} onPress={()=>navigation.navigate('MyDonations')} leftLabel='My Donations' />
              <MenuItem rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} onPress={()=>navigation.navigate('MyDonations')} leftLabel='Recurring Payments' />
              <MenuItem rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} leftLabel='Stats' />
              <MenuItem leftLabel='Logout' onPress={logoutInit}/>
            </View>
            :<View style={[styles.sectionContainer, { marginBottom: hp('2%') }]}>
              <MenuItem rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} onPress={()=>navigation.navigate('OrgInfo')} leftLabel='Organization Info' />
              <MenuItem rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} onPress={()=>navigation.navigate('PoSlider')} leftLabel='Carousel' />
              <MenuItem rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} onPress={()=>navigation.navigate('MyDonations')} leftLabel='Posts' />
              <MenuItem rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} onPress={()=>navigation.navigate('MyDonations')} leftLabel='Events' />
              <MenuItem rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} onPress={()=>navigation.navigate('MyDonations')} leftLabel='Jobs' />
              <MenuItem rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} onPress={()=>navigation.navigate('MyDonations')} leftLabel='Shop' />
              <MenuItem rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} onPress={()=>navigation.navigate('MyDonations')} leftLabel='Stats' />
              <MenuItem rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} onPress={()=>navigation.navigate('MyDonations', {forPo: true})} leftLabel='Donations' />
              <MenuItem rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} onPress={()=>navigation.navigate('MyDonations')} leftLabel='Recurring Donations' />
              <MenuItem rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} onPress={()=>navigation.navigate('AddBankAccount')} leftLabel='Bank details' />
              <MenuItem leftLabel='Logout' onPress={logoutInit} />

            </View>
            } */}

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
