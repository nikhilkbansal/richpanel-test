import React, { Component } from 'react';
import {
  FlatList, View, StyleSheet, Image
} from 'react-native';
import { 
  withTheme
} from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import ActionButton from 'react-native-action-button';
import defaultStyle from '../../Theme/ApplicationStyles';
import {PostUi, NavigationBar, Button} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import Dialog, { DialogContent,SlideAnimation } from 'react-native-popup-dialog';
import {  Text } from 'react-native'
import { connect } from 'react-redux';
import SearchActions from '../../Stores/Search/Actions';
import { CommonFunctions, } from '../../Utils'
 
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  subContainer: { flex: 1,   flexDirection: 'row', paddingVertical: hp('1%'), paddingHorizontal: wp('2%') },
  avatarImage: {
    width: wp('12%'), height: wp('12%'), borderRadius: wp('7.5%'), alignSelf: 'center',
  },
  avatarContainer: {
    flex: 5, paddingHorizontal: wp('2%'),   justifyContent: 'space-around', flexDirection: 'column',
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
  moreContainer: { flex: 1, justifyContent: 'center',  },
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

class Post extends Component {
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
    };
    this._renderItem = this._renderItem.bind(this);
    this.flatlistItems = this.flatlistItems.bind(this);
    this.getData = this.getData.bind(this);
    console.log('thisprops',props);
  }

  componentDidMount(){
    const { getSearch, navigation: { state: { params: { term, type} } } } = this.props;
    getSearch({ term, type });
  }

  _renderItem = ({item}) =><PostUi 
    userName={item.userId.name}
    userPicture={item.userId.picture}
    onDonatePress={()=>this.props.navigation.navigate('Donate')}
    {...item}
    />;


  _renderNgo = ({item}) =>(<View style={[styles.subContainer]}>
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
  <View style={styles.moreContainer}>
          <Button
            icon="md-more"
            iconSize={25}
            style={styles.moreStyle}
            buttonWrapperStyle={styles.moreWrapperStyle}
          />
        </View>
</View>);

  flatlistItems(data){
    const { navigation: { state: { params: { type} } } } = this.props;
    switch(type){
      case 'ngo':
        return this._renderNgo(data);
      case 'event':
        return this._renderItem(data);
      default:
          return this._renderItem(data);
    }
  }

  getData(){
    const { autoComplete,navigation: { state: { params: { type} } } } = this.props;
    switch(type){
      case 'ngo':
        return autoComplete.ngos;
      case 'event':
        return autoComplete.events;
      default:
          return autoComplete.posts;
    }
  }

  render() {

    const {  navigation, navigation: { state: { params: { term } } }  } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: ApplicationStyles. smokeBackground.color}}>
        <NavigationBar {...navigation} rightButtonAction={() => navigation.navigate('AddPost')} showLeftSection={true}  rightIcon="md-add" title={'Search: ' +term}  />
        <View style={{flex:1, }}>
        <FlatList
          data={this.getData() } 
          renderItem={this.flatlistItems}
        />
        </View>

      </View>
    );
  }
}

export default connect(
  ({ search: { autoComplete } }) => ({ autoComplete }), {
    getSearch: SearchActions.getSearch,
  },
)(Post);
