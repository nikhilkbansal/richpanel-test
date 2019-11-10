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
import Dialog, { DialogContent,SlideAnimation } from 'react-native-popup-dialog';
import { connect } from 'react-redux';
import SearchActions from '../../Stores/Search/Actions';
import { AvatarImage, Text, MenuItem, Icon } from '../../Components';
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
            <Icon name={leftIcon.name} style={{width:wp('6.8%')}} size={leftIcon.size ||  wp('6%')} color={leftIcon.color || ApplicationStyles.info3.color} iconFamily={leftIcon.family || "Ionicons"} />
            <Text style={{ ...ApplicationStyles.fontStyles.button, marginLeft: wp('3.5%'), color: ApplicationStyles.darkColor.color }}> {leftLabel}</Text>
          </View>
        </Button>);
  }
  render() {
    const { navigation: { navigate, closeDrawer }, profile } = this.props;
    if(!profile) return null;
    return (
      <ScrollView style={{ ...ApplicationStyles.elevationXLL, flex: 1, backgroundColor: ApplicationStyles.smokeBackground.color}}>
        <View style={{ backgroundColor:ApplicationStyles.lightColor.color, flex:1,paddingHorizontal: wp('4%'), flexDirection: 'row', width: '100%',paddingTop: hp('15%'), paddingBottom:hp('2%') }}>
          <AvatarImage style={{}} source={{ uri: CommonFunctions.getFile(profile.picture, 'avatar', true) }}></AvatarImage>
          <View style={{marginLeft: wp('2%'),   justifyContent:'center'}}> 
            <Text style={{ ...ApplicationStyles.fontStyles.title}}>{ profile && profile.name }</Text>
            <Text style={{ ...ApplicationStyles.fontStyles.caption, textAlign: 'left'}}
            onPress={()=>{
              closeDrawer();
              navigate(profile && profile.role === 'ngo' ? 'NgoProfile' : "Profile");
              }}>SEE PROFILE</Text>
          </View>
        </View>
        { profile && profile.role === 'user' ? <View style={{marginTop: hp('3%')}}>
        { this.getMenuItem('FOLLOWINGS', {name: 'user-following', family: 'SimpleLineIcons', size: wp('5%')}, ()=> navigate('Followings')) }
        {/* { this.getMenuItem('Handouts', {name: 'hand-paper-o', family: 'FontAwesome', size: wp('5%')}) } */}
        { this.getMenuItem('DONATIONS', {name: 'money', family: 'FontAwesome', size: wp('4.9%')}, ()=> navigate('MyDonations')) }
        { this.getMenuItem('SETTINGS', {name: 'setting', family: 'AntDesign', size: wp('5.4%')}, ()=> navigate('Settings')) }
        </View>
        :<View style={{marginTop: hp('3%')}}>
        { this.getMenuItem('FOLLOWERS', {name: 'user-following', family: 'SimpleLineIcons', size: wp('5%')}) }
        {/* { this.getMenuItem('Handouts', {name: 'hand-paper-o', family: 'FontAwesome', size: wp('5%')}) } */}
        { this.getMenuItem('DONATIONS', {name: 'money', family: 'FontAwesome', size: wp('4.9%')}, ()=> navigate('MyDonations',{forPo: true})) }
        { this.getMenuItem('POSTS', {name: 'md-list', family: null, size: wp('5.4%')}) }
        { this.getMenuItem('EVENTS', {name: 'md-time', family: null, size: wp('5.4%')}) }
        { this.getMenuItem('JOBS', {name: 'file', family: 'Octicons', size: wp('5.4%')}) }
        { this.getMenuItem('SHOP', {name: 'shopping-bag', family: 'Feather', size: wp('5%')}) }
        { this.getMenuItem('ANALYTICS', {name: 'md-stats', family: null, size: wp('5%')}) }
        { this.getMenuItem('SETTINGS', {name: 'setting', family: 'AntDesign', size: wp('5.3%')}, ()=> navigate('Settings')) }
        </View>
        }
        {/* <View style={{position:}}>
          <Text>Handout</Text>
        </View> */}
      </ScrollView>
    );
  }
}

export default connect(
  ({ user: { profile }}) => ({ profile }), {
    getSearch: SearchActions.getSearch,
  },
)(Drawer);
