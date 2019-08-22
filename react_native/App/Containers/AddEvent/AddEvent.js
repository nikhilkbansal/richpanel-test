import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView, horizontal,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

import PostActions from 'App/Stores/Post/Actions';
import {
  Text, NavigationBar, TextInput, Button, HrLine, DatePicker,
} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
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
});

class AddEvent extends Component {
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
    this.addPost = this.addPost.bind(this);
    this.descriptionRef = React.createRef();
  }

  addPost() {
    const { errors } = this.state;
    const { postCreate } = this.props;
    postCreate({});
  }

  updateTextInput(key, value) {
    this.setState({ [key]: value });
  }


  render() {
    const { navigation } = this.props;

    const { errors } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} statusBarColor={Colors.background} title="ADD POST" containerStyle={{ paddingHorizontal: wp('2%') }} />
        <KeyboardAwareScrollView style={styles.subContainer}>
          <TextInput
            error={errors.title}
            multiline
            numberOfLines={1}
            label="Title"
            placeholder="e.g. Helping kids to get better education"
            returnKeyType="next"
            onChangeText={text => this.updateTextInput('title', text)}
            onSubmitEditing={() => this.descriptionRef.current.focus()}
          />

          <TextInput
            error={errors.description}
            multiline
            numberOfLines={4}
            label="Description"
            placeholder=""
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

          <HrLine />
          <Text style={{ ...ApplicationStyles.info3 }}>Fill below section if you are creating a campaign </Text>
          <TextInput
            error={errors.description}
            multiline
            numberOfLines={1}
            label="Campaign Goal"
            placeholder="e.g. 5000"
            keyboardType="number-pad"
            textInputRef={this.descriptionRef}
            returnKeyType="next"
            onChangeText={text => this.updateTextInput('description', text)}
            onSubmitEditing={() => this.passwordRef.current.focus()}
          />
          <DatePicker label="Campaign Starts from" placeholder="xxxx/xx/xx xx:xx xx" onChange={text => this.updateTextInput('starts', text)} />
          <DatePicker label="Campaign Ends on" placeholder="xxxx/xx/xx xx:xx xx" onChange={text => this.updateTextInput('starts', text)} />
          <Button
            style={styles.loginContainer}
            onPress={this.addPost}
            title="ADD"
          />

        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default connect(null, {
  postCreate: PostActions.postCreate,
})(AddEvent);
