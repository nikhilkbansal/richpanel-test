import React, { Component } from 'react';
import {
  FlatList, View, ScrollView, StyleSheet, Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { Appbar } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import defaultStyle from '../../Theme/ApplicationStyles';
import { TextInput, Text, Button } from '../../Components';
import ApplicationStyles from '../../Theme/ApplicationStyles';
import CommonFunctions from '../../Utils/CommonFunctions';

const styles = StyleSheet.create({
  subContainer: { flex: 1, flexDirection: 'row', paddingVertical: hp('0.5%') },
  avatarImage: {
    width: wp('12%'), height: wp('12%'), borderRadius: wp('7.5%'), alignSelf: 'center',
  },
  avatarContainer: {
    flex: 5, paddingHorizontal: wp('2%'), justifyContent: 'space-around', flexDirection: 'column',
  },
  medal: { ...ApplicationStyles.avatarSubtitle, paddingHorizontal: wp('2%'), alignItems: 'center' },
  agoContainer: {
    flex: 1,
    alignSelf: 'flex-start',
    height: hp('3%'),
    alignContent: 'center',
    borderRadius: wp('10%'),
    justifyContent: 'center',
  },
  ago: {
    ...ApplicationStyles.avatarSubtitle,
    paddingHorizontal: wp('1%'),
  },
  moreContainer: { flex: 1, justifyContent: 'center' },
  moreStyle: {

    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreWrapperStyle: {
    width: wp('10%'),
    height: wp('10%'),
    backgroundColor: ApplicationStyles.grayishBackground.color,
    borderRadius: wp('10%') / 2,
    alignItems: 'center',
    overflow: 'hidden',
  },
});


class SearchPage extends Component {
  static get propTypes() {
    return {
      theme: PropTypes.object.isRequired,
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: '',
      checked: false,
      selectedCategories: [],
      status: false,
    };
    this.searchSection = this.searchSection.bind(this);
    this._renderPostItem = this._renderPostItem.bind(this);
  }

  _renderItem() {
    return (
      <View style={[styles.subContainer]}>
        <Image
          style={styles.avatarImage}
          source={{ uri: CommonFunctions.getFile('userPicture', 'avatar', true) }}
        />
        <View style={[styles.avatarContainer]}>
          <View style={{ flexDirection: 'row', flex: 3 }}>
            <Text style={ApplicationStyles.avatarTitle}>
            Lorem ipsum
            </Text>
          </View>
          <View style={styles.agoContainer}>
            <Text style={styles.ago}>
12M Followers
            </Text>
          </View>

        </View>
      </View>
    );
  }


  _renderPostItem() {
    const { navigation } = this.props;
    return (
      <Button buttonWrapperStyle={[styles.subContainer]} onPress={() => navigation.navigate('SeeAllSearch')}>
        <Image
          style={styles.avatarImage}
          source={{ uri: CommonFunctions.getFile('userPicture', 'avatar', true) }}
        />
        <View style={[styles.avatarContainer]}>
          <View style={{ flexDirection: 'row', flex: 3 }}>
            <Text style={ApplicationStyles.avatarTitle}>
            Helping kids to get education
            </Text>
          </View>
          <View style={styles.agoContainer}>
            <Text style={styles.ago}>
              By Goonj @goonj
            </Text>
          </View>

        </View>
      </Button>
    );
  }


  searchSection(title) {
    return (
      <View>
        <Text style={[ApplicationStyles.subHeadline, { textAlign: 'left', paddingHorizontal: wp('2%') }]}>{title}</Text>
        <FlatList
          data={[1, 2, 3]}
          renderItem={this._renderPostItem}
        />
        <Button title="See all" buttonWrapperStyle={{ textAlign: 'center' }} titleStyle={{ ...ApplicationStyles.primaryColor }} onLongPress={() => alert('longPress')} onPress={() => alert('shortPress')} />
      </View>
    );
  }

  render() {
    const { email, password, checked } = this.state;
    const { theme } = this.props;
    return (
      <View style={[{ flex: 1, marginTop: hp('1%'), marginHorizontal: defaultStyle.viewMarginHorizontal }]}>
        <TextInput
          placeholder="Search ngos, events, campaign, posts ..."
          numberOfLines={1}
          label="Search"
          returnKeyType="search"
        />
        <ScrollView style={{
          backgroundColor: ApplicationStyles.lightColor.color,
          padding: wp('1%'),
          elevation: 1,
          marginBottom: hp('2%'),
        }}
        >
          {this.searchSection('Posts')}
          {this.searchSection('Events')}
          {this.searchSection('NGOs')}
        </ScrollView>
      </View>
    );
  }
}

export default SearchPage;
