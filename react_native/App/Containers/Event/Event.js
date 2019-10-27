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
import {EventUi, NavigationBar, EmptyState} from '../../Components';
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
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      getHomeEvents();
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
        <NavigationBar  leftFunction={()=>navigation.openDrawer()} leftIcon={'md-menu'}  {...navigation} rightButtonAction={() => navigation.navigate('AddEvent')}  showRightSection rightIcon="md-add" title="Events"  />
      
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
  ({ event: { homeEvents } }) => ({ homeEvents }), {
    getHomeEvents: EventActions.getHomeEvents,
  },
)(Event);
