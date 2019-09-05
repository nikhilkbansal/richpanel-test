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
import {EventUi, NavigationBar} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import Dialog, { DialogContent,SlideAnimation } from 'react-native-popup-dialog';
import { Button, Text } from 'react-native'
import { connect } from 'react-redux';
import EventActions from '../../Stores/Event/Actions';


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
    getHomeEvents();
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(ApplicationStyles.primaryColor.color);
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  _renderItem = ({item}) =><EventUi 
    userName={item.userId.name}
    userPicture={item.userId.picture}
    onDonatePress={()=>this.props.navigation.navigate('Donate')}
    {...item}
    />;

  render() {

    const { navigation, homeEvents  } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: ApplicationStyles. smokeBackground.color}}>
        <NavigationBar {...navigation} rightButtonAction={() => navigation.navigate('AddEvent')} showLeftSection={false} showRightSection rightIcon="md-add" title="Events"  />
        <FlatList
          data={homeEvents} 
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

export default connect(
  ({ event: { homeEvents } }) => ({ homeEvents }), {
    getHomeEvents: EventActions.getHomeEvents,
  },
)(Event);
