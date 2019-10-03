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
import {PostUi, NavigationBar, MenuDropdown} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Text } from 'react-native'
import { connect } from 'react-redux';
import PostActions from '../../Stores/Post/Actions';
import UserActions from '../../Stores/User/Actions';


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
    };
    this._renderItem = this._renderItem.bind(this);
  }

  onShare = async (item) => {
    const { profile, sharePost } = this.props;
      Share.open( {
        message:  profile.name+ ' wants you see this post: ' + item.title+'. Use Help App to make to world a better place for everyone like '+ profile.name +' is doing',
        url: 'com.helpapp/'+item.title.replace(' ', ''),
    })
    .then((res) => {
       console.log(res)
       sharePost({ itemId: item._id, itemType: 'post'})
    })
    .catch((err) => { err && console.log(err); });
  };

  componentDidMount(){
    const { getHomePosts } = this.props;
    getHomePosts();
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(ApplicationStyles.primaryColor.color);
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  _renderItem = ({item}) =><PostUi 
    userName={item.userId.name}
    followUnfollow={this.props.followUnfollow}
    onSharePress={()=>this.onShare(item)}
    onReactionPress={this.props.postReaction}
    onReactionRemovePress={this.props.removeReaction}
    userPicture={item.userId.picture}
    onDonatePress={()=>this.props.navigation.navigate('Donate',{paymentMeta:{_id:item._id, txType:'userToPOCampaign'}})}
    {...item}
    />;

  render() {

    const {  navigation, homePosts  } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: ApplicationStyles. smokeBackground.color}}>
        <NavigationBar {...navigation} rightButtonAction={() => navigation.navigate('AddPost')} showLeftSection={false} showRightSection rightIcon="md-add" title="Home"/>
        <FlatList
          data={homePosts} 
          renderItem={this._renderItem}
        />
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
