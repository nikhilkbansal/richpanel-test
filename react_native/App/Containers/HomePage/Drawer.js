import React, { Component } from 'react';
import {
  FlatList, View, StyleSheet, Image, ScrollView
} from 'react-native';
import { 
  withTheme
} from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import ActionButton from 'react-native-action-button';
import defaultStyle from '../../Theme/ApplicationStyles';
import {PostUi, NavigationBar, Button} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import Dialog, { DialogContent,SlideAnimation } from 'react-native-popup-dialog';
import { connect } from 'react-redux';
import SearchActions from '../../Stores/Search/Actions';
import { AvatarImage, Text, MenuItem } from '../../Components';
import { CommonFunctions } from '../../Utils';
 

const styles = StyleSheet.create({
 
});

class Drawer extends Component {
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

  componentDidMount(){
  }
 
  getMenuItem(leftLabel, leftIcon = {}, onPress){
    return (<Button onPress={onPress} buttonWrapperStyle={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: wp('4%'),
              paddingVertical: hp('1.4%'),
            }}
            >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name={leftIcon.name} size={leftIcon.size ||  wp('7%')} color={leftIcon.color || ApplicationStyles.info3.color} iconFamily={leftIcon.family || "Ionicons"} />
            <Text style={{ ...ApplicationStyles.primaryInfo, marginLeft: wp('3.5%'), color: ApplicationStyles.darkColor.color }}> {leftLabel}</Text>
          </View>
        </Button>);
  }
  render() {
  /**
   * User pic,name with edit profile icon
   * Followings
   * Handouts
   * Donations (With recurring)
   * Settings
   * About Us
   * Contact Us
   * 
   * 
   * User pic,name with edit profile icon
   * Followers
   * Organization info
   * Carousel
   * Posts
   * Events
   * Jobs
   * Shop
   * Analytics
   * Donations
   * Settings
   * About Us
   * Contact Us
   */
    return (
      <ScrollView style={{ ...ApplicationStyles.elevationXLL, flex: 1, backgroundColor: ApplicationStyles.smokeBackground.color}}>
        <View style={{ backgroundColor:ApplicationStyles.lightColor.color, flex:1,paddingHorizontal: wp('4%'), flexDirection: 'row', width: '100%',paddingTop: hp('15%'), paddingBottom:hp('2%') }}>
          <AvatarImage style={{}} source={{ uri: CommonFunctions.getFile("userPicture", 'avatar', true) }}></AvatarImage>
          <View style={{marginLeft: wp('2%')}}> 
            <Text style={{ ...ApplicationStyles.avatarTitle}}>Rahul Saini</Text>
            <Text style={{ ...ApplicationStyles.info}}>Edit Profile</Text>
          </View>
        </View>
        <View style={{marginTop: hp('3%')}}>
        { this.getMenuItem('Followings', {name: 'ios-analytics', family: 'Ionicons'}) }
        { this.getMenuItem('Handouts', {name: 'ios-bicycle', family: 'Ionicons'}) }
        { this.getMenuItem('Donations', {name: 'ios-analytics', family: 'Ionicons'}) }
        { this.getMenuItem('Settings', {name: 'ios-analytics', family: 'Ionicons'}) }
        { this.getMenuItem('About Us', {name: 'ios-analytics', family: 'Ionicons'}) }
        { this.getMenuItem('Contact Us', {name: 'ios-analytics', family: 'Ionicons'}) }
        </View>
        {/* <View style={{position:}}>
          <Text>Handout</Text>
        </View> */}
      </ScrollView>
    );
  }
}

export default connect(
  ({ search: { autoComplete } }) => ({ autoComplete }), {
    getSearch: SearchActions.getSearch,
  },
)(Drawer);
