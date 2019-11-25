import React, { Component } from 'react';
import {
  FlatList, View, ScrollView, StyleSheet, StatusBar
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { Appbar } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import SearchActions from 'App/Stores/Search/Actions';
import { connect } from 'react-redux';
import defaultStyle from '../../Theme/ApplicationStyles';
import { TextInput, Text, Button, ProgressiveImage, EmptyState, AvatarImage } from '../../Components';
import ApplicationStyles from '../../Theme/ApplicationStyles';
import CommonFunctions from '../../Utils/CommonFunctions';
import AxiosRequest from '../../Services/HttpRequestService';
import Toast from '../../Services/ToastService';
import Dialog, { DialogContent, SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
 

const styles = StyleSheet.create({
  subContainer: { flex: 1, flexDirection: 'row', paddingVertical: hp('0.9%'), justifyContent: 'center' },
  avatarImage: {
    width: wp('12%'), height: wp('12%'), borderRadius: wp('7.5%'), alignSelf: 'center',
  },
  avatarContainer: {
    flex: 5, paddingVertical: hp('0.4%'), paddingHorizontal:wp('2%'), justifyContent: 'space-around', flexDirection: 'column',
  },
  medal: { ...ApplicationStyles.avatarSubtitle, paddingHorizontal: wp('2%'), alignItems: 'center' },
  agoContainer: {
    flex: 1,
    alignSelf: 'flex-start',
    // height: hp('3%'),
    alignContent: 'center',
    borderRadius: wp('10%'),
    justifyContent: 'center',
  },
  ago: {
    ...ApplicationStyles.fontStyles.caption,
  },
  moreContainer: { flex: 1, justifyContent: 'center' },
  moreStyle: {

    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreWrapperStyle: {
    width: wp('10%'),
    height: wp('10%'),
    backgroundColor: ApplicationStyles.grayishBackground.color,
    borderRadius: wp('10%') / 2,
    alignItems: 'center',
    overflow: 'hidden',
  },
  tabs: {flex:1,  backgroundColor:ApplicationStyles.grayishBackground.color , flexDirection:'row', justifyContent: 'space-around'},

});


class SearchPage extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      term: '',
      selectedTab: 'POSTS',
      wentToSeeAll: false,
      welcomeModal: params && params.showWelcomeModal,
      postRecommendations: [],
      poRecommendations:[],
      eventRecommendations: [],
      activeTab: 'posts'
    };
    this.termRef = React.createRef();
    this.searchSection = this.searchSection.bind(this);
    this.renderPostItem = this.renderPostItem.bind(this);
    this.getSearch = this.getSearch.bind(this);
    this.openSeeAllScreen = this.openSeeAllScreen.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.getPostRecommendations = this.getPostRecommendations.bind(this);
    this.getEventRecommendations = this.getEventRecommendations.bind(this);
    this.getPoRecommendations = this.getPoRecommendations.bind(this);
  }

  componentDidMount() {
    const { putAutoCompleteResults } = this.props;
    
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      
      if(!this.state.wentToSeeAll){
      this.setState({
        postRecommendations: [],
        poRecommendations:[],
        eventRecommendations: []
      },()=>{
        this.getPostRecommendations();
        this.getEventRecommendations();
        this.getPoRecommendations();
      })
      }else{
        this.setState({ wentToSeeAll: false })
      } 

      if (this.state.term.length === 0) { putAutoCompleteResults([]); }
      // StatusBar.setHidden(true, true); 
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
    
  }


  getSearch(term) {
    const { getSearch, putAutoCompleteResults } = this.props;
    this.setState({ term });
    if (term.length > 1) {
      getSearch({ term, type: 'all' });
    } else { 
      putAutoCompleteResults([]);
    }
  }

  async getPostRecommendations( ) { 
    const { postRecommendations } = this.state;
    const itemsLength = postRecommendations.length;
    try {
      const data = await AxiosRequest({
        method: 'get',
        params:{ skip: itemsLength },
        url: 'search/recommendation/post',
      });
      this.setState({ postRecommendations: postRecommendations.concat(data) });
    } catch (e) {
      console.log('eeee',e)
    }
  }


  async getEventRecommendations( ) { 
    const { eventRecommendations } = this.state;
    const itemsLength = eventRecommendations.length;
    try {
      const data = await AxiosRequest({
        method: 'get',
        params:{ skip: itemsLength },
        url: 'search/recommendation/event',
      });
      this.setState({ eventRecommendations: eventRecommendations.concat(data) });
    } catch (e) {
      console.log('eeee',e)
    }
  }


  async getPoRecommendations( ) { 
    const { poRecommendations } = this.state;
    const itemsLength = poRecommendations.length;
    try {
      const data = await AxiosRequest({
        method: 'get',
        params:{ skip: itemsLength },
        url: 'search/recommendation/po',
      });
      this.setState({ poRecommendations: poRecommendations.concat(data) });
    } catch (e) {
      console.log('eeee',e)
    }
  }


  searchSection(title, type, items) {
    return (
      <View style={{ paddingBottom: hp('1%')}}>
        <Text style={[ApplicationStyles.fontStyles.caption, { textAlign: 'left', paddingHorizontal: wp('2%') }]}>{title}</Text>
        <FlatList
          data={items}
          renderItem={type === 'ngo' ?  this.renderItem : (data)=>this.renderPostItem({...data, type})}
        />
        <Button title="See all" buttonWrapperStyle={{ textAlign: 'center' }} titleStyle={{ ...ApplicationStyles.darkColor }} onPress={() => this.openSeeAllScreen(type)} />
      </View>
    );
  }


  openSeeAllScreen(type, itemId = null) {
    const { navigation, putSeeAllResults } = this.props;
    const { term } = this.state;
    this.setState({ wentToSeeAll: true})
    putSeeAllResults({posts: [], ngos: [], events: []});
    navigation.navigate('SeeAllSearch', { term: term, type, itemId });
  }


  renderPostItem({ item, type }) { 
    return (
      <Button buttonWrapperStyle={[styles.subContainer]} onPress={()=>this.openSeeAllScreen(type,  item._id)}>
        <AvatarImage
          style={styles.avatarImage}
          size={wp('12%')}
          containerStyle={{ backgroundColor: 'transparent'}}
          source={{ uri: CommonFunctions.getFile(item.userId.picture, 'avatar', true) }}
        />
        <View style={[styles.avatarContainer]}>
          <View style={{ flexDirection: 'row', flex: 1, }}>
            <Text style={ApplicationStyles.fontStyles.body1}>
              {item.title}
            </Text>
          </View>
          <View style={styles.agoContainer}>
            <Text style={styles.ago}>
              By
              {' '}
              { item.userId.name }
            </Text>
          </View>

        </View>
      </Button>
    );
  }

  renderItem({ item }) {
    const { navigation } = this.props;

    return (
      <Button buttonWrapperStyle={[styles.subContainer]} onPress={()=> navigation.navigate('NgoProfile', { poUserId: item._id})}>
        <AvatarImage
          style={styles.avatarImage}
          size={wp('12%')}
          containerStyle={{ backgroundColor: 'transparent'}}
          source={{ uri: CommonFunctions.getFile(item.picture, 'avatar', true) }}
        />
        <View style={[styles.avatarContainer]}>
          <View style={{ flexDirection: 'row', flex: 3 }}>
            <Text style={ApplicationStyles.fontStyles.body2}>
              {item.name}
            </Text>
          </View>
          <View style={styles.agoContainer}>
            <Text style={styles.ago}>
              {CommonFunctions.getFollowerCount(item.followerCount)} { CommonFunctions.getPluralString('Follower', item.followerCount)}
            </Text>
          </View>
        </View>
      </Button>
    );
  }


  render() {
    const { autoComplete, navigation, profile } = this.props;
    const { selectedTab, postRecommendations, welcomeModal, poRecommendations, eventRecommendations, term, activeTab } = this.state;
    const searchResultExist = (autoComplete.posts && autoComplete.posts.length > 0)
    || (autoComplete.events && autoComplete.events.length > 0)
    || (autoComplete.ngos && autoComplete.ngos.length > 0);
    let listItems = postRecommendations;
    listItems = selectedTab === 'EVENTS' ? eventRecommendations : listItems;
    listItems = selectedTab === 'SHOP' ? [] : listItems;
    return (
      <View style={[{
        flex: 1,
        paddingTop: hp('5%'),
        backgroundColor: ApplicationStyles. smokeBackground.color,
      }]}
      >
        <Dialog
            visible={welcomeModal}
            dialogAnimation={new SlideAnimation({
              slideFrom: 'bottom',
            })}
            onTouchOutside={() => {
              this.setState({ welcomeModal: false });
            }}
            dialogTitle={<DialogTitle title="Welcome!" textStyle={{ ...ApplicationStyles.fontStyles.caption }} />}
          >
            <DialogContent style={{ width: wp('80%'), height: hp('25%') }}>
              <View style={{flex:1,flexDirection:'column'}}>
                <Text style={{...ApplicationStyles.fontStyles.body1, textAlign:'center', marginTop: hp('2.5%')}}>Thank you so much {profile && profile.name}, for becoming the part of Handout family. We together make this world a better place for everyone. </Text>
                <Text style={{...ApplicationStyles.fontStyles.caption, textAlign:'center', marginTop: hp('1%')}}>To get started, Please follow some philanthropy organistaions. We have given some suggestions below and you can also search yours.</Text>
              
              </View>
            </DialogContent>
          </Dialog>
        <TextInput
          placeholder="Search ngos, events, campaign, posts ..."
          numberOfLines={1}
          returnKeyType="done"
          textInputRef={this.termRef}
          containerStyle={{
            paddingHorizontal: wp('5%'),
            paddingBottom: hp('2%'), 
          }}
          inputStyle={{
            ...ApplicationStyles.fontStyles.body1,
            backgroundColor: ApplicationStyles.grayishBackground.color,
            borderWidth: 0,
            verticalAlign: 'center',
            paddingLeft: wp('8%'),
            paddingRight: wp('7.2%'),
            paddingTop: hp('0.9%'),
            paddingBottom: hp('1.1%'),
          }}
          onChangeText={text => this.getSearch(text)}
          rightIcon={{
            name:'cross',
            family: 'Entypo',
            size:wp('6.5%'),
            onPress: ()=>this.getSearch("")
          }}
          value={term}
          leftIcon={{
            name:'magnifying-glass',
            family: 'Entypo',
            size:wp('6%'),
            onPress: ()=>this.termRef.current.focus()
          }}
          onSubmitEditing={()=>!searchResultExist && Toast('No results found!')}
        />
        <View style={{
          marginTop: -hp('1%'),
          flex:1
        }}
        >
         

          <View style={{ 
            
            flexDirection:'row',
            alignContent:'center',
            borderBottomWidth: StyleSheet.hairlineWidth*2,
            borderColor: ApplicationStyles.grayishBackground.color,
            paddingHorizontal: wp('3%'),
            height: hp('5.5%')
            }}>

            {['POST', 'EVENT', 'PO', 'USER'].map((o)=><Button 
            style={{
              flex:1,
              borderBottomWidth: wp('0.5%'),
              borderBottomColor: ApplicationStyles.smokeBackground.color,
              borderBottomColor: selectedTab === o ? ApplicationStyles.primaryColor.color: ApplicationStyles.grayishBackground.color
            }} 
            onPress={()=>this.setState({ selectedTab : o})}
            buttonWrapperStyle={{
                paddingHorizontal: wp('2%'), 
                paddingVertical: hp('1%'), 
                marginHorizontal: wp('0.4%'), 
                flex:1,
              }}>
              <Text style={{
                textAlign: 'center',
                ...ApplicationStyles.fontStyles.button,
                color:  selectedTab===o ? ApplicationStyles.primaryColor.color : ApplicationStyles.darkColor.color
                }}>{o}</Text>
            </Button>)} 
          </View>
        <View style={{flex:1}}>

          { ['POSTS', 'EVENTS', 'SHOP' ].includes(selectedTab) ? <View
            style={{
              flex:1,
              flexDirection:'row',
              flexWrap:'wrap',
              justifyContent:'center'
            }}>
              <FlatList
                contentContainerStyle={{  flexDirection:'row',  justifyContent:'center', flexWrap:'wrap'}}
                style={{flex:1,}}
                data={listItems}
                onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                onEndReached={(data) => {
                  if (!this.onEndReachedCalledDuringMomentum) {
                    this.onEndReachedCalledDuringMomentum = true;
                    selectedTab==='Posts' ? this.getPostRecommendations(): this.getEventRecommendations();
                  }
                }}
                onEndReachedThreshold={2}
                renderItem={({ item })=><Button 
                onPress={()=>this.openSeeAllScreen( selectedTab === 'POSTS' ? 'post': 'event',  item._id)}
                buttonWrapperStyle={{
                  width: wp('28%'),
                  height: wp('28%'),
                  borderRadius: wp('1.5%'),
                  overflow:'hidden',
                  // width: wp('30%'),
                  margin:wp('1.5%'), }}>
                  <ProgressiveImage
                     source={{ uri: CommonFunctions.getFile(item.files[0],'videoThumb') }}
                    style={{width: '100%', height: '100%'}}
                  />
              </Button>}
              />
            </View> 
            :
            <View
            style={{
              flex:1,
              flexDirection:'row',
              flexWrap:'wrap',
              justifyContent:'center',
              justifyItems:'center'
            }}>
              <FlatList
                contentContainerStyle={{ flexDirection:'row',  justifyContent:'center', flexWrap:'wrap'}}
                style={{flex:1,}}
                data={poRecommendations}
                onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentumPo = false; }}
                onEndReached={(data) => {
                  if (!this.onEndReachedCalledDuringMomentumPo) {
                    this.onEndReachedCalledDuringMomentumPo = true;
                    this.getPoRecommendations();
                  }
                }}
                onEndReachedThreshold={2}
                renderItem={({ item })=><Button 
                onPress={()=>navigation.navigate('NgoProfile', { poUserId: item._id })}
                style={{
                   width: wp('22%'),
                  margin:wp('0.5%'),
                  alignItems:'center',
                  height: wp('22%')}}>
                    <AvatarImage
                      size={wp('14%')}
                      source={{ uri: CommonFunctions.getFile(item.picture) }}
                    />
                    <Text style={{textAlign: 'center', ...ApplicationStyles.fontStyles.body2}}>{item.name}</Text> 
              </Button>}
              />
               
            </View>
          }
        </View>
        {searchResultExist && (
          <View style={{
            position: 'absolute',
            top:0,
            width: '100%',
            zIndex:999,
            ...ApplicationStyles.elevationS,
            backgroundColor: ApplicationStyles.lightColor.color,
            padding: wp('2%'),
            ...ApplicationStyles.elevationS,
            marginBottom: hp('2%'),
          }}
          >
             {/* <View   style={styles.tabs}>
                <Button title='PO' onPress={()=>this.setActiveTab('shop')}
                  buttonWrapperStyle={{  height: '100%',  margin:0,padding:0, paddingVertical: hp('0.7%')}}
                  style={[styles.scrollButton,activeTab === 'shop' ? activeTabStyle : '']}
                  titleStyle={[ ApplicationStyles.fontStyles.button,{borderBottomColor:ApplicationStyles.grayishBackground.color, color: ApplicationStyles.darkColor.color,textAlign:'center'},activeTab === 'shop' ? activeTabLabelStyle:"",]} />
                <Button title='USER' onPress={()=>this.setActiveTab('shop')}
                  buttonWrapperStyle={{  height: '100%',  margin:0,padding:0, paddingVertical: hp('0.7%')}}
                  style={[styles.scrollButton,activeTab === 'shop' ? activeTabStyle : '']}
                  titleStyle={[ ApplicationStyles.fontStyles.button,{borderBottomColor:ApplicationStyles.grayishBackground.color, color: ApplicationStyles.darkColor.color,textAlign:'center'},activeTab === 'shop' ? activeTabLabelStyle:"",]} />
               <Button title='POST' onPress={()=>this.setActiveTab('post')} 
                  buttonWrapperStyle={{  height: '100%',  margin:0,padding:0, paddingVertical: hp('0.7%')}}
                  style={[styles.scrollButton,activeTab === 'post' ? activeTabStyle : '']}
                  titleStyle={[ ApplicationStyles.fontStyles.button,{borderBottomColor:ApplicationStyles.grayishBackground.color, color: ApplicationStyles.darkColor.color,textAlign:'center'},activeTab === 'post' ? activeTabLabelStyle:"",]} />
                <Button title='EVENT' onPress={()=>this.setActiveTab('event')}
                  buttonWrapperStyle={{  height: '100%',  margin:0,padding:0, paddingVertical: hp('0.7%')}}
                  style={[styles.scrollButton,activeTab === 'event' ? activeTabStyle : '']}
                  titleStyle={[ ApplicationStyles.fontStyles.button,{borderBottomColor:ApplicationStyles.grayishBackground.color, color: ApplicationStyles.darkColor.color,textAlign:'center'},activeTab === 'event' ? activeTabLabelStyle:"",]} />
              </View> */}
            {autoComplete.ngos && autoComplete.ngos.length > 0 && this.searchSection('NGOs', 'ngo', autoComplete.ngos)}
            {autoComplete.posts && autoComplete.posts.length > 0 && this.searchSection('Posts', 'post', autoComplete.posts)}
            {autoComplete.events && autoComplete.events.length > 0 && this.searchSection('Events', 'event', autoComplete.events)}
          </View>
          )
          }
        </View>
      </View>
    );
  }
}

export default connect(
  ({ search: { autoComplete }, user: {profile} }) => ({ autoComplete,profile }), {
    getSearch: SearchActions.getSearch,
    getPostRecommendation: SearchActions.getPostRecommendation,
    putAutoCompleteResults: SearchActions.putAutoCompleteResults,
    putSeeAllResults: SearchActions.putSeeAllResults
  },
)(SearchPage);
