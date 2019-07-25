import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import PayuMoney from 'react-native-payumoney';
import {
  Text, NavigationBar, TextInput, Button,
} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';


const amount = 99.9;
const txid = `${new Date().getTime()}`;
const productId = 'product101';
const name = 'asdf';
const email = 'hello@world.com';
const phone = '1231231231';
const surl = 'https://www.example.com/payu-validate.php'; // can be different for Succes
const furl = 'https://www.example.com/payu-validate.php'; // can be different for Failed
const id = 'XXXXX'; // Your Merchant ID here
const key = 'XXXXX'; // Your Key Here
const sandbox = true; // Make sure to set false on production or you will get error

const options = {
  amount,
  txid,
  productId,
  name,
  email,
  phone,
  id,
  key,
  surl,
  furl,
  sandbox,
  hash: '678',
};

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

class AddPost extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
    this.descriptionRef = React.createRef();
  }

  componentDidMount() {
    console.log(options);
    // setTimeout(() => {

    // }, 3000);
  }

  render() {
    const { navigation } = this.props;

    const { errors } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} statusBarColor={Colors.background} title="ADD POST" containerStyle={{ paddingHorizontal: wp('2%') }} />
        <ScrollView style={styles.subContainer}>
          <TextInput
            error={errors.title}
            multiline
            numberOfLines={2}
            label="Title"
            returnKeyType="next"
            onChangeText={text => this.updateTextInput('title', text)}
            onSubmitEditing={() => this.descriptionRef.current.focus()}
          />
          <TextInput
            error={errors.description}
            multiline
            numberOfLines={4}
            label="Description"
            textInputRef={this.descriptionRef}
            returnKeyType="next"
            onChangeText={text => this.updateTextInput('description', text)}
            onSubmitEditing={() => this.passwordRef.current.focus()}
          />
          <Text style={ApplicationStyles.textInputLabel}>Add images or videos</Text>
          <FlatList
            data={[{ empty: true }, { a: 3 }]}
            style={{ flex: 1 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ marginHorizontal: wp('1%') }}>
                <View style={{
                  width: wp('25%'),
                  height: wp('25%'),
                  borderRadius: wp('1.1%'),
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

          <Button
            style={styles.loginContainer}
            onPress={() => {
              PayuMoney.pay(options).then((d) => {
                console.log(d); // WIll get a Success response with verification hash
              }).catch((e) => {
                console.log(e); // In case of failture
              });
              // navigation.navigate('HomePage')
            }}
            title="ADD"
          />

        </ScrollView>
      </View>
    );
  }
}

export default AddPost;
