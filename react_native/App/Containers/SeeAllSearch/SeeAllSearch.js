import React, { Component } from 'react';
import {
  FlatList, View, StyleSheet
} from 'react-native';
import { 
  withTheme
} from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import ActionButton from 'react-native-action-button';
import defaultStyle from '../../Theme/ApplicationStyles';
import {PostUi, NavigationBar} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import Dialog, { DialogContent,SlideAnimation } from 'react-native-popup-dialog';
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
  }

  _renderItem = ({item}) =><PostUi 
  userName={item.userId.name}
  userPicture={item.userId.picture}
  onDonatePress={()=>this.props.navigation.navigate('Donate')}
  {...item}
  />;

  render() {

    const {  navigation, homePosts  } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: ApplicationStyles.lightBackgkround.color}}>
        <NavigationBar {...navigation} rightButtonAction={() => navigation.navigate('AddPost')} showLeftSection={true}  rightIcon="md-add" title="NGOs" containerStyle={{ paddingHorizontal: wp('2%') }} />
    
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
  },
)(Post);
