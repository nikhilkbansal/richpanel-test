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


const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

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

  _renderItem = ({item}) =><PostUi />;

  render() {
    console.log('propsprops',this.props);

    const { email, password, checked } = this.state;
    const { theme, navigation  } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: ApplicationStyles.lightBackgkround.color}}>
        <NavigationBar {...navigation} rightButtonAction={() => navigation.navigate('AddPost')} showLeftSection={false} showRightSection rightIcon="md-add" title="Home" containerStyle={{ paddingHorizontal: wp('2%') }} />
        {/* <View style={styles.container}>
  <Button
    title="Show Dialog"
    onPress={() => {
      this.setState({ visible: true });
    }}
  />
  <Dialog
    visible={this.state.visible} 
    dialogAnimation={new SlideAnimation({
      slideFrom: 'bottom',
    })}
    onTouchOutside={() => {
      this.setState({ visible: false });
    }}
  >
    <DialogContent style={{width: wp('80%'), height:hp('80%'),}}>
    <PostUi />
    </DialogContent>
  </Dialog>
</View>  */}
        <FlatList
          data={[{a:3},{a:3},{a:3},{a:3}]} 
          renderItem={this._renderItem}
        />
          {/* <ActionButton buttonColor={Colors.primary}>
          <ActionButton.Item buttonColor='#9b59b6' title="Add new Post" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Add new Event" onPress={() => {}}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton> */}
      </View>
    );
  }
}

export default withTheme(LoginScreen);
