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
  loginContainer: {
    marginTop: hp('4%'),
    backgroundColor: Colors.primary,
    borderRadius: wp('2%'),
    width: wp('80%'),
    alignSelf: 'center',
    height: hp('7%'),
  },
  loginTitle: { color: Colors.lightFont, textAlign: 'center', fontSize: FontSizes.h3 },
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
            data={[{ empty: true }, { a: 3 }, { a: 3 }, { a: 3 }, { a: 3 }]}
            style={{ flex: 1 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ marginHorizontal: wp('1%') }}>
                <View style={{
                  width: wp('20%'),
                  height: wp('20%'),
                  borderRadius: wp('2.1%'),
                  overflow: 'hidden',
                  borderColor: Colors.primary,
                  borderWidth: item.empty ? 1 : 0,
                  justifyContent: 'center',
                  marginVertical: wp('2%'),
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
                      <Button
                        style={{
                          backgroundColor: 'red',
                          borderColor: Colors.background,
                          borderRadius: wp('5%') / 2,
                          borderWidth: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => navigation.navigate('HomePage')}
                        icon="md-add"
                        iconColor={Colors.primary}
                        iconSize={23}
                      />

                    )}


                </View>
                {!item.empty && (
                <Button
                  style={{
                    backgroundColor: 'red',
                    width: wp('5%'),
                    height: wp('5%'),
                    borderColor: Colors.background,
                    borderRadius: wp('5%') / 2,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 5,
                    position: 'absolute',
                    top: 0,
                    padding: wp('1%'),
                    right: -wp('1%'),
                  }}
                  onPress={() => navigation.navigate('HomePage')}
                  icon="md-remove"
                  iconColor={Colors.lightFont}
                  iconSize={23}
                />
                )
                }
              </View>

            )}
            horizontal
          />
          <TextInput label="Email" />
          <TextInput label="Phone" />
          <TextInput label="Address" />
          <TextInput label="Password" secureTextEntry />

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
