import React, { Component } from 'react';
import {
  FlatList, View, StatusBar
} from 'react-native';
import { 
  withTheme
} from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { Appbar } from 'react-native-paper';
import defaultStyle from '../../Theme/ApplicationStyles';
import PostEventUi from '../../Components/PostEventUi';
class LoginScreen extends Component {
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

  _renderItem = ({item}) =><PostEventUi />;

  render() {
    console.log('propsprops',this.props);

    const { email, password, checked } = this.state;
    const { theme, navigation: { navigate }  } = this.props;
    return (
      <View style={{flex:1}}>
        <Appbar  style={[defaultStyle.headerBar,{backgroundColor:'#fff'}]}>
        <Appbar.Content
          title=""
        />
        <Appbar.Action icon="archive" color={theme.colors.primary} onPress={() =>navigate('LogIn')} />
        <Appbar.Action icon="mail" color={theme.colors.primary} onPress={() => console.log('Pressed mail')} />
        <Appbar.Action icon="label" color={theme.colors.primary} onPress={() => console.log('Pressed label')} />
        <Appbar.Action icon="add" color={theme.colors.primary} onPress={() => console.log('Pressed delete')} />
      </Appbar>
        <FlatList
          data={[{a:3},{a:3},{a:3},{a:3}]} 
          style={{marginTop:hp('10%'),paddingBottom:20}}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

export default withTheme(LoginScreen);
