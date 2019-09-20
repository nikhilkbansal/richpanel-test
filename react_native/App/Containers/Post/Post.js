import React, { Component } from 'react';
import {
  FlatList, View, StyleSheet, StatusBar
} from 'react-native';
import { 
  withTheme
} from 'react-native-paper';
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

  onReactionPress = ()=>{


  }


  _renderItem = ({item}) =><PostUi 
    userName={item.userId.name}
    onReactionPress={this.props.postReaction}
    onReactionRemovePress={this.props.removeReaction}
    userPicture={item.userId.picture}
    onDonatePress={()=>this.props.navigation.navigate('Donate')}
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
  ({ post: { homePosts } }) => ({ homePosts }), {
    getHomePosts: PostActions.getHomePosts,
    postReaction: PostActions.postReaction,
    removeReaction: PostActions.removeReaction
  },
)(Post);
