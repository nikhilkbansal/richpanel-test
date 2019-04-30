import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text, NavigationBar, TextInput, Button,
} from '../../Components';
import { Colors, FontSizes } from '../../Theme';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  subContainer: { flex: 1, paddingHorizontal: wp('5%') },
  firstSection: { flex: 1 },
  secondSection: { flex: 4 },
  remeberPassContainer: {
    marginVertical: hp('1%'),
    width: wp('92%'),
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  remeberText: { justifyContent: 'flex-start' },
  forgetButton: { color: Colors.mediumDarkFont, textAlign: 'center', fontSize: FontSizes.h3 },
  forgetButtonContainer: { alignSelf: 'center' },
  loginContainer: {
    marginTop: hp('4%'),
    backgroundColor: Colors.primary,
    borderRadius: wp('2%'),
    width: wp('80%'),
    alignSelf: 'center',
    height: hp('7%'),
  },
  loginTitle: { color: Colors.lightFont, textAlign: 'center', fontSize: FontSizes.h3 },
  signUpLinkContainer: {
    width: wp('80%'), marginVertical: hp('2%'), flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center',
  },
  signUpContainer: { alignSelf: 'center' },
  signUpButton: { color: Colors.primary, textAlign: 'center', fontSize: FontSizes.h3 },
});

class EditProfile extends Component {
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
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} title="Edit Profile" containerStyle={{ paddingHorizontal: wp('2%') }} />

        <ScrollView style={styles.subContainer}>

          <FlatList
            data={[{ empty: true }, { a: 3 }, { a: 3 }, { a: 3 }]}
            style={{ flex: 1 }}
            renderItem={({ item }) => (
              <View style={{
                width: wp('22%'),
                height: wp('22%'),
                borderRadius: wp('1.1%'),
                overflow: 'hidden',
                marginHorizontal: wp('1%'),
                borderColor: Colors.primary,
                borderWidth: item.empty ? 1 : 0,
                justifyContent: 'center',
              }}
              >
                {!item.empty ? (
                  <Image
                    resizeMode="cover"
                    style={{
                    }}
                    source={require('../../Assets/Images/child.jpeg')}
                  />
                )
                  : (
                    <Icon
                      name="md-add"
                      style={{
                        fontSize: 20,
                        height: 22,
                        color: Colors.primary,
                        alignSelf: 'center',

                      }}
                    />
                  )}


              </View>
            )}
            horizontal
          />
          <TextInput label="Email" />
          <TextInput label="Phone" />
          <TextInput label="Address" />
          <TextInput label="Password" secureTextEntry />
          <View style={styles.remeberPassContainer}>

            <Text style={styles.remeberText} color="mediumDark" size="h3">Remember Password </Text>
            <Button
              style={styles.forgetButtonContainer}
              titleStyle={styles.forgetButton}
              title="Forget Password"
              onPress={() => navigation.navigate('ForgetPassword')}
            />
          </View>
          <Button
            style={styles.loginContainer}
            titleStyle={styles.loginTitle}
            onPress={() => navigation.navigate('HomePage')}
            title="UPDATE"
          />

        </ScrollView>
      </View>
    );
  }
}

export default EditProfile;
