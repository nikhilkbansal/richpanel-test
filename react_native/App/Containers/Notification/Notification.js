import React, { Component } from 'react';
import {
  FlatList, View, StatusBar,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

import { ApplicationStyles } from '../../Theme';
import {NotificationUi, NavigationBar} from '../../Components';
class Notification extends Component {
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
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  _renderItem = ({item}) =><NotificationUi />;

  render() {
    const { email, password, checked } = this.state;
    const { navigation } = this.props;
    return (
      <View style={{flex:1}}>

<NavigationBar {...navigation} title='Notifications' showLeftSection={false}/>

        <FlatList
          style={{paddingHorizontal: wp('3%')}}
          data={[{a:3},{a:3},{a:3},{a:3},{a:3},{a:3},{a:3},{a:3},{a:3},{a:3},{a:3},{a:3}]} 
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

export default Notification;
