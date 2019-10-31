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
import {EventUi, NavigationBar, EmptyState} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import Dialog, { DialogContent,SlideAnimation } from 'react-native-popup-dialog';
import { Button, Text } from 'react-native'
import { connect } from 'react-redux';
import EventActions from '../../Stores/Event/Actions';
import UserActions from '../../Stores/User/Actions';


const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

class Event extends Component {
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
    const { getHomeEvents } = this.props;
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      getHomeEvents();
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(ApplicationStyles.primaryColor.color);
      StatusBar.setHidden(false, true);
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  onShare = async (item) => {
    const { profile, shareEvent } = this.props;
      Share.open( {
        message:  profile.name+ ' wants you see this event: ' + item.title+'. Use Handout App to make to world a better place for everyone like '+ profile.name +' is doing',
        url: 'com.handout/'+item.title.replace(' ', ''),
    })
    .then((res) => {
       console.log(res)
       shareEvent({ itemId: item._id, itemType: 'event'})
    })
    .catch((err) => { err && console.log(err); });
  };

  _renderItem = ({item}) =><EventUi 
    userName={item.userId.name}
    followUnfollow={()=>this.props.followUnFollow({ type: 'homePageEvents', isFollowed: item.isFollowed , followeeId: item.userId._id })}
    onSharePress={()=>this.onShare(item)}
    onReactionPress={this.props.eventReaction}
    onReactionRemovePress={this.props.removeEventReaction}
    userPicture={item.userId.picture}
    onUserClick={()=>this.props.navigation.navigate('NgoProfile',{poUserId:item.userId._id})}
    onViewComments={()=>this.props.navigation.navigate('Comment',{itemId:item._id, itemType:'event'})}
    onDonatePress={()=>this.props.navigation.navigate('Donate',{paymentMeta:{_id:item._id, txType:'userToDirectPO'}})}
    {...item}
    />;

  render() {

    const { navigation, homeEvents, profile  } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: ApplicationStyles. smokeBackground.color}}>
        <NavigationBar  leftFunction={()=>navigation.openDrawer()} leftIcon={'md-menu'}  {...navigation} rightButtonAction={() => navigation.navigate('AddEvent')}  showRightSection={profile && profile.role ==='ngo'} rightIcon="md-add" title="Events"  />
      
           {homeEvents.length < 1 
          ? <EmptyState message='There are no events to show'> 
            Tip: Follow some Philanthropy organizations from <Text  onPress={()=>navigation.navigate('Search')}  style={{...ApplicationStyles.button2, textDecorationLine: 'underline', color: ApplicationStyles.grayishBackground.color, textAlign:'center'}}>search page</Text>
          </EmptyState>
          :<FlatList
              onRefresh={()=>{}}
              refreshing={false}
              data={homeEvents} 
              renderItem={this._renderItem}
            /> 
        }
      </View>
    );
  }
}

export default connect(
  ({ event: { homeEvents }, user: {profile} }) => ({ homeEvents, profile }), {
    getHomeEvents: EventActions.getHomeEvents,
    eventReaction: EventActions.eventReaction,
    removeEventReaction: EventActions.removeEventReaction,
    shareEvent: EventActions.shareEvent,
    followUnFollow: UserActions.followUnFollow 
  },
)(Event);
