import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView, StatusBar,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import UserActions from 'App/Stores/User/Actions';
import { connect } from 'react-redux';
import {
  Text, NavigationBar, TextInput, Button, ProgressiveImage, Swiper, Icon, MenuItem
} from '../../Components';
import {
  Colors, FontSizes, Fonts, ApplicationStyles,
} from '../../Theme';
import CommonFunctions from '../../Utils/CommonFunctions';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ApplicationStyles.smokeBackground.color },
  subContainer: { flex: 1, paddingHorizontal: wp('5%') },
  loginContainer: {
    marginVertical: hp('2%'),
    backgroundColor: ApplicationStyles.primaryColor.color,
    borderRadius: wp('2%'),
    width: wp('80%'),

    alignSelf: 'center',
    height: hp('6%'),
  },
  loginTitle: { color: ApplicationStyles.lightColor.color, textAlign: 'center', fontSize: FontSizes.h3 },
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
  imageButton: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('20%') / 2,
    borderColor: ApplicationStyles.primaryColor.color,
    justifyContent: 'center',
  },
  nameDetail: { paddingLeft: wp('2%'), flex: 1, flexDirection: 'row' },
  info: { padding: wp('1%'), margin: wp('1%'), ...ApplicationStyles.info3 },
  scrollButton: {
    flex:1,
    paddingVertical: hp('1%'),
    }
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
      <View style={{
        marginVertical: wp('2%'), marginHorizontal: wp('0.9%'), width: wp('28%'), padding: wp('0.5%'),
      }}
      >
        <View style={{
          width: '100%',
          height: wp('28%'),
          borderRadius: wp('1.5%'),
          ...ApplicationStyles.elevationS,
          overflow: 'hidden',
          justifyContent: 'center',
        }}
        >
          <Image
            resizeMode="contain"
            source={require('../../Assets/Images/child.jpeg')}
          />
        </View>
        {text && <Text
          style={{ width: '100%', textAlign: 'center', ...ApplicationStyles.bodyHeading }}
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

  render() {
    const { navigation, profile, logoutInit } = this.props;
    const {  activeTab } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} rightButtonAction={() => navigation.navigate('EditProfile')}  title="NGO" />

        <ScrollView style={styles.subContainer}>
          <View style={styles.sectionContainer}>
            <Swiper files={['sds', 'sds']} />
            <View style={{
              flex: 1,
              flexDirection: 'row',
              height: hp('8.5%'),
              paddingHorizontal: wp('3%'),
              marginTop: hp('2%'),
            }}
            >
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                // marginTop: -hp('5.5'),
                justifyItems: 'center',
              }}
              >
                <ProgressiveImage
                  resizeMode="cover"
                  containerStyle={{
                    width: '100%',
                    height: '100%',
                    borderRadius: wp('20%'),
                    overflow: 'hidden',
                  }}
                  style={{
                    ...ApplicationStyles.elevationS,
                    width: '100%',
                    height: '100%',
                  }}
                  source={{ uri: CommonFunctions.getFile('profil', 'avatar', true) }}
                />
              </View>
              <View style={{ flex: 5, alignItems: 'center' }}>
                <View style={[styles.nameDetail]}>
                  <View style={{
                    flex: 1,
                    alignItems: 'flex-start',
                    justifyItems: 'center',
                  }}
                  >
                    <View style={{flexDirection: 'row'}}>
                    <Text style={[ApplicationStyles.avatarTitle, { flex: 1 }]}>Goonj</Text>
                    <Button
                    title="Follow"
                    style={{
                      flex: 1,
                      alignItems:'flex-end'
                    }}
                    containerStyle={{ flex: 1 }}
                    buttonWrapperStyle={{
                      flex: 1,
                    }}
                    titleStyle={{ ...ApplicationStyles.button, color:ApplicationStyles.primaryColor.color }}
                  />
                    </View>
                    <Text style={[ApplicationStyles.bodySubHeading, { flex: 1 }]}>
                      @goonj12
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


              <View style={{ flexWrap: 'wrap', flex: 1, flexDirection: 'row' }}>
                {/* <Text style={styles.info}>
                  <Icon size={wp('4%')} name="md-female" color={ApplicationStyles.disabledColor.color} />
                  {' '}
                      Female

                </Text>

                <Text style={styles.info}>
                  {profile.email}
                </Text> */}
                {/* <Text style={styles.info}>
                     +9392992929
                </Text> */}
              </View>
              <Text style={[ApplicationStyles.body, { paddingHorizontal: wp('2%') }]} maxLength={wp('25%')}>
              We are a non-profit organization trying to channelize the urban surplus to support the rural needy. We have been collecting resource material that is not in use by individuals or organizations such as old clothes, discarded computers, waste paper, newspapers etc.
              We dispatch approx. 70 tons of material every month to various parts of the country depending on the requirements we receive from our partner organizations.
              We have been called India's Largest Non-Monetary Resource Mobilization firm.
              </Text>
            </View>
          </View>
          {/* <View style={{
            paddingTop: hp('3%'),
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
          }}
          >
            <Text style={{ ...ApplicationStyles.avatarTitle }}>
                     Posts & Campaigns
            </Text>
            <Button
              style={{
                borderRadius: wp('2%'),
                alignSelf: 'flex-end',
                paddingHorizontal: wp('1%'),
              }}
              titleStyle={{ ...ApplicationStyles.link }}
              onPress={() => navigation.navigate('HomePage')}
              title="See all"
            />
          </View>

          <FlatList
            data={[{ empty: true }, { a: 3 }, { a: 3 }, { a: 3 }, { a: 3 }]}
            style={{ flex: 1 }}
            showsHorizontalScrollIndicator={false}
            renderItem={this.postItem}
            horizontal
          />

          <View style={{
            paddingTop: hp('3%'),
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
          }}
          >
            <Text style={{ ...ApplicationStyles.avatarTitle }}>
                    Events
            </Text>
            <Button
              style={{
                borderRadius: wp('2%'),
                alignSelf: 'flex-end',
                paddingHorizontal: wp('1%'),
              }}
              titleStyle={{ ...ApplicationStyles.link }}
              onPress={() => navigation.navigate('HomePage')}
              title="See all"
            />
          </View>

          <FlatList
            data={[{ empty: true }, { a: 3 }, { a: 3 }, { a: 3 }, { a: 3 }]}
            style={{ flex: 1 }}
            showsHorizontalScrollIndicator={false}
            renderItem={this.postItem}
            horizontal
          /> */}
          {/* <Button
            style={styles.loginContainer}
            onPress={() => navigation.navigate('HomePage')}
            buttonWrapperStyle={{
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ ...ApplicationStyles.button }}>Help Goonj</Text>
            <Text style={{ ...ApplicationStyles.tabLabelStyle, color: ApplicationStyles.lightBackground.color }}>3 ways</Text>
          </Button> */}
          <View style={[styles.sectionContainer, {flex:1, flexDirection: 'column',paddingBottom:0, backgroundColor: ApplicationStyles.smokeBackground.color,  }]}>
                <View   style={{flex:1,  backgroundColor:ApplicationStyles.grayishBackground.color , flexDirection:'row', justifyContent: 'space-around'}}>
                    <Button title='Posts' onPress={()=>this.setActiveTab('post')} buttonWrapperStyle={{ margin:0,padding:0, paddingVertical: hp('0.7%')}} style={[styles.scrollButton,activeTab === 'post' ? { backgroundColor: ApplicationStyles.lightBackground.color}: '']} titleStyle={[ApplicationStyles.button2,{color: ApplicationStyles.darkColor.color,textAlign:'center'}]} />
                    <Button title='Events' onPress={()=>this.setActiveTab('event')} style={[{borderColor: ApplicationStyles.lightBackground.color, borderWidth: StyleSheet.hairlineWidth, borderBottomColor: 'transparent', borderTopColor: 'transparent'},styles.scrollButton,activeTab === 'event' ? { backgroundColor: ApplicationStyles.lightBackground.color}: '']} titleStyle={[ApplicationStyles.button2,{color: ApplicationStyles.darkColor.color, textAlign:'center'}]}/>
                    <Button title='Shop' onPress={()=>this.setActiveTab('shop')} style={[styles.scrollButton,activeTab === 'shop' ? { backgroundColor: ApplicationStyles.lightBackground.color}: '']} titleStyle={[ApplicationStyles.button2,{color: ApplicationStyles.darkColor.color,textAlign:'center'}]}/>
                  </View>
                <View  style={{flex:1, minHeight: hp('20%'), flexWrap:'wrap', flexDirection:'row',backgroundColor: ApplicationStyles.lightBackground.color, justifyContent: 'space-around', }}>
                  {this.postItem(activeTab === 'event')}
                  {this.postItem(activeTab === 'event')}
                  {this.postItem(activeTab === 'event')}
                  {this.postItem(activeTab === 'event')}
                  {this.postItem(activeTab === 'event')}
                  {this.postItem(activeTab === 'event')}
                  {this.postItem(activeTab === 'event')}
                  {this.postItem(activeTab === 'event')}
                  {this.postItem(activeTab === 'event')}
                </View>
                <Button title='View All' style={{backgroundColor:ApplicationStyles.lightBackground.color,paddingBottom:hp('1%')}} titleStyle={{...ApplicationStyles.button2}}/>
            </View>
            
          <View style={[styles.sectionContainer, { marginBottom: hp('2%') }]}>
            <MenuItem leftIcon={{ size:wp('4%'),name: 'organization', family: 'SimpleLineIcons'}}  rightIcon={{name: 'ios-arrow-forward', family: 'Ionicons'}} leftLabel='Jobs' />
            <MenuItem leftIcon={{ size:wp('4.5%'),name: 'web', family: 'MaterialCommunityIcons'}}  rightLabel='www.goonj.com' leftLabel='Website' />         
          </View>
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
