import React, { Component } from 'react';
import {
  FlatList, View, StyleSheet, StatusBar,

} from 'react-native';
import { 
  withTheme
} from 'react-native-paper';
import Share from 'react-native-share';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import ActionButton from 'react-native-action-button';
import defaultStyle from '../../Theme/ApplicationStyles';
import {PostUi, NavigationBar, MenuDropdown, Icon, Text, EmptyState} from '../../Components';
import { Colors, FontSizes, ApplicationStyles, Files } from '../../Theme';
import { Button,  } from 'react-native'
import { connect } from 'react-redux';
import PostActions from '../../Stores/Post/Actions';
import UserActions from '../../Stores/User/Actions';
import LottieView from 'lottie-react-native';

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
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
      currentVisibleIndex: 0,
    };
    this._renderItem = this._renderItem.bind(this);
    this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this)
    this.viewabilityConfig = {viewAreaCoveragePercentThreshold: 50}
  }


  componentDidMount(){
    const { getHomePosts } = this.props;
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      getHomePosts();
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(ApplicationStyles.primaryColor.color);
      StatusBar.setHidden(false, true); 

    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }


  onShare = async (item) => {
    const { profile, sharePost } = this.props;
      Share.open({
        message:  profile.name+ ' wants you see this post: ' + item.title+'. Use Handout App to make to world a better place for everyone like '+ profile.name +' is doing',
        url: 'com.handout/'+item.title.replace(' ', ''),
    })
    .then((res) => {
       console.log(res)
       sharePost({ itemId: item._id, itemType: 'post'})
    })
    .catch((err) => { err && console.log(err); });
  };

  _renderItem = ({item, index}) =><PostUi 
    userName={item.userId.name}
    currentVisible={this.state.currentVisibleIndex === index}
    followUnfollow={()=>this.props.followUnfollow({ type: 'homePagePosts', isFollowed: item.isFollowed , followeeId: item.userId._id })}
    onSharePress={()=>this.onShare(item)}
    onRepost={()=>this.props.navigation.navigate('AddPost',{itemId:item._id, isRepost: true})}
    onReactionPress={this.props.postReaction}
    onReactionRemovePress={this.props.removeReaction}
    userPicture={item.userId.picture}
    onViewComments={()=>this.props.navigation.navigate('Comment',{itemId:item._id, itemType:'post'})}
    onUserClick={()=>this.props.navigation.navigate(item.userId.role==='user'?'Profile':'NgoProfile',{poUserId:item.userId._id, userId:item.userId._id })}
    onRepostUserClick={()=>item.repostOf && this.props.navigation.navigate(  item.repostOf.userId.role==='user'? 'Profile' :'NgoProfile',{poUserId:item.repostOf.userId._id, userId:item.repostOf.userId._id})}
    onDonatePress={()=>this.props.navigation.navigate('Donate',{
      paymentMeta:{
        _id: item.isRepost ? item.repostOf._id : item._id,
        poUserId: item.isRepost ? item.repostOf.userId._id : item.userId._id,
        txType:'userToPOCampaign'
      }
    })}
    {...item}
    />;

  handleViewableItemsChanged({viewableItems}) {
    if (viewableItems && viewableItems.length > 0) {
      this.setState({ currentVisibleIndex: viewableItems[0].index });
    }
  }

  render() {

    const {  navigation, homePosts, profile  } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: ApplicationStyles. smokeBackground.color}}>
        <NavigationBar {...navigation} leftFunction={()=>navigation.toggleDrawer()} leftIcon={'md-menu'} rightButtonAction={() => navigation.navigate('AddPost')} showLeftSection={true} showRightSection rightIcon="md-add" title="Home"/>
        {homePosts.length < 1 
          ? <EmptyState message='There are no posts to show'> 
            Tip: Follow some Philanthropy organizations from <Text onPress={()=>navigation.navigate('Search')} style={{...ApplicationStyles.fontStyles.button, textDecorationLine: 'underline', color: ApplicationStyles.grayishBackground.color, textAlign:'center'}}>search page</Text>
          </EmptyState>
          :<FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={this.handleViewableItemsChanged}
            viewabilityConfig={this.viewabilityConfig}
             
            data={homePosts} 
            renderItem={this._renderItem}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            onEndReached={(data) => {
              if (!this.onEndReachedCalledDuringMomentum) {
                this.onEndReachedCalledDuringMomentum = true;
                this.props.getHomePosts({skip: homePosts.length});
              }
            }}
            onEndReachedThreshold={2}
            /> 
        }
      </View>
    );
  }
}

export default connect(
  ({ post: { homePosts }, user: {profile} }) => ({ homePosts, profile }), {
    getHomePosts: PostActions.getHomePosts,
    postReaction: PostActions.postReaction,
    removeReaction: PostActions.removeReaction,
    sharePost: PostActions.sharePost,
    followUnfollow: UserActions.followUnfollow 
  },
)(Post);
