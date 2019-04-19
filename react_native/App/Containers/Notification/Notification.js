import React, { Component } from 'react';
import {
  FlatList, View, StatusBar
} from 'react-native';
import {
  Button, HelperText, Divider, withTheme, Text
} from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import Container from '../../Components/Container';
import TextInput from '../../Components/TextInput';
import images from '../../Theme/Images';
import SmallButton from '../../Components/SmallButton';
import SpaceBar from '../../Components/SpaceBar';
import commonStyle from '../../Theme/ApplicationStyles';
import { Card, Title, Paragraph,Chip } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import defaultStyle from '../../Theme/ApplicationStyles';
import NotificationUi from '../../Components/NotificationUi';
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

  _renderItem = ({item}) =><NotificationUi />;

  render() {
    const { email, password, checked } = this.state;
    const { theme } = this.props;
    return (
      <View style={{flex:1}}>
        <FlatList
          data={[{a:3},{a:3},{a:3},{a:3}]} 
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

export default withTheme(Notification);
