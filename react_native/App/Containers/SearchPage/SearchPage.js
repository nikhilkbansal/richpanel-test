import React, { Component } from 'react';
import {
  FlatList, View, StatusBar
} from 'react-native';
import {
  Button, ToggleButton, TouchableRipple, withTheme, Text, Card, Title, Paragraph
} from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { Appbar } from 'react-native-paper';
import defaultStyle from '../../Theme/ApplicationStyles';
import { Searchbar, } from 'react-native-paper';
import PostUi from '../../Components/PostUi'; 
class SearchPage extends Component { 
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
      selectedCategories: [],
      status:false
    };
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem = ({item}) =>{
  const { theme} = this.props;
  const {selectedCategories} = this.state;
  const isActive = selectedCategories.includes(item.a);
  return  <TouchableRipple
      borderless
      onPress={() => {const cats = [...this.state.selectedCategories]; cats.push(item.a); this.setState({ selectedCategories: cats})}}
    >
    <Card style={{ padding:wp('1%'), marginHorizontal:wp('0.3%'), width: wp('24%'),height: wp('19%'),}}>
      <Card.Cover style={{flex:1}} source={require('../../Assets/Images/child.jpeg')} />
      <Text style={isActive ? {textAlign:'center', fontFamily: theme.fonts.thin, color: theme.colors.accent ,backgroundColor:theme.colors.primary}:{textAlign:'center', fontFamily: theme.fonts.thin, color: theme.colors.primary ,backgrounColor:theme.colors.primary}}>{item.a}</Text>
    </Card></TouchableRipple>
    
}; 

_renderItemPosts = ({item}) =><PostUi />;

  render() { 
    const { email, password, checked } = this.state;
    const { theme } = this.props;
    return (
      <View style={[{flex:1, marginTop:hp('1%'), marginHorizontal: defaultStyle.viewMarginHorizontal}]}>
        <Searchbar
          placeholder="Search"
          />
          <View style={{
           flexDirection:'row',
           justifyContent:'flex-end'
           }}>
            <TouchableRipple
              borderless
              onPress={()=>{}}
            >
              <Card style={{ padding:wp('1%'), marginHorizontal:wp('0.3%'),}}>
                <Text style={!"isActive" ? {textAlign:'center', fontFamily: theme.fonts.thin, color: theme.colors.accent ,backgroundColor:theme.colors.primary}:{textAlign:'center', fontFamily: theme.fonts.thin, color: theme.colors.primary ,backgrounColor:theme.colors.primary}}>Posts</Text>
              </Card>
            </TouchableRipple>
            <TouchableRipple
            borderless
            onPress={()=>{}}

          >
            <Card style={{ padding:wp('1%'), marginHorizontal:wp('0.3%'),}}>
              <Text style={!"isActive" ? {textAlign:'center', fontFamily: theme.fonts.thin, color: theme.colors.accent ,backgroundColor:theme.colors.primary}:{textAlign:'center', fontFamily: theme.fonts.thin, color: theme.colors.primary ,backgrounColor:theme.colors.primary}}>Events</Text>
            </Card>
          </TouchableRipple>
          <TouchableRipple
            borderless
            onPress={()=>{}}

          >
            <Card style={{ padding:wp('1%'), marginHorizontal:wp('0.3%'),}}>
              <Text style={!"isActive" ? {textAlign:'center', fontFamily: theme.fonts.thin, color: theme.colors.accent ,backgroundColor:theme.colors.primary}:{textAlign:'center', fontFamily: theme.fonts.thin, color: theme.colors.primary ,backgrounColor:theme.colors.primary}}>NGOs</Text>
            </Card>
          </TouchableRipple>
          </View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={[{a:'All'},{a:"Child"},{a:'Education'},{a:'House'} ,{a:'Environment'},{a:'Rivers'},{a:"Child"},{a:'Education'},{a:'House'},{a:'Environment'},{a:'Rivers'}]} 
          contentContainerStyle={{ marginTop:hp('1%'),height: wp('29%')}}
          renderItem={this._renderItem}
        />
        <FlatList 
          data={[{a:3},{a:3},{a:3},{a:3}]} 
          style={{marginTop:hp('1%')}}
          renderItem={this._renderItemPosts}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default withTheme(SearchPage);
