import React, { Component } from 'react';
import {
  FlatList, View, ScrollView, StyleSheet, Image, StatusBar,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { Appbar } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import SearchActions from 'App/Stores/Search/Actions';
import { connect } from 'react-redux';
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
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };
    this.searchSection = this.searchSection.bind(this);
    this.renderPostItem = this.renderPostItem.bind(this);
    this.getSearch = this.getSearch.bind(this);
    this.openSeeAllScreen = this.openSeeAllScreen.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    const { putAutoCompleteResults } = this.props;
    const { term } = this.state;
    if (term.length === 0) { putAutoCompleteResults([]); }
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(ApplicationStyles. smokeBackground.color);
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }


  getSearch(term) {
    const { getSearch, putAutoCompleteResults } = this.props;
    this.setState({ term });
    if (term.length > 1) {
      getSearch({ term, type: 'all' });
    } else {
      putAutoCompleteResults([]);
    }
  }


  searchSection(title, type, items) {
    return (
      <View>
        <Text style={[ApplicationStyles.subHeadline, { textAlign: 'left', paddingHorizontal: wp('2%') }]}>{title}</Text>
        <FlatList
          data={items}
          renderItem={type === 'ngo' ? this.renderItem : this.renderPostItem}
        />
        <Button title="See all" buttonWrapperStyle={{ textAlign: 'center' }} titleStyle={{ ...ApplicationStyles.primaryColor }} onPress={() => this.openSeeAllScreen(type)} />
      </View>
    );
  }


  openSeeAllScreen(type) {
    const { navigation } = this.props;
    const { term } = this.state;
    navigation.navigate('SeeAllSearch', { term, type });
  }


  renderPostItem({ item }) {
    const { navigation } = this.props;
    return (
      <Button buttonWrapperStyle={[styles.subContainer]}>
        <Image
          style={styles.avatarImage}
          source={{ uri: CommonFunctions.getFile(item.userId.picture, 'avatar', true) }}
        />
        <View style={[styles.avatarContainer]}>
          <View style={{ flexDirection: 'row', flex: 3 }}>
            <Text style={ApplicationStyles.avatarTitle}>
              {item.title}
            </Text>
          </View>
          <View style={styles.agoContainer}>
            <Text style={styles.ago}>
              By
              {' '}
              { item.userId.name }
            </Text>
          </View>

        </View>
      </Button>
    );
  }

  renderItem({ item }) {
    const { navigation } = this.props;

    return (
      <Button buttonWrapperStyle={[styles.subContainer]}>
        <Image
          style={styles.avatarImage}
          source={{ uri: CommonFunctions.getFile(item.picture, 'avatar', true) }}
        />
        <View style={[styles.avatarContainer]}>
          <View style={{ flexDirection: 'row', flex: 3 }}>
            <Text style={ApplicationStyles.avatarTitle}>
              {item.name}
            </Text>
          </View>
          <View style={styles.agoContainer}>
            <Text style={styles.ago}>
              12M Followers
            </Text>
          </View>
        </View>
      </Button>
    );
  }


  render() {
    const { autoComplete } = this.props;
    const searchResultExist = (autoComplete.posts && autoComplete.posts.length > 0)
    || (autoComplete.events && autoComplete.events.length > 0)
    || (autoComplete.ngos && autoComplete.ngos.length > 0);
    return (
      <View style={[{
        flex: 1,
        paddingTop: hp('5%'),
        backgroundColor: ApplicationStyles. smokeBackground.color,
      }]}
      >

        <TextInput
          placeholder="Search ngos, events, campaign, posts ..."
          numberOfLines={1}
          returnKeyType="search"
          containerStyle={{
            paddingHorizontal: wp('5%'),
            paddingBottom: hp('2%'),
            borderColor: ApplicationStyles.grayishBackground.color,
            borderBottomWidth: 1,
          }}
          inputStyle={{
            backgroundColor: ApplicationStyles.grayishBackground.color,
            borderWidth: 0,
            verticalAlign: 'center',
            paddingHorizontal: wp('2%'),
            ...ApplicationStyles.avatarTitle,
          }}
          onChangeText={text => this.getSearch(text)}
        />
        <ScrollView style={{
          marginTop: -hp('1%'),
        }}
        >
          {searchResultExist && (
          <View style={{
            backgroundColor: ApplicationStyles.lightColor.color,
            padding: wp('1%'),
            elevation: 1,
            marginBottom: hp('2%'),
          }}
          >
            {autoComplete.ngos && autoComplete.ngos.length > 0 && this.searchSection('NGOs', 'ngo', autoComplete.ngos)}
            {autoComplete.posts && autoComplete.posts.length > 0 && this.searchSection('Posts', 'post', autoComplete.posts)}
            {autoComplete.events && autoComplete.events.length > 0 && this.searchSection('Events', 'event', autoComplete.events)}
          </View>
          )
          }

        </ScrollView>
      </View>
    );
  }
}

export default connect(
  ({ search: { autoComplete } }) => ({ autoComplete }), {
    getSearch: SearchActions.getSearch,
    putAutoCompleteResults: SearchActions.putAutoCompleteResults,
  },
)(SearchPage);
