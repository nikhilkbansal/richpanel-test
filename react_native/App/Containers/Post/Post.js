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
import PostEventUi from '../../Components/PostEventUi';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';
import Icon from 'react-native-vector-icons/Ionicons';
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

  _renderItem = ({item}) =><PostEventUi />;

  render() {
    console.log('propsprops',this.props);

    const { email, password, checked } = this.state;
    const { theme, navigation: { navigate }  } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: ApplicationStyles.lightBackgkround.color}}>

        <FlatList
          data={[{a:3},{a:3},{a:3},{a:3}]} 
          renderItem={this._renderItem}
        />
          <ActionButton buttonColor={Colors.primary}>
          <ActionButton.Item buttonColor='#9b59b6' title="Add new Post" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Add new Event" onPress={() => {}}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

export default withTheme(LoginScreen);
