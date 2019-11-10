import React, { Component } from 'react';
import {
  FlatList, View, StatusBar,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import NotificationActions from '../../Stores/Notification/Actions';
import { connect } from 'react-redux';

import { ApplicationStyles } from '../../Theme';
import {NotificationUi, NavigationBar, Text, EmptyState} from '../../Components';

class Shop extends Component {
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
  }

  componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(ApplicationStyles.primaryColor.color);
      StatusBar.setHidden(false, true);
    });

    this.props.getNotifications();
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  _renderItem = ({item}) =><NotificationUi />;

  render() {
    const { email, password, checked } = this.state;
    const { navigation, notifications } = this.props;
    return (
      <View style={{flex:1,backgroundColor: ApplicationStyles.smokeBackground.color}}>

      <NavigationBar  leftFunction={()=>navigation.toggleDrawer()} leftIcon={'md-menu'}  {...navigation} title='Shop' />
      { notifications.length < 1
        ? <EmptyState message='There are no products to show'> 
          </EmptyState>
        :<FlatList
          style={{paddingHorizontal: wp('3%')}}
          data={notifications} 
          renderItem={this._renderItem}
        />
      }
      </View>
    );
  }
}



export default connect(
  ({ notification: { notifications } }) => ({ notifications }), {
    getNotifications: NotificationActions.getNotifications,
  },
)(Shop);
