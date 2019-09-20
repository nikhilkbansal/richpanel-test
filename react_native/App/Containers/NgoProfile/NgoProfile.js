import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView, StatusBar,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import UserActions from 'App/Stores/User/Actions';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {
  Text, NavigationBar, TextInput, Button, ProgressiveImage, Swiper,
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
    backgroundColor: Colors.primary,
    borderRadius: wp('2%'),
    width: wp('80%'),

    alignSelf: 'center',
    height: hp('6%'),
  },
  loginTitle: { color: Colors.lightFont, textAlign: 'center', fontSize: FontSizes.h3 },
  sectionContainer: {
    elevation: 2,
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
    borderColor: Colors.primary,
    justifyContent: 'center',
  },
  nameDetail: { paddingHorizontal: wp('3%'), flex: 1, flexDirection: 'row' },
  info: { padding: wp('1%'), margin: wp('1%'), ...ApplicationStyles.info3 },
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
    };
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

  postItem({ item }) {
    return (
      <View style={{
        marginVertical: wp('2%'), marginHorizontal: wp('0.9%'), width: wp('35%'), padding: wp('0.5%'),
      }}
      >
        <View style={{
          width: '100%',
          height: wp('34%'),
          borderRadius: wp('1.5%'),
          elevation: 2,
          overflow: 'hidden',
          justifyContent: 'center',
        }}
        >
          <Image
            resizeMode="cover"
            source={require('../../Assets/Images/child.jpeg')}
          />
        </View>
        <Text
          style={{ width: '100%', textAlign: 'center', ...ApplicationStyles.bodyHeading }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
        Help ing kids to get better education

        </Text>
      </View>

    );
  }

  render() {
    const { navigation, profile, logoutInit } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} rightButtonAction={() => navigation.navigate('EditProfile')} showLeftSection={false} showRightSection rightIcon="md-create" title="Profile" />

        <ScrollView style={styles.subContainer}>
          <View style={styles.sectionContainer}>
            <Swiper files={['aasa', 'asaa']} />
            <View style={{
              flex: 1,
              flexDirection: 'row',
              paddingHorizontal: wp('4%'),
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
                    elevation: 1,
                    width: '100%',
                    height: '100%',
                  }}
                  source={{ uri: CommonFunctions.getFile('profile.picture', 'avatar', true) }}
                />
              </View>
              <View style={{ flex: 3.5, alignItems: 'center' }}>
                <View style={[styles.nameDetail]}>
                  <View style={{
                    flex: 1,
                    alignItems: 'flex-start',
                    justifyItems: 'center',
                  }}
                  >
                    <Text style={[ApplicationStyles.headline3, { flex: 1 }]}>Goonj</Text>
                    <Text style={[ApplicationStyles.info1, { flex: 1 }]}>
                      @goonj12
                    </Text>
                    <Text style={[ApplicationStyles.info3, { flex: 1 }]}>
                      12M Followers
                    </Text>
                  </View>
                </View>
              </View>


            </View>

            <View style={[styles.userInfo, { flexDirection: 'row' }]}>
              <Button
                title="Follow"
                style={{
                  paddingHorizontal: wp('1%'),
                  flex: 1,
                }}
                containerStyle={{ flex: 1 }}
                buttonWrapperStyle={{
                  flex: 1,
                  paddingVertical: hp('0.7%'),
                  borderRadius: wp('2%'),
                  borderColor: ApplicationStyles.primaryColor.color,
                  borderWidth: StyleSheet.hairlineWidth * 2,
                }}
                titleStyle={{ ...ApplicationStyles.link }}
              />
              <Button
                title="Donate"
                style={{
                  paddingHorizontal: wp('1%'),
                  flex: 1,

                }}
                containerStyle={{ flex: 1 }}
                buttonWrapperStyle={{
                  flex: 1,
                  borderRadius: wp('2%'),
                  paddingVertical: hp('0.7%'),
                  borderColor: ApplicationStyles.primaryColor.color,
                  borderWidth: StyleSheet.hairlineWidth * 2,
                }}
                titleStyle={{ ...ApplicationStyles.link }}
              />
            </View>
            <View style={[styles.userInfo, { paddingTop: hp('2%') }]}>


              <View style={{ flexWrap: 'wrap', flex: 1, flexDirection: 'row' }}>
                {/* <Text style={styles.info}>
                  <Icon size={wp('4%')} name="md-female" color={Colors.mediumDarkFont} />
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
              <Text style={[ApplicationStyles.body3, { paddingHorizontal: wp('2%') }]}>
              We are a non-profit organization trying to channelize the urban surplus to support the rural needy. We have been collecting resource material that is not in use by individuals or organizations such as old clothes, discarded computers, waste paper, newspapers etc.
              We dispatch approx. 70 tons of material every month to various parts of the country depending on the requirements we receive from our partner organizations.
              We have been called India's Largest Non-Monetary Resource Mobilization firm.
              </Text>
            </View>
          </View>

          <View style={{
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
          />
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

          {/* <View style={styles.sectionContainer}>
            <Button
              title="Jobs"
              titleStyle={{
                ...ApplicationStyles.info3,
                paddingVertical: hp('1%'),
                paddingHorizontal: hp('2%'),
              }}
              buttonWrapperStyle={{ alignItems: 'flex-start' }}
            />
            <Button
              title="Jobs"
              titleStyle={{
                ...ApplicationStyles.info3,
                paddingVertical: hp('1%'),
                paddingHorizontal: hp('2%'),
              }}
              buttonWrapperStyle={{ alignItems: 'flex-start' }}
            />
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
