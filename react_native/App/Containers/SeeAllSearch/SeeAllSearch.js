import React, { Component } from 'react';
import {
  FlatList, View, StyleSheet, Image, Clipboard
} from 'react-native';
import { 
  withTheme
} from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import ActionButton from 'react-native-action-button';
import defaultStyle from '../../Theme/ApplicationStyles';
import {PostUi, EventUi, Text, NavigationBar, Button, MenuDropdown} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import Dialog, { DialogContent, SlideAnimation } from 'react-native-popup-dialog';
import Share from 'react-native-share';
import { connect } from 'react-redux';
import SearchActions from '../../Stores/Search/Actions';
import UserActions from '../../Stores/User/Actions';
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
    this._renderNgo = this._renderNgo.bind(this);
    this._renderEventItem = this._renderEventItem.bind(this);
    console.log('thisprops',props);
  }

  
  componentDidMount(){
    const { getSearch, navigation: { state: { params: { term, type, itemId} } } } = this.props;
    getSearch({ term, type, itemId });
  }


  onShare = async (item) => {
    const { profile, sharePost } = this.props;
      Share.open( {
        message:  profile.name+ ' wants you see this post: ' + item.title+'. Use Handout App to make to world a better place for everyone like '+ profile.name +' is doing',
        url: 'com.handout/'+item.title.replace(' ', ''),
    })
    .then((res) => {
       console.log(res)
       sharePost({ itemId: item._id, itemType: 'post'})
    })
    .catch((err) => { err && console.log(err); });
  };

  _renderEventItem = ({item}) =><EventUi 
    userName={item.userId.name}
    followUnfollow={()=>this.props.followUnfollow({ type: 'searchedItems', isFollowed: item.isFollowed , followeeId: item.userId._id })}
    onSharePress={()=>this.onShare(item)}
    onReactionPress={this.props.postReaction}
    onReactionRemovePress={this.props.removeReaction}
    userPicture={item.userId.picture}
    onUserClick={()=>this.props.navigation.navigate('NgoProfile',{poUserId:item.userId._id})}
    onViewComments={()=>this.props.navigation.navigate('Comment',{itemId:item._id, itemType:'event'})}
    onDonatePress={()=>this.props.navigation.navigate('Donate',{paymentMeta:{_id:item._id, txType:'userToDirectPO'}})}
    {...item}
    />;

  _renderItem = ({item}) =><PostUi 
    userName={item.userId.name}
    followUnfollow={()=>this.props.followUnfollow({ type: 'searchedItems', isFollowed: item.isFollowed , followeeId: item.userId._id })}
    onSharePress={()=>this.onShare(item)}
    onReactionPress={this.props.postReaction}
    onReactionRemovePress={this.props.removeReaction}
    userPicture={item.userId.picture}
    onUserClick={()=>this.props.navigation.navigate('NgoProfile',{poUserId:item.userId._id})}
    onViewComments={()=>this.props.navigation.navigate('Comment',{itemId:item._id, itemType:'post'})}
    onDonatePress={()=>this.props.navigation.navigate('Donate',{paymentMeta:{_id:item._id, txType:'userToPOCampaign'}})}
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
      {CommonFunctions.getFollowerCount(item.followerCount)} { CommonFunctions.getPluralString('Follower', item.followerCount)}
      </Text>
    </View>
  </View>
  <View style={styles.moreContainer}>
    <MenuDropdown
        menuTitle={item.name}
        buttonStyle={[styles.moreWrapperStyle]}
        menus={[
          { label: item.isFollowedByMe ? 'Unfollow' : 'Follow', func: () => {} },
          { label: 'See Profile', func: () => this.props.navigation.navigate('NgoProfile', {poUserId: item._id}) },
          { label: 'Copy Link', func: () => { Clipboard.setString('http://handoutapp.com'); Toast('Copied') } },
        ]}
      >
        <Icon name="md-more" size={25} color={ApplicationStyles.darkColor.color} />
      </MenuDropdown>
    </View>
</View>);



  flatlistItems(data){
    const { navigation: { state: { params: { type} } } } = this.props;
    switch(type){
      case 'ngo':
        return this._renderNgo(data);
      case 'event':
        return this._renderEventItem(data);
      default:
          return this._renderItem(data);
    }
  }


  render() {

    const {  seeAll, navigation, navigation: { state: { params: { term, itemId } } }  } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: ApplicationStyles. smokeBackground.color}}>
        <NavigationBar {...navigation} rightButtonAction={() => navigation.navigate('AddPost')} showLeftSection={true}  rightIcon="md-add" title={itemId ? '' : `Search: ${term}`}  />
        <View style={{flex:1, }}>
        <FlatList
          data={seeAll} 
          renderItem={this.flatlistItems}
        />
        </View>

      </View>
    );
  }
}

export default connect(
  ({ user: { profile }, search: { seeAll } }) => ({ seeAll, profile }), {
    getSearch: SearchActions.getSearch,
    postReaction: SearchActions.postReactionFromSearch,
    removeReaction: SearchActions.removeReactionFromSearch,
    sharePost: SearchActions.sharePostFromSearch,
    putSeeAllResults: SearchActions.putSeeAllResults,
    followUnfollow: UserActions.followUnfollow 
  },
)(Post);
