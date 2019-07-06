import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import UserActions from 'App/Stores/User/Actions';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {
  Text, NavigationBar, TextInput, Button,
} from '../../Components';
import {
  Colors, FontSizes, Fonts, ApplicationStyles,
} from '../../Theme';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.accent },
  subContainer: { flex: 1, paddingHorizontal: wp('5%') },
  loginContainer: {
    marginVertical: hp('4%'),
    backgroundColor: Colors.primary,
    borderRadius: wp('2%'),
    width: wp('80%'),
    alignSelf: 'center',
    height: hp('7%'),
  },
  loginTitle: { color: Colors.lightFont, textAlign: 'center', fontSize: FontSizes.h3 },
  sectionContainer: {
    backgroundColor: Colors.background,
    elevation: 2,
    flex: 1,
    borderRadius: wp('2%'),
    overflow: 'hidden',
    paddingBottom: hp('3%'),
  },
  userInfo: {
    padding: wp('2%'),
    borderRadius: wp('2%'),
    marginTop: -hp('1%'),
    backgroundColor: Colors.background,

  },
  nameDetail: { paddingHorizontal: wp('2%'), flex: 1, flexDirection: 'row' },
  info: { padding: wp('1%'), margin: wp('1%'), ...ApplicationStyles.info3 },
});

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
    };
  }


  render() {
    const { navigation, profile, logoutInit } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} rightButtonAction={() => navigation.navigate('EditProfile')} showLeftSection={false} showRightSection rightIcon="md-create" title="Profile" containerStyle={{ paddingHorizontal: wp('2%') }} />
        {profile && (
        <ScrollView style={styles.subContainer}>
          <View style={styles.sectionContainer}>
            <Image
              resizeMode="cover"
              style={{
                width: '100%',
                height: hp('35%'),
              }}
              source={require('../../Assets/Images/child.jpeg')}
            />
            <View style={styles.userInfo}>
              <View style={styles.nameDetail}>
                <View style={{ flex: 2 }}>
                  <Text style={ApplicationStyles.headline3}>{profile.name}</Text>
                  <Text style={ApplicationStyles.info1}>
                    @
                    {profile.userName}
                  </Text>
                </View>
                <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start' }}>
                  <Button
                    buttonWrapperStyle={{
                      borderRadius: wp('2%'),
                      alignSelf: 'flex-end',
                      padding: wp('1%'),
                    }}
                    titleStyle={{ ...ApplicationStyles.link }}
                    onPress={logoutInit}
                    title="Logout"
                  />
                </View>
              </View>
              <View style={{ flexWrap: 'wrap', flex: 1, flexDirection: 'row' }}>
                {/* <Text style={styles.info}>
                  <Icon size={wp('4%')} name="md-female" color={Colors.mediumDarkFont} />
                  {' '}
                      Female

                </Text> */}

                {/* <Text style={styles.info}>
                  <Icon size={wp('4%')} name="md-pin" color={Colors.mediumDarkFont} />
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
                     MY POSTS
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
            renderItem={({ item }) => (
              <View style={{ marginHorizontal: wp('1%') }}>
                <View style={{
                  width: wp('30%'),
                  height: wp('30%'),
                  borderRadius: wp('3.1%'),
                  elevation: 2,
                  overflow: 'hidden',
                  justifyContent: 'center',
                  marginVertical: wp('2%'),
                }}
                >


                  <Image
                    resizeMode="cover"
                    source={require('../../Assets/Images/child.jpeg')}
                  />


                </View>
                <Text style={{ textAlign: 'center', ...ApplicationStyles.info3 }}>Why do we do?</Text>
              </View>

            )}
            horizontal
          />
          <Button
            style={styles.loginContainer}
            onPress={() => navigation.navigate('HomePage')}
            title="MY DONATIONS"
          />

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
